import React, { useEffect, useState } from 'react';
import {
	WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withDashboard } from '@wix/dashboard-react';
import { createInstance as createI18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { useEnvironment } from '@wix/sdk-react';
import { ShareUrlModal } from '../../components/ShareUrl/ShareUrl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExtensionProps } from '../../types/types';

const i18n = createI18n()
	.use({
		type: 'backend' as const,
		read(
			language: string,
			_namespace: string,
			callback: (
                errorValue: unknown,
                translations: null | Record<string, string>,
            ) => void,
		) {
			import(`../../assets/locale/messages_${language}.json`)
				.then((resources) => {
					callback(null, resources.default);
				})
				.catch((error) => {
					callback(error, null);
				});
		},
	});

export const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}});

export default withDashboard(function Modal(props: ExtensionProps) {
	const [i18nInitialized, setI18nInitialized] = useState(false);
	const {locale} = useEnvironment() as { locale: string };

	useEffect(() => {
		i18n
			.init({
				lng: locale,
			})
			.then(() => {
				setI18nInitialized(true);
			});
	}, [locale]);

	return (
		<I18nextProvider i18n={i18n}>
			<QueryClientProvider client={queryClient}>
				<WixDesignSystemProvider>
					{i18nInitialized && <ShareUrlModal {...props} />}
				</WixDesignSystemProvider>
			</QueryClientProvider>
		</I18nextProvider>
	);
});