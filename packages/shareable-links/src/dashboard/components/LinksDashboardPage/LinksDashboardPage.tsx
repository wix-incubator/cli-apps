import {
	Box,
	Cell,
	Heading,
	Layout,
	PageFooter,
	Text,
} from '@wix/design-system';
import React from 'react';
import { DataHook } from '../DataHook';
import { LinksDashboardPageLayout } from './LinksDashboardPageLayout';
import { useTranslation } from 'react-i18next';
import { ShareCard } from './ShareCard/ShareCard';
import { apps, Item, items } from './items';
import { useDashboard } from '@wix/dashboard-react';

export const LinksDashboardPage = () => {
	const { t } = useTranslation();
	const { openModal } = useDashboard();

	const openLinkOptionsModal = (item: Item) => {
		void openModal('961c3d60-205b-4c8d-b9b9-6679da4a408e', {
			...item,
		});
	};

	return (
		<LinksDashboardPageLayout dataHook={DataHook.DashboardPage.Container}>
			<Layout>
				{Object.keys(items).map((app) => (
					<>
						<Cell span={12}>
							<Heading as="h4" size="small">
								{apps[app]}
							</Heading>
						</Cell>
						{items[app].map((item) => (
							<Cell key={item.dataCollectionId}>
								<ShareCard
									image={item.image}
									title={t(item.title)}
									subtitle={t(item.subtitle)}
									onClickCreateLink={() => openLinkOptionsModal(item)}
								/>
							</Cell>
						))}
					</>
				))}
				<Cell>
					<Box marginTop="SP1" display="block">
						<PageFooter divider>
							<PageFooter.Center>
								<Text secondary size="small">
									{t('links-page.page-footer-disclaimer')}
								</Text>
							</PageFooter.Center>
						</PageFooter>
					</Box>
				</Cell>
			</Layout>
		</LinksDashboardPageLayout>
	);
};
