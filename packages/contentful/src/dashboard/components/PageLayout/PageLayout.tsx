import React from 'react';
import { Button, Layout, Page } from '@wix/design-system';
import { getInstanceId } from '../../utils';

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
}: Props) {
	const openPremiumPage = () => {
		window.open(`https://www.wix.com/apps/upgrade/9f6d5767-4aea-4de0-93bc-ae381c513365?appInstanceId=${getInstanceId()}`, '_blank');
	};
	return (
		<Page>
			<Page.Header dataHook={dataHook} title={title} actionsBar={<Button dataHook="upgrade" skin="premium" onClick={openPremiumPage}>Upgrade</Button>} />
			<Page.Content>
				<Layout>{children}</Layout>
			</Page.Content>
		</Page>
	);
}
