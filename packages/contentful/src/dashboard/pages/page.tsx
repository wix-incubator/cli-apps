import React, { useEffect, useState } from 'react';
import '@wix/design-system/styles.global.css';
import { createInstance as createI18n } from 'i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEnvironment } from '@wix/sdk-react';
import { withDashboard } from '@wix/dashboard-react';
import { I18nextProvider } from 'react-i18next';
import { Page } from '../components/Page/Page';

const queryClient = new QueryClient();

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
			import(`../assets/locale/messages_${language}.json`)
				.then((resources) => {
					callback(null, resources.default);
				})
				.catch((error) => {
					callback(error, null);
				});
		},
	});

const Index = (_: any) => {
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
				{i18nInitialized && <Page/>}
			</QueryClientProvider>
		</I18nextProvider>
	);
};

export default withDashboard(Index);
