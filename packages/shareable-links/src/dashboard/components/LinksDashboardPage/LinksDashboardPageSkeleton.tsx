import {
	Box,
	Card,
	Cell,
	Layout,
	SkeletonLine,
	SkeletonRectangle,
} from '@wix/design-system';
import React from 'react';
import { LinksDashboardPageLayout } from './LinksDashboardPageLayout';

const SkeletonCard = () => (
	<Card>
		<Box padding="SP4">
			<SkeletonRectangle width="188px" height="156px" />
			<Box
				paddingLeft="SP4"
				direction="vertical"
				verticalAlign="middle"
				gap="SP2"
			>
				<SkeletonLine width="139px" />

				<SkeletonLine width="426px" marginBottom="SP3" />

				<SkeletonRectangle height="30px" width="115px" />
			</Box>
		</Box>
	</Card>
);

export const LinksDashboardPageSkeleton = () => (
	<LinksDashboardPageLayout>
		<Layout>
			<Cell>
				<SkeletonCard />
			</Cell>
			<Cell>
				<SkeletonCard />
			</Cell>
			<Cell>
				<SkeletonCard />
			</Cell>
			<Cell>
				<SkeletonCard />
			</Cell>
		</Layout>
	</LinksDashboardPageLayout>
);
