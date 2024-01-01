import {ExternalDatabaseConnection} from '@wix/data/build/cjs/src/data-v1-external-database-connection.universal';


export default async (configuration: ExternalDatabaseConnection['configuration'], instance: string) => {
	return fetch('https://www.wixapis.com/contentful-funnel-nextjs/connection/contentful/access', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': instance,
		},
		body: JSON.stringify({
			requestContext: {
				settings: configuration,
			},
		}),
	}).then((res) => res.json());
};

