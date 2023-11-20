export const listExternalData = (fn: Function) => {
	return {
		listExternalDatabaseConnections: async () => {
			const {externalDatabaseConnections: data} = await fn(
				{
					paging: {
						limit: 1,
					},
				},
			);
			return data || [];
		},
	};
};

export const updateExternalData = (
	fn: Function,
	{
		configuration,
		endpoint,
		name,
	}: {
        configuration: Record<string, string>;
        endpoint: string;
        name: string;
    },
) => {
	return {
		updateExternalDatabaseConnection: async () => {
			return fn(name, {
				configuration,
				endpoint,
			});
		},
	};
};
