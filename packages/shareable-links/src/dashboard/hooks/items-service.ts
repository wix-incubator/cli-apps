import { useQuery } from '@tanstack/react-query';
import { items } from '@wix/data';
import { useWixModules } from '@wix/sdk-react';

export const getItems = (params: {
  dataCollectionId: string;
  entityField: string;
}) => {
	const { queryDataItems } = useWixModules(items);
	return useQuery(['items-service', params.dataCollectionId], async () => {
		const data = await queryDataItems({
			dataCollectionId: params.dataCollectionId,
		})
			.limit(30)
			.find();
		return data.items.map((item) => ({
			id: item.data?._id,
			name: item.data![params.entityField],
		}));
	});
};
