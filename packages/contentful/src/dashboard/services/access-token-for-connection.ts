import type { externalDatabaseConnections } from '@wix/data';


export default async (configuration: externalDatabaseConnections.ExternalDatabaseConnection['configuration'], instance: string) => {
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

