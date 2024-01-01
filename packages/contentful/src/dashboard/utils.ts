import {CONNECT_URL} from "./constants/constants";

export function getAppInstance() {
	return new URLSearchParams(window.location.search).get('instance')!;
}

function parseJwt(token: string) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

export function getInstanceId() {
	const token = parseJwt(getAppInstance());
	return token.instanceId;
}

export function getContentfulAuthorizeUrl() {
	return `${CONNECT_URL}${getAppInstance()}`;
}
