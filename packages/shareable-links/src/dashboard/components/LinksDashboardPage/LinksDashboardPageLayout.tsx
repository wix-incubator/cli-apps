import { Page, Text, TextButton } from '@wix/design-system';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import { DataHook } from '../DataHook';

export const LinksDashboardPageLayout: React.FC<{ dataHook?: string }> = ({
	children,
	dataHook,
}) => {
	const { t } = useTranslation();

	return (
		<Page dataHook={dataHook}>
			<Page.Header
				title={t('links-page.page-title')}
				subtitle={
					<Text>
						<Trans
							i18nKey="links-page.page-subtitle.with-cta"
							components={{
								learnMore: (
									<TextButton
										dataHook={DataHook.DashboardPage.LearnMoreButton}
										as="a"
										// onClick={logLearnMoreClick}
										href={t('links-page.page-subtitle.article-link')}
										target="_blank"
										rel="noopener noreferrer"
									/>
								),
							}}
						/>
					</Text>
				}
			/>
			<Page.Content>{children}</Page.Content>
		</Page>
	);
};
