//Read Our Wix Router API here  http://wix.to/94BuAAs/wix-router.html 

import { notFound, redirect } from "wix-router";

const APP_INSTALL_URL = 'https://www.wix.com/installer/install';
const DOMAIN = 'https://ronnyr34.wixsite.com/oauth-contentful';

export function installation_Router(request) {
// console.log(request);
//     // Get item name from URL request
//     const path = request.path[0];

//     if (path === 'app-url') {
//         const { token } = request.query;

//         if (!token) {
//             return;
//         }

//         const url = new URL(APP_INSTALL_URL);
//         url.searchParams.set('appId', '9f6d5767-4aea-4de0-93bc-ae381c513365');
//         url.searchParams.set('token', token);
//         url.searchParams.set(
//             'redirectUrl',
//             `${DOMAIN}/installation/redirect`
//         );

//         return redirect(url.toString(), 301);
//     } else if (path === 'redirect') {
//         const { code } = request.query;
//         const state = { code };

//         return redirect(`https://be.contentful.com/oauth/authorize?response_type=token&client_id=9Wz-lSI1zkjklixT8jQO7wfIGqvAyoLa5LpD5dHzjCU&redirect_uri=${DOMAIN}/contentful&scope=content_management_manage&state=
// ${JSON.stringify(
// 	state
// )}`, 301);
//     }

    // Return 404
    return notFound();
}