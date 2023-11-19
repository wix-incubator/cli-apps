import React from 'react';
import { Box, Loader } from '@wix/design-system';

export const LoadingLayout: React.FC = () => {
	return (
		<Box
			verticalAlign="middle"
			align="center"
			direction="vertical"
			height="440px"
		>
			<Loader size="medium" />
		</Box>
	);
};
