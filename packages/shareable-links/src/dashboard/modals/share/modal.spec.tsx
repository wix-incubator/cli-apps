import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';
import { ModalDriver } from './modal.driver';
import { MOCK_HEADLESS_SHORT_URL, MOCK_SHORT_URL } from '../../../../test/wix-apis-mock-server';


describe('Modal', () => {
	it('should render title', async () => {
		const driver = new ModalDriver();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.modal().getTitleText()).toBe('links-page.title');
		});
	});

	it('should render url', async () => {
		const driver = new ModalDriver();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.input().getText()).toBe(MOCK_SHORT_URL);
		});
	});

	it('should show site not published message', async () => {
		const driver = new ModalDriver();
		driver.given.unpublished();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.input().exists()).toBe(false);
			expect(await driver.get.publishMessage().getText()).toBe('links-page.site-not-published');
		});
	});

	it('should support headless url', async () => {
		const driver = new ModalDriver();
		driver.given.headless();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.input().getText()).toBe(MOCK_HEADLESS_SHORT_URL);
		});
	});
});
