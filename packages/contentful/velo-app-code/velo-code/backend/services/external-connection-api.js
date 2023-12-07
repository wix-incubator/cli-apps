import { getAppOauth, getAppConfig } from '@spartans/app-lifecycle-backend';
import { WixAppOAuthStrategy, createClient } from '@wix/sdk';
import { externalDatabaseConnections } from '@wix/data';
import { fetch } from 'wix-fetch';

globalThis.fetch = fetch;

const CONTENTFUL_CONNECTION_NAME = 'contentful-on-wix';
const CONTENTFUL_CONNECTION_ENDPOINT = 'https://manage.wix.com/contentful-funnel-nextjs/api/spi';

async function createWixClient(instanceId) {
    const AppConfig = getAppConfig();
    const AppOauth = getAppOauth();
    const [refreshToken, appId, appSecret] = await Promise.all([
        AppOauth.getRefreshTokenByInstanceId(instanceId),
        AppConfig.getId(),
        AppConfig.getSecret(),
    ]);
    return createClient({
        modules: { externalDatabaseConnections },
        auth: WixAppOAuthStrategy({ appId, appSecret, refreshToken })
    });
}

export async function getContentfulConnection(instanceId) {
    const client = await createWixClient(instanceId);

    return client.externalDatabaseConnections.getExternalDatabaseConnection(CONTENTFUL_CONNECTION_NAME);
}

export async function createContentfulConnection(instanceId, customConfiguration) {
    const client = await createWixClient(instanceId);

    return client.externalDatabaseConnections.createExternalDatabaseConnection({
        name: CONTENTFUL_CONNECTION_NAME,
        endpoint: CONTENTFUL_CONNECTION_ENDPOINT,
        configuration: {
            locale: 'en-US',
            appInstanceId: instanceId,
            premiumPackage: '',
            ...customConfiguration,
        },
    });
}

export async function updateContentfulConnection(instanceId, customConfiguration) {
    const client = await createWixClient(instanceId);

    return client.externalDatabaseConnections.updateContentfulConnection(CONTENTFUL_CONNECTION_NAME, {
        endpoint: CONTENTFUL_CONNECTION_ENDPOINT,
        configuration: {
            // locale: 'en-US',
            appInstanceId: instanceId,
            premiumPackage: '',
            ...customConfiguration,
        },
    });
}

export async function upsertContentfulConnection(instanceId, customConfiguration) {
    const client = await createWixClient(instanceId);

    let currentConnection;

    try {
        currentConnection = await client.externalDatabaseConnections.getExternalDatabaseConnection(CONTENTFUL_CONNECTION_NAME) ?? {};
    } catch (e) {
        console.log('Failed to fetch existing connection (not exists)');
    }

    const configurationData = {
        // locale: 'en-US',
        appInstanceId: instanceId,
        premiumPackage: '',
        ...currentConnection?.configuration,
        ...customConfiguration,
    };

    return (currentConnection?.configuration) ?
        client.externalDatabaseConnections.updateExternalDatabaseConnection(CONTENTFUL_CONNECTION_NAME, {
            endpoint: CONTENTFUL_CONNECTION_ENDPOINT,
            configuration: configurationData,
        }) :
        client.externalDatabaseConnections.createExternalDatabaseConnection({
            name: CONTENTFUL_CONNECTION_NAME,
            endpoint: CONTENTFUL_CONNECTION_ENDPOINT,
            configuration: configurationData,
        });
}