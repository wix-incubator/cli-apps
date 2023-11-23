import { Cell } from '@wix/design-system';
import CardLayout from '../CardLayout/CardLayout';
import { SettingsForm } from '../SettingsFormLayout/SettingsForm/SettingsForm';
import PageLayout from '../PageLayout/PageLayout';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getInstanceId } from '../../utils';

export const Page = () => {
	const {t} = useTranslation();
	const [showUpgradeButton, setShowUpgradeButton] = useState(false);

	useEffect(() => {
		const instanceId = getInstanceId();
		fetch(`https://ronnyr34.wixsite.com/oauth-contentful/_functions/connectionPermissions?instanceId=${instanceId}`)
			.then((res) => res.json())
			.then((data) => {
				setShowUpgradeButton(!data.hasPremiumPlan);
			});
	}, []);

	return (
		<PageLayout title={t('app.title')!} dataHook="app-title" showUpgradeButton={showUpgradeButton}>
			<Cell>
				<CardLayout
					title={`${t('app.title')} ${t('contentful.settings.card.title')}`}
				>
					<SettingsForm/>
				</CardLayout>
			</Cell>
		</PageLayout>
	);
};