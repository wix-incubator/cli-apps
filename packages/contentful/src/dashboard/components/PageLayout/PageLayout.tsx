import React from 'react';
import { Box, Button, Layout, Page } from '@wix/design-system';
import { getInstanceId } from '../../utils';
import { useTranslation } from 'react-i18next';
import { DOCS_URL, UPGRADE_URL } from '../../constants/constants';

interface Props {
  children: React.ReactNode;
  dataHook: string;
  showUpgradeButton: boolean;
  title: string;
}

export default function PageLayout({
	children,
	dataHook,
	title,
	showUpgradeButton,
}: Props) {
	const {t} = useTranslation();
	const openPremiumPage = () => {
		window.open(`${UPGRADE_URL}${getInstanceId()}`, '_blank');
	};
	const openDocs = () =>
		window.open(DOCS_URL, '_blank');

	const renderActions = () => (
		<Box gap={2}>
			<Button dataHook="docs" skin="light" onClick={openDocs}>{t('contentful.settings.card.documentation')}</Button>
			{showUpgradeButton &&
			<Button dataHook="upgrade" skin="premium" onClick={openPremiumPage}>{t('contentful.settings.card.upgrade.action')}</Button>}
		</Box>
	);

	return (
		<Page>
			<Page.Header dataHook={dataHook} title={title} actionsBar={renderActions} />
			<Page.Content>
				<Layout>{children}</Layout>
			</Page.Content>
		</Page>
	);
}
