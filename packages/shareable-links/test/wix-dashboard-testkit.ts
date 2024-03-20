import { ObserveState, LocalHost, StateObserver } from '@wix/dashboard-react';
import { vi } from 'vitest';

export function dashboardPageProps(isHeadless: boolean = false, isSitePublished: boolean = true) {
	const host: LocalHost = {
		channel: {
			observeState: ((callback: StateObserver<{}, {locale: ''}>) => {
				callback({}, {locale: ''});
				return {
					disconnect() {
					},
				};
			}) as ObserveState,
			showToast: () => ({
				remove() {
					return;
				},
			}),
			getAccessToken: () => Promise.resolve(''),
			// @ts-expect-error mock
			updateHeight: vi.fn(),
		},
		close: vi.fn(),
	};
	const _giza_environment = {
		hostEnvironment: {
			liveSite: {
				isSitePublished: isSitePublished,
			},
			metasiteNamespaces: isHeadless ? ['HEADLESS'] : [],
		},
	};
	return {host, _giza_environment};
}