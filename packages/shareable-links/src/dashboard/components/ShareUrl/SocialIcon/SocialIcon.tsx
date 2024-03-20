import { Image, TextButton, Tooltip } from '@wix/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LinkShareOptions = {
	Facebook: 'FACEBOOK',
	Twitter: 'TWITTER',
	Whatsapp: 'WHATSAPP',
	Mail: 'MAIL',
	Pinterest: 'PINTEREST',
	Linkedin: 'LINKEDIN',
} as const;

const urlBySocialNetwork = {
	[LinkShareOptions.Facebook]: 'https://facebook.com/sharer.php?u=%url',
	[LinkShareOptions.Twitter]: 'https://twitter.com/intent/tweet/?url=%url',
	[LinkShareOptions.Whatsapp]: 'https://api.whatsapp.com/send/?phone&text=%url',
	[LinkShareOptions.Pinterest]: 'https://pinterest.com/pin/create/button/?url=%url',
	[LinkShareOptions.Linkedin]: 'https://linkedin.com/sharing/share-offsite/?url=%url',
} as const;

export type LinkShareOptions =
    | 'FACEBOOK'
    | 'TWITTER'
    | 'WHATSAPP'
    | 'MAIL'
    | 'PINTEREST'
    | 'LINKEDIN';

export const getShareLinkForSocialNetwork = ({
	url,
	socialNetworkType,
}: {
    url: string;
    socialNetworkType: Exclude<LinkShareOptions, 'MAIL'>;
}): string => {
	const link = urlBySocialNetwork[socialNetworkType];
	return link.replace('%url', encodeURIComponent(url));
};

export const getShareLinkForShareViaMail = ({
	subject,
	body,
}: {
    subject: string;
    body: string;
}) => {
	return `mailto:?subject=${encodeURIComponent(
		subject,
	)}&body=${encodeURIComponent(body)}`;
};

const ICON_SIZE = 28;

const TooltipIfContent: React.FC<{ content?: string }> = ({
	children,
	content,
}: any) =>
	content ? (
		<Tooltip disabled={false} inline content={content}>
			{children}
		</Tooltip>
	) : (
		<>{children}</>
	);

export const SocialIcon = ({
	svg,
	url,
	socialNetworkType,
}: {
    svg: string;
    url: string;
    socialNetworkType: LinkShareOptions;
}) => {
	const {t} = useTranslation();

	const shareLink =
        socialNetworkType === LinkShareOptions.Mail
        	? getShareLinkForShareViaMail({
        		subject: t('links-page.share-url-modal.share-via-mail.subject'),
        		body: t('links-page.share-url-modal.share-via-mail.body', { url }),
        	})
        	: getShareLinkForSocialNetwork({ url, socialNetworkType });

	return (
		<TooltipIfContent>
			<TextButton
				as="a"
				href={shareLink}
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: 'inline-flex',
					alignItems: 'flex-start',
					height: ICON_SIZE,
					borderRadius: ICON_SIZE,
					opacity: 1,
				}}
				size="small"
			>
				<Image
					alt={svg}
					src={svg}
					width={ICON_SIZE}
					height={ICON_SIZE}
					borderRadius={ICON_SIZE}
				/>
			</TextButton>
		</TooltipIfContent>
	);
};
