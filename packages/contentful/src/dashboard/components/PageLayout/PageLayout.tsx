import React from 'react';
import { Button, Layout, Page, Tooltip } from '@wix/design-system';
import { getInstanceId } from '../../utils';

interface Props {
  children: React.ReactNode;
  dataHook: string;
  showUpgradeButton: boolean;
  endOfTrialDate: string;
  title: string;
}

export default function PageLayout({
	children,
	dataHook,
	title,
	showUpgradeButton,
	endOfTrialDate
}: Props) {
	const openPremiumPage = () => {
		window.open(`https://www.wix.com/apps/upgrade/9f6d5767-4aea-4de0-93bc-ae381c513365?appInstanceId=${getInstanceId()}`, '_blank');
	};
	return (
		<Page>
			<Page.Header dataHook={dataHook} title={title} actionsBar={showUpgradeButton &&
				(<Tooltip dataHook="upgrade-tooltip" content={`Your trial will end on ${endOfTrialDate}`}><Button dataHook="upgrade" skin="premium" onClick={openPremiumPage}>Upgrade</Button></Tooltip>)
			} />
			<Page.Content>
				<Layout>{children}</Layout>
			</Page.Content>
		</Page>
	);
}
