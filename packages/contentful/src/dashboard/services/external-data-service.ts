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
) => {
	return {
		updateExternalDatabaseConnection: async ({
													 configuration,
													 endpoint,
													 name,
												 }: {
			configuration: Record<string, string>;
			endpoint: string;
			name: string;
		}) => {
			return fn(name, {
				configuration,
				endpoint,
			});
		},
	};
};
