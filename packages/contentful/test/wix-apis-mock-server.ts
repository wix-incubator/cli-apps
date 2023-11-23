import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { externalDatabaseConnections } from '@wix/data';
import _ from 'lodash';

export const localesMock = {items: [{code: 'he', name: 'Hebrew'}, {code: 'en-US', name: 'English'}]};
export const envsMock = {items: [{sys: {id: 'env-id1'}, name: 'master1'}, {sys: {id: 'env-id'}, name: 'master'}]};
export const spacesMock = {items: [{sys: {id: 'space-id1'}, name: 'my space1'}, {sys: {id: 'space-id'}, name: 'my space'}]};

export const wixApisMockServer = setupServer(http.get('https://api.contentful.com/spaces/*/environments/*/locales', () => {
	return HttpResponse.json(localesMock);
}), http.get('https://api.contentful.com/spaces/*/environments', () => {
	return HttpResponse.json(envsMock);
}), http.get('https://api.contentful.com/spaces', () => {
	return HttpResponse.json(spacesMock);
}), http.get('https://ronnyr34.wixsite.com/oauth-contentful/_functions/connectionPermissions', () => {
	return HttpResponse.json({hasPremiumPlan: false, trialEndDate: 1701942343229});
}));

export function givenConnection(externalDatabaseConnections: externalDatabaseConnections.ExternalDatabaseConnection[]) {
	wixApisMockServer.use(
		http.get('https://readonly.wixapis.com/wix-data/v1/external-database-connections', () => {
			return HttpResponse.json({externalDatabaseConnections});
		})
	);
}

export function givenAppPremium() {
	wixApisMockServer.use(
		http.get('https://ronnyr34.wixsite.com/oauth-contentful/_functions/connectionPermissions', () => {
			return HttpResponse.json({hasPremiumPlan: true});
		})
	);
}

export function givenUpdatedConnection(externalDatabaseConnection: externalDatabaseConnections.ExternalDatabaseConnection) {
	wixApisMockServer.use(
		http.put(`https://www.wixapis.com/wix-data/v1/external-database-connections/${externalDatabaseConnection.name}`, async ({request}) => {
			const updatedConnection = await request.json() as externalDatabaseConnections.UpdateExternalDatabaseConnectionRequest;
			if (!_.isEqual(updatedConnection.externalDatabaseConnection, externalDatabaseConnection)) {
				return HttpResponse.error();
			}
			return HttpResponse.json({externalDatabaseConnection});
		})
	);
}