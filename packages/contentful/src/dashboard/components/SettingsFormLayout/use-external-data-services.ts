import { useMutation, useQuery } from '@tanstack/react-query';
import { useWixModules } from '@wix/sdk-react';
import { externalDatabaseConnections } from '@wix/data';

export const useListingExternalDataServices = () => {
	const {listExternalDatabaseConnections} = useWixModules(externalDatabaseConnections);

	return useQuery({
		queryKey: ['external-data-listing-query'],
		queryFn: async () => {
			const {externalDatabaseConnections} =  await listExternalDatabaseConnections({
				paging: {
					limit: 1,
				},
			});
			return externalDatabaseConnections;
		},
	});
};

export const useUpdateExternalDataServices = () => {
	const {updateExternalDatabaseConnection} = useWixModules(externalDatabaseConnections);

	return useMutation({
		mutationKey: ['external-data-update-mutation'],
		mutationFn: ({
						 configuration,
						 endpoint,
						 name,
					 }: {
			configuration: Record<string, string>;
			endpoint: string;
			name: string;
		}) => updateExternalDatabaseConnection(name, {configuration, endpoint}),
	});
};
