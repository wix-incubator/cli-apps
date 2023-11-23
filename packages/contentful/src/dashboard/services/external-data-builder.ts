import { Chance } from 'chance';
import { externalDatabaseConnections } from '@wix/data';

const chance = new Chance();

const externalData = {
	name: chance.name().replace(' ', '_'),
	endpoint: chance.url(),
	configuration: {
		spaceId: 'space-id',
		environmentId: 'env-id',
		locale: 'en-US',
		apiKey: chance.guid(),
		secretKey: chance.guid(),
		appInstanceId: chance.guid(),
	},
};

export const anExternalDatabaseConnection =
    (overrides?: externalDatabaseConnections.ExternalDatabaseConnection) => Object.assign({...overrides}, externalData);