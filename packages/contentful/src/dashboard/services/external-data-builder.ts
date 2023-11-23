import { Chance } from 'chance';
import { externalDatabaseConnections } from '@wix/data';

const chance = new Chance();

const externalData = {
	name: chance.name().replace(' ', '_'),
	endpoint: chance.url(),
	configuration: {
		spaceId: chance.guid(),
		environmentId: chance.guid(),
		locale: 'en-US',
		apiKey: chance.guid(),
		secretKey: chance.guid(),
		appInstanceId: chance.guid(),
	},
};

export const anExternalDatabaseConnection =
    (overrides?: externalDatabaseConnections.ExternalDatabaseConnection) => Object.assign({...overrides}, externalData);