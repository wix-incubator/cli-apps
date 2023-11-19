import { ExternalDatabaseConnectionType } from '../types';

export const defaultExternalDatabaseConnection: ExternalDatabaseConnectionType =
    {
    	configuration: {
    		spaceId: '',
    		environmentId: '',
    		secretKey: '',
    		apiKey: '',
    		locale: '',
    	},
    	endpoint: '',
    	name: '',
    } as const;
