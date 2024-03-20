import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

export const MOCK_SHORT_URL = 'https://short.url';
export const MOCK_HEADLESS_SHORT_URL = 'https://headless.url';

export const wixApisMockServer = setupServer(http.post('https://www.wixapis.com/wix-data/v2/items/query', async ({request}) => {
	const body: any = await request.json();
	if (body.query.filter.id === 'selectedId' && body.dataCollectionId === 'dataCollectionId') {
		return HttpResponse.json({dataItems: [{data: {fieldName: 'some-slug'}}] });
	}
}), http.post('https://www.wixapis.com/redirect-session/v1/redirect-session-for-anonymous', async ({request}) => {
	const body: any = await request.json();
	if (body.preferences.useGenericWixPages) {
		return HttpResponse.json({redirectSession: {shortUrl: MOCK_HEADLESS_SHORT_URL}});
	}
	return HttpResponse.json({redirectSession: {shortUrl: MOCK_SHORT_URL}});
})
);