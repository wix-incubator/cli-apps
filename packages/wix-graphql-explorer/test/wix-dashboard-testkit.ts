import { LocalHost, ObserveState, StateObserver } from '@wix/dashboard-react';

export function dashboardPageProps() {
	const host: LocalHost = {
		channel: {
			observeState: ((callback: StateObserver<{}, { locale: string }>) => {
				callback({}, { locale: 'en' });
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
			showToast: () => ({
				remove() {
					return;
				},
			}),
		},
	};
	return { host };
}
