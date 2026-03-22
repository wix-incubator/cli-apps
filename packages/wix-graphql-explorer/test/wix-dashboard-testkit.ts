import { LocalHost, ObserveState, StateObserver, EnvironmentState } from '@wix/dashboard-react';

export function dashboardPageProps() {
	const host: LocalHost = {
		channel: {
			observeState: ((callback: StateObserver<{}, EnvironmentState>) => {
				callback({}, {
					locale: 'en',
					language: 'en',
					pageLocation: { pageId: '', pathname: '/' },
					embedded: false,
				});
				return {
					disconnect() {},
				};
			}) as ObserveState,
			closeModal: () => {},
			openModal: () => ({
				modalClosed: Promise.resolve(null),
			}),
			getAccessToken: () => Promise.resolve(''),
			navigate(): void {},
			navigateBack: () => {},
			showToast: () => ({
				remove() {
					return;
				},
			}),
			getPageUrl: () => Promise.resolve(''),
			openMediaManager: () => Promise.resolve(undefined),
			onBeforeUnload: () => ({ remove: () => {} }),
			setPageTitle: () => {},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			requestFeedback: () => Promise.resolve(null as any),
			onLayerStateChange: () => ({ remove: () => {} }),
			installApp: () => Promise.resolve({ status: 'SUCCESS' as const }),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getWidget: () => (() => null) as any,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			getWidgetAsync: () => Promise.resolve((() => null) as any),
			getDashboardPlugins: () => [],
			getDashboardMenuPlugins: () => [],
			getSiteInfo: () => null,
		},
		workspace: undefined,
	};
	return { host };
}
