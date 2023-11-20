import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { externalDatabaseConnections } from '@wix/data';
import _ from 'lodash';

export const wixApisMockServer = setupServer(http.get('https://api.contentful.com/spaces/*/environments/*/locales', () => {
	return HttpResponse.json({items: [{code: 'en-US', name: 'English'}]});
}));

export function givenConnection(externalDatabaseConnections: externalDatabaseConnections.ExternalDatabaseConnection[]) {
	wixApisMockServer.use(
		http.get('https://readonly.wixapis.com/wix-data/v1/external-database-connections', () => {
			return HttpResponse.json({externalDatabaseConnections});
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