import { useQuery } from '@tanstack/react-query';
import { items } from '@wix/data';
import { useWixFetch, useWixModules } from '@wix/sdk-react';
import { ExtensionProps } from '../types/types';

export const useShortUrl = (params: ExtensionProps, isSitePublished: boolean, isHeadless: boolean) => {
	if (!isSitePublished) {
		return {isLoading: false, data: ''};
	}
	const wixFetch = useWixFetch();
	const {queryDataItems} = useWixModules(items);

	return useQuery(['use-short-url-service', params.dataCollectionId, params.selectedId], async () => {
		const data = await queryDataItems({
			dataCollectionId: params.dataCollectionId,
		}).eq('id', params.selectedId).find();
		const item = data.items[0] || {};
		const id = item!.data![params.fieldName as string];

		const resSession: any = await wixFetch('redirect-session/v1/redirect-session-for-anonymous', {method: 'POST',
			body: JSON.stringify({[params.redirectField]: {[params.redirectIdentifier]: id},
				preferences: {useGenericWixPages: isHeadless, createShortUrl: true}})});
		const jsonSession = await resSession.json();
		return jsonSession.redirectSession?.shortUrl;
	});
};