export const FREE_TRIAL_PERIOD = 14; // days
export const FREE_TRIAL_PERIOD_MILLIS = FREE_TRIAL_PERIOD * 24 * 60 * 60 * 1000;

import { getAppOauth } from '@spartans/app-lifecycle-backend';

export async function getPremiumDetails(instanceId) {
    const result = {
        isPremium: false,
        infoExists: false,
        hasPremiumPlan: false,
    };
    const appInfo = await getAppOauth().getAppInfoByInstanceId(instanceId);
    if (appInfo) {
        result.infoExists = true;
        const appInstance = await getAppOauth().getAppInstance(appInfo.refreshToken, appInfo.accessToken);
        const trialEndTime = getPremiumTrialEnd(appInfo._createdDate).getTime();
        result.isPremium = Date.now() < trialEndTime || !!appInstance?.billing?.packageName;
        result.hasPremiumPlan = !!appInstance?.billing?.packageName;
        result.trialEndDate = trialEndTime;
    }

    return result;
}

export function getPremiumTrialEnd(date) {
    return new Date(date.getTime() + FREE_TRIAL_PERIOD_MILLIS);
}