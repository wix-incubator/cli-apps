import React from 'react';
import {
	Box,
	Divider,
	MessageModalLayout,
	Text,
	TextButton,
	Loader,
} from '@wix/design-system';
import { CopyLinkTextbox } from './CopyLinkTextBox/CopyLinkTextBox';
import { LinkShareOptions, SocialIcon } from './SocialIcon/SocialIcon';
import email from '../../assets/icons/email.svg';
import whatsapp from '../../assets/icons/whatsapp.svg';
import facebook from '../../assets/icons/facebook.svg';
import twitter from '../../assets/icons/twitter.svg';
import pinterest from '../../assets/icons/pinterest.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import { useDashboard } from '@wix/dashboard-react';
import { useTranslation } from 'react-i18next';
import { useShortUrl } from '../../hooks/use-short-url-service';
import { ExtensionProps } from '../../types/types';

export const ShareUrlModal = (props: ExtensionProps) => {
	const { closeModal } = useDashboard();
	const { t } = useTranslation();
	const isSitePublished = (props as any)._giza_environment.hostEnvironment
		.liveSite.isSitePublished;
	const isHeadless = (
    props as any
	)._giza_environment.hostEnvironment.metasiteNamespaces?.includes('HEADLESS');
	const { isLoading, data } = useShortUrl(props, isSitePublished, isHeadless);

	const handleCloseClick = () => {
		closeModal?.();
	};

	return (
		<>
			{!isLoading ? (
				<MessageModalLayout
					dataHook="container"
					primaryButtonText={t('links-modal.primary-cta')}
					title={t('links-modal.title')}
					onCloseButtonClick={handleCloseClick}
					primaryButtonOnClick={handleCloseClick}
					sideActions={
						<TextButton
							dataHook="CancelButton"
							size="small"
							onClick={handleCloseClick}
						>
							{t('links-modal.cancel')}
						</TextButton>
					}
				>
					{!isSitePublished ? (
						<Box marginBottom="SP4">
							<Text
								size="medium"
								weight="normal"
								dataHook="not-published-message"
							>
								{t('links-modal.site-not-published')}
							</Text>
						</Box>
					) : (
						<>
							<Box
								marginBottom="SP2"
								align="space-between"
								verticalAlign="middle"
							>
								<Text dataHook="Label" size="medium" weight="normal">
									{t('links-modal.copy-link')}
								</Text>
							</Box>
							<Box marginBottom="SP4" direction="vertical">
								<CopyLinkTextbox url={data} />
							</Box>
							<Divider skin="light" />
							<Box marginTop="SP4" gap="SP2" direction="vertical">
								<Text size="medium" weight="normal">
									{t('links-modal.other-social-share')}
								</Text>
								<Box gap="SP2">
									<SocialIcon
										svg={email}
										url={data}
										socialNetworkType={LinkShareOptions.Mail}
									/>
									<SocialIcon
										svg={whatsapp}
										url={data}
										socialNetworkType={LinkShareOptions.Whatsapp}
									/>
									<SocialIcon
										svg={facebook}
										url={data}
										socialNetworkType={LinkShareOptions.Facebook}
									/>
									<SocialIcon
										svg={twitter}
										url={data}
										socialNetworkType={LinkShareOptions.Twitter}
									/>
									<SocialIcon
										svg={pinterest}
										url={data}
										socialNetworkType={LinkShareOptions.Pinterest}
									/>
									<SocialIcon
										svg={linkedin}
										url={data}
										socialNetworkType={LinkShareOptions.Linkedin}
									/>
								</Box>
							</Box>
						</>
					)}
				</MessageModalLayout>
			) : (
				<Loader />
			)}
		</>
	);
};
