import { response, ok } from 'wix-http-functions';
import { getAppOauth } from '@spartans/app-lifecycle-backend';
import { getPremiumDetails } from './services/premium-check';
import { createTrialEndedNotification } from './services/user-notifications';

const DOMAIN = 'https://www.contentful-on-wix.com';

const getContentfulUrl = (state) => `https://be.contentful.com/oauth/authorize?response_type=token&client_id=9Wz-lSI1zkjklixT8jQO7wfIGqvAyoLa5LpD5dHzjCU&redirect_uri=${
        DOMAIN
      }/contentful&scope=content_management_manage&state=${
        JSON.stringify(state)
      }`

const redirect = (url) => response({
    status: 302,
    headers: {
        'Content-Type': 'application/json',
        Location: url,
    },
});

export function get_redirectToInstall(request) {
    return getAppOauth().oauthSignup(request, `${DOMAIN}/_functions/redirectToContentful`);
}

export function get_redirectToContentful(request) {
    const { code } = request.query;
    const state = { code };
    return redirect(getContentfulUrl(state));
}

export async function get_connectionPermissions(request) {
    const result = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const instanceId = request.query.instanceId;
    const [body, _] = await Promise.all([
        getPremiumDetails(instanceId),
        createTrialEndedNotification({instanceId}).catch(e => {
            // don't fail the process for this.
            console.error('[http-function:get:connectionPermissions] - failed to update trial notification', e);
        }),
    ])
    result.body = body;

    return ok(result)
}

export function get_redirectToContentfulFromBM(request) {
    const { authorization } = request.query;
    const state = { alreadyInstalled: true, authorization };
    return redirect(getContentfulUrl(state));
}

export function get_closeWindow() {
    const result = {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: `<html><body><script>window.close()</script></body></html>`
    };

    return response(result);
}