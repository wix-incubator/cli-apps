import { Host, ObserveState, StateObserver, ProviderAPI } from '@wix/dashboard-react';
import { vi } from 'vitest';

export function dashboardPageProps() {
	const host: Host = {
		channel: {
			observeState: ((callback: StateObserver<{}, {locale: ''}>) => {
				callback({}, {locale: ''});
				return {
					disconnect() {
					},
				};
			}) as ObserveState,
			// @ts-expect-error mock
			updateHeight: vi.fn(),
			closeModal: vi.fn(),
			openModal: () => ({
				modalClosed: Promise.resolve(null),
			}),
			getAccessToken: () => Promise.resolve(''),
			navigate: vi.fn(),
			showToast: vi.fn(),
		},
	};
	return {host};
}