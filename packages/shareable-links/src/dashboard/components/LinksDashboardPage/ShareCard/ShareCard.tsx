import { Box, Button, Card, Heading, Image, Text } from '@wix/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type ShareCardLayoutProps = {
  title: string;
  subtitle: string;
  image: string;
  onClickCreateLink?: () => void;
};

export const ShareCard: React.FC<ShareCardLayoutProps> = ({
	title,
	subtitle,
	image,
	children,
	onClickCreateLink,
}) => {
	const { t } = useTranslation();

	return (
		<Card>
			<Box padding="SP4">
				<Box flexShrink={0} backgroundColor="D60" borderRadius={6} width={190}>
					<Image src={image} alt={title} />
				</Box>
				<Box paddingLeft="SP4" direction="vertical" verticalAlign="middle">
					<Box gap="SP1" direction="vertical">
						<Heading as="h4" size="small">
							{title}
						</Heading>

						<Text secondary size="small" weight="thin">
							{subtitle}
						</Text>
					</Box>

					<Box paddingTop="SP4">
						<Text secondary size="small" weight="thin">
							{children}
						</Text>
					</Box>

					<Box paddingTop="SP4">
						<Button
							priority="secondary"
							size="small"
							onClick={onClickCreateLink}
							dataHook="create-link-button"
						>
							{t('links-page.card.create-link-button')}
						</Button>
					</Box>
				</Box>
			</Box>
		</Card>
	);
};
