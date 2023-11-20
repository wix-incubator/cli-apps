import { Cell } from '@wix/design-system';
import CardLayout from '../CardLayout/CardLayout';
import { SettingsForm } from '../SettingsFormLayout/SettingsForm/SettingsForm';
import PageLayout from '../PageLayout/PageLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Page = () => {
	const {t} = useTranslation();

	return (
		<PageLayout title={t('app.title')!} dataHook="app-title">
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