import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	listExternalData, updateExternalData,
} from '../../services/external-data-service';
import { useWixModules } from '@wix/sdk-react';
import { externalDatabaseConnections } from '@wix/data';

export const useListingExternalDataServices = () => {
	const {listExternalDatabaseConnections} = useWixModules(externalDatabaseConnections);
	const listingService = useMemo(
		() => listExternalData(listExternalDatabaseConnections),
		[listExternalDatabaseConnections],
	);
	return useQuery({
		queryKey: ['external-data-listing-query'],
		queryFn: () => listingService.listExternalDatabaseConnections(),
		refetchOnWindowFocus: false,
	});
};

export const useUpdateExternalDataServices = ({
	configuration,
	endpoint,
	name,
}: {
    configuration: Record<string, string>;
    endpoint: string;
    name: string;
}) => {
	const {updateExternalDatabaseConnection} = useWixModules(externalDatabaseConnections);

	const updateService = useMemo(
		() =>
			updateExternalData(updateExternalDatabaseConnection, {configuration, endpoint, name}),
		[updateExternalDatabaseConnection, configuration, endpoint],
	);
	return useMutation({
		mutationKey: ['external-data-update-mutation'],
		mutationFn: () => updateService.updateExternalDatabaseConnection(),
	});
};
