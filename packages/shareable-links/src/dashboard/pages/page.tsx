import React, { Suspense, useEffect, useState } from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withDashboard } from '@wix/dashboard-react';
import { createInstance as createI18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { useEnvironment } from '@wix/sdk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LinksDashboardPage } from '../components/LinksDashboardPage/LinksDashboardPage';
import { LinksDashboardPageSkeleton } from '../components/LinksDashboardPage/LinksDashboardPageSkeleton';

const i18n = createI18n().use({
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

export const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default withDashboard(function Page() {
	const [i18nInitialized, setI18nInitialized] = useState(false);
	const { locale } = useEnvironment() as { locale: string };

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
					{i18nInitialized && (
						<Suspense fallback={<LinksDashboardPageSkeleton />}>
							<LinksDashboardPage />
						</Suspense>
					)}
				</WixDesignSystemProvider>
			</QueryClientProvider>
		</I18nextProvider>
	);
});
