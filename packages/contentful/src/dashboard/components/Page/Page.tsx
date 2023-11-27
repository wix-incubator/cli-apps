import { Cell, SectionHelper } from '@wix/design-system';
import CardLayout from '../CardLayout/CardLayout';
import { SettingsForm } from '../SettingsFormLayout/SettingsForm/SettingsForm';
import PageLayout from '../PageLayout/PageLayout';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getAppInstance, getInstanceId } from '../../utils';
import { CONNECT_URL, SUPPORT_CMS_URL } from '../../constants/constants';
import { useListingExternalDataServices } from '../SettingsFormLayout/use-external-data-services';
import { LoadingLayout } from '../LoadingLayout/LoadingLayout';

export const Page = () => {
	const {t} = useTranslation();
	const [upgradeButton, setUpgradeButton] = useState({show: false, endOfTrialDate: ''});
	const { data, isLoading } = useListingExternalDataServices();

	useEffect(() => {
		const instanceId = getInstanceId();
		fetch(`https://ronnyr34.wixsite.com/oauth-contentful/_functions/connectionPermissions?instanceId=${instanceId}`)
			.then((res) => res.json())
			.then((data) => {
				setUpgradeButton({show: !data.hasPremiumPlan, endOfTrialDate: new Date(data.trialEndDate).toDateString()});
			});
	}, []);

	const Link = ({children}: {children?: React.ReactNode}) => {
		return <a href={SUPPORT_CMS_URL} target="_blank" rel="noreferrer">{children}</a>;
	};

	return isLoading ? <LoadingLayout /> : (
		<PageLayout title={t('app.title')!} dataHook="app-title" showUpgradeButton={upgradeButton.show} endOfTrialDate={upgradeButton.endOfTrialDate}>
			<Cell>
				{data && !data!.length ?
					<SectionHelper dataHook="missing-connection" appearance="danger" title={t('contentful.settings.form.missingConfiguration.title')} actionText={t('contentful.settings.form.missingConfiguration.action')!} onAction={() => {
						window.open(`${CONNECT_URL}${getAppInstance()}`, '_blank');
					}}>
						<Trans i18nKey="contentful.settings.form.missingConfiguration.message" components={{1: (<Link/>)}}/>
					</SectionHelper> : <CardLayout
						title={t('contentful.settings.card.title')!}
					>
						<SettingsForm externalListData={data!}/>
					</CardLayout>}
			</Cell>
		</PageLayout>
	);
};