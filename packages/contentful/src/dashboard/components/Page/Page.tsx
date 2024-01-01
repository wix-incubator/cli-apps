import { Cell, SectionHelper } from '@wix/design-system';
import CardLayout from '../CardLayout/CardLayout';
import { SettingsForm } from '../SettingsFormLayout/SettingsForm/SettingsForm';
import PageLayout from '../PageLayout/PageLayout';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getContentfulAuthorizeUrl, getInstanceId} from '../../utils';
import {
	CHECK_PREMIUM_URL,
	DEV_MODE_NOT_SET_ERROR_CODE,
	SUPPORT_CMS_URL, SUPPORT_DEV_MODE_URL,
	UPGRADE_URL
} from '../../constants/constants';
import { useListingExternalDataServices } from '../SettingsFormLayout/use-external-data-services';
import { LoadingLayout } from '../LoadingLayout/LoadingLayout';
import { Link } from '../LinkWrapper/Link';

export const Page = () => {
	const {t} = useTranslation();
	const [upgradeButton, setUpgradeButton] = useState({show: false, isTrialEnded: false, endOfTrialDate: ''});
	const { data, isLoading, isError, error } = useListingExternalDataServices();

	useEffect(() => {
		const instanceId = getInstanceId();
		fetch(`${CHECK_PREMIUM_URL}${instanceId}`)
			.then((res) => res.json())
			.then((data) => {
				setUpgradeButton({show: !data.hasPremiumPlan, isTrialEnded: new Date() > new Date(data.trialEndDate) , endOfTrialDate: new Date(data.trialEndDate).toDateString()});
			});
	}, []);

	const SupportCmsLink = ({children}: {children?: React.ReactNode}) => {
		return <a href={SUPPORT_CMS_URL} target="_blank" rel="noreferrer">{children}</a>;
	};

	const openPremiumPage = () => {
		window.open(`${UPGRADE_URL}${getInstanceId()}`, '_blank');
	};

	return isLoading ? <LoadingLayout /> : (
		<PageLayout title={t('app.title')!} dataHook="app-title" showUpgradeButton={upgradeButton.show}>
			{upgradeButton.show &&
				<Cell>
					<SectionHelper fullWidth dataHook="upgrade-section" appearance={upgradeButton.isTrialEnded ? 'danger' : 'premium'} title={t('contentful.settings.card.upgrade.title')} actionText={t('contentful.settings.card.upgrade.action')!} onAction={openPremiumPage}>
						{upgradeButton.isTrialEnded ? t('contentful.settings.card.trialEnded'): t('contentful.settings.card.trialEnd', {endOfTrialDate: upgradeButton.endOfTrialDate})}
					</SectionHelper>
				</Cell>
			}
			<Cell>
				{data && !data!.length && !upgradeButton.isTrialEnded ?
					<SectionHelper fullWidth dataHook="missing-connection" appearance="danger" title={t('contentful.settings.form.missingConfiguration.title')} actionText={t('contentful.settings.form.missingConfiguration.action')!} onAction={() => {
						window.open(getContentfulAuthorizeUrl(), '_blank');
					}}>
						<Trans i18nKey="contentful.settings.form.missingConfiguration.message" components={{1: (<SupportCmsLink/>)}}/>
					</SectionHelper> :
					isError ?
						<SectionHelper fullWidth dataHook="connection-error-helper" appearance="danger" title={t('contentful.settings.form.errorConfiguration.title')}>
							<Trans
								i18nKey={(error as any)?.details?.applicationError?.code === DEV_MODE_NOT_SET_ERROR_CODE ?
									'contentful.settings.form.errorConfiguration.noDevMode.message' :
									'contentful.settings.form.errorConfiguration.general.message'
								}
								components={{1: (<Link as="a" size="small" url={SUPPORT_DEV_MODE_URL}/>)}
								}/>
						</SectionHelper> :
						<CardLayout
							title={t('contentful.settings.card.title')!}
						>
							<SettingsForm externalListData={data!}/>
						</CardLayout>
				}
			</Cell>
		</PageLayout>
	);
};
