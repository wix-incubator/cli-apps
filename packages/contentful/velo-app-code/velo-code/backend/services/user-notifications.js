import { siteProperties } from '@wix/business-tools';
import { WixAppOAuthStrategy, createClient } from '@wix/sdk';
import { getAppOauth, getAppConfig, invokeWixRestApi } from '@spartans/app-lifecycle-backend';
import { fetch } from 'wix-fetch';
import { contacts, triggeredEmails } from 'wix-crm-backend';
import { notifications } from '@wix/notifications';
import { upsertNotification, getCurrentNotification, getPendingItemsForDate } from './user-notifications-dal';
import { getPremiumTrialEnd, getPremiumDetails } from './premium-check';

globalThis.fetch = fetch;

const PREIMUM_END_REMINDER_IN_DAYS = 2;
const PREIMUM_ENDED_MIN_REMINDER_IN_DAYS = 7;


const PREIMUM_END_REMINDER_IN_MILLIS = PREIMUM_END_REMINDER_IN_DAYS * (24 * 60 * 60 * 1000);
const PREIMUM_ENDED_MIN_REMINDER_IN_MILLIS = PREIMUM_ENDED_MIN_REMINDER_IN_DAYS * (24 * 60 * 60 * 1000);

async function createWixClient(instanceId) {
    const AppConfig = getAppConfig();
    const AppOauth = getAppOauth();
    const [refreshToken, appId, appSecret] = await Promise.all([
        AppOauth.getRefreshTokenByInstanceId(instanceId),
        AppConfig.getId(),
        AppConfig.getSecret(),
    ]);
    return createClient({
        modules: { siteProperties, notifications },
        auth: WixAppOAuthStrategy({ appId, appSecret, refreshToken })
    });
}

/**
 * Create a JavaScript Date object from a date string in the format DD-MM-YYYY.
 *
 * @param {string} dateString - The date string in the format DD-MM-YYYY.
 * @returns {Date | null} A JavaScript Date object representing the parsed date or null if parsing fails.
 * 
 * @example
 * // Example usage:
 * const dateString = '20/11/2023';
 * const parsedDate = createDateFromFormat(dateString);
 * console.log(parsedDate); // Tue Nov 20 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
 */
export function notifucationDateToDate(dateString) {
  // Split the date string into day, month, and year parts
  const [day, month, year] = dateString.split('/').map(Number);

  // Check if the parts are valid
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.error('Invalid date format');
    return null;
  }

  // Create a new Date object (months are zero-based in JavaScript, so subtract 1 from the month)
  const parsedDate = new Date(year, month - 1, day);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date');
    return null;
  }

  return parsedDate;
}

export async function sendPremiumEndedShoutout(instanceId, trialStatusMsg) {
    const triggeredEmailTemplateId = '';
    const appId = await getAppConfig().getId();
    const upgardeUrl = `https://www.wix.com/apps/upgrade/${appId}?appInstanceId=${instanceId}`;
    const wixClient = await createWixClient(instanceId);

    const { properties } = await wixClient.siteProperties.getSiteProperties({ fields: ['email', 'businessName'] });

    const variables = {
        upgardeUrl,
        trialStatus: trialStatusMsg,
    };

    if (properties.email) {
        const { _id: contactId } = await getOrCreateContact(properties);
        return triggeredEmails.emailContact(triggeredEmailTemplateId, contactId, { variables });
    }
}

export async function sendPremiumEndedNotification(instanceId, trialStatusMsg) {
    const AppConfig = getAppConfig();
    const AppOauth = getAppOauth();

    const [tokens, appId] = await Promise.all([
        AppOauth.getTokensByInstanceId(instanceId),
        AppConfig.getId(),
    ]);
    const notificationTemplateId = '7da5c6f8-e835-4047-8d0d-868753e8af4a';
    const upgardeUrl = `<a href="https://www.wix.com/apps/upgrade/${appId}?appInstanceId=${instanceId}">Upgrade</a>`;

    return invokeWixRestApi({
        accessToken: tokens.accessToken,
        method: 'POST',
        requestUrl: 'https://www.wixapis.com/notifications/v3/notify',
        input: {
            notificationTemplateId,
            dynamicValues: {
                trialStatus: { text: trialStatusMsg },
                upgardeUrl: { text: upgardeUrl }
            }
        }
    });
}

export async function getOrCreateContact(contactInfo) {
    const { email, businessName } = contactInfo;
    const { items } = await contacts.queryContacts().eq('info.emails.email', email).find();
    let contact;
    if (items.length) {
        contact = items[0];
    } else {
        contact = await contacts.createContact({
            name: {
                first: businessName || email,
                last: '',
            },
            emails: [{ email }],
            phones: []
        }, { allowDuplicates: false, suppressAuth: true });
    }
    return contact;
}

export async function createTrialEndNotification({firstInstallationDate, instanceId}) {
    return upsertNotification({
        instanceId,
        notificationType: 'TRIAL_ABOUT_TO_END',
        notificationDate: new Date(getPremiumTrialEnd(firstInstallationDate).getTime() - PREIMUM_END_REMINDER_IN_MILLIS),
        notificationStatus: 'PENDING',
    });
}

export async function createTrialEndedNotification({ instanceId }) {
    const notificationType = 'TRIAL_ENDED';
    const pendingNotification = await getCurrentNotification({ instanceId, notificationType });
    let shouldUpsertNotification = 
        !pendingNotification ||
        (
            pendingNotification.status === 'DONE' &&
            notifucationDateToDate(pendingNotification.notificationDate).getTime() < (Date.now() - PREIMUM_ENDED_MIN_REMINDER_IN_MILLIS)
        ); 
    return shouldUpsertNotification ? upsertNotification({
        instanceId,
        notificationType,
        notificationDate: new Date(Date.now() + 1 * (24 * 60 * 60 * 1000)),
        notificationStatus: 'PENDING',
    }) : null;
}

export async function sendNotificationsRoutine() {
    console.log('[user-notifications:routine] - START');
    const notifications = await getPendingItemsForDate();
    console.log(`[user-notifications:routine] - ${notifications?.length ?? 0} pending notifications found.`);
    return Promise.all(notifications.map(async (notification, index) => {
        const { instanceId, notificationType } = notification;
        const premiumStatus = await getPremiumDetails(instanceId);
        console.log(`[user-notifications:routine] - notfification #${index + 1} for ${instanceId} - should send: ${!premiumStatus.isPremium}`);
        if (!premiumStatus.isPremium) {
            await sendPremiumEndedNotification(
                instanceId,
                notificationType === 'TRIAL_ABOUT_TO_END' ? 'is about to end' : 'has ended',
            )
        }
        return upsertNotification({
            instanceId,
            notificationType,
            notificationStatus: "DONE",
        });
    }));
}