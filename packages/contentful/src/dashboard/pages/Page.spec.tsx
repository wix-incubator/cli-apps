import { describe, it, expect, vi } from 'vitest';
import { PageDriver } from './Page.driver';
import { anExternalDatabaseConnection } from '../services/external-data-builder';
import { waitFor } from '@testing-library/react';
import {
	envsMock,
	givenAppPremium,
	givenTrialEnded,
	localesMock,
	spacesMock,
} from '../../../test/wix-apis-mock-server';
import {CONNECT_URL, DEV_MODE_NOT_SET_ERROR_CODE} from '../constants/constants';

Object.defineProperty(window, 'location', {
	writable: true,
	value: { search: '?origin=https%3A%2F%2Fmanage.wix.com&inBizMgr=true&instance=PvKjWDfmEl3wTnbAZ5rKRCDU26YaCyEiQI1ZW0VDW6M.eyJpbnN0YW5jZUlkIjoiN2JkZjBiNWUtZWIxNi00ZjQ4LTg0YmQtNzBlMTliMzcxOWI3IiwiYXBwRGVmSWQiOiI5ZjZkNTc2Ny00YWVhLTRkZTAtOTNiYy1hZTM4MWM1MTMzNjUiLCJzaWduRGF0ZSI6IjIwMjMtMTEtMjNUMTM6MzQ6MzAuNTE1WiIsInVpZCI6ImU3NmQ3MTQ0LTQyOTMtNGVhZi1hOGQ5LTAwYzI4OWY0N2I1YiIsInBlcm1pc3Npb25zIjoiT1dORVIiLCJkZW1vTW9kZSI6ZmFsc2UsInNpdGVPd25lcklkIjoiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViIiwic2l0ZU1lbWJlcklkIjoiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIzLTExLTIzVDE3OjM0OjMwLjUxNVoiLCJsb2dpbkFjY291bnRJZCI6ImU3NmQ3MTQ0LTQyOTMtNGVhZi1hOGQ5LTAwYzI4OWY0N2I1YiIsInBhaSI6bnVsbCwibHBhaSI6bnVsbCwiYW9yIjp0cnVlfQ&locale=en&dashboardSdkAvailable=true&lang=en&authorizationCode=JWS.eyJraWQiOiJZVjZIa2ZKYyIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiZGVjb2RlZFRva2VuXCI6e1widXNlcklkXCI6XCJlNzZkNzE0NC00MjkzLTRlYWYtYThkOS0wMGMyODlmNDdiNWJcIixcImFjY291bnRJZFwiOlwiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViXCIsXCJzaXRlSWRcIjpcIjllM2Y5ZmFhLTdhN2QtNDY1My04NWIxLTJjOTkwYWJmYjM4OVwiLFwiYXBwSWRcIjpcIjlmNmQ1NzY3LTRhZWEtNGRlMC05M2JjLWFlMzgxYzUxMzM2NVwiLFwib3JpZ2luRG9tYWluXCI6XCJodHRwOi8vbG9jYWxob3N0OjUxNzNcIixcImluc3RhbmNlSWRcIjpcIjdiZGYwYjVlLWViMTYtNGY0OC04NGJkLTcwZTE5YjM3MTliN1wiLFwic2l0ZVZlbG9JbnN0YW5jZUlkXCI6XCI1YTNmYzMyYS0yNGJlLTQ3OGItYWNhNS1kZTcxZDBmYjgyM2FcIixcInNpdGVIdG1sV2ViSW5zdGFuY2VJZFwiOlwiMDkxYjc4YjctYjFkOS00ZDZiLTllNTMtMjg0NzYzNDJlZTE0XCIsXCJ2ZWxvUGVybWlzc2lvblwiOlwiT1dORVJcIixcImFwcFZlcnNpb25cIjpcImxhdGVzdFwiLFwid2l4Q29kZUFkbWluXCI6dHJ1ZSxcImlzTG9nZ2VkSW5BY2NvdW50T3duZXJcIjp0cnVlLFwiaG9zdFNpdGVPd25lclwiOlwiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViXCJ9LFwidG9rZW5NZXRhZGF0YVwiOntcInNpdGVJZFwiOlwiOWUzZjlmYWEtN2E3ZC00NjUzLTg1YjEtMmM5OTBhYmZiMzg5XCIsXCJhcHBJZFwiOlwiOWY2ZDU3NjctNGFlYS00ZGUwLTkzYmMtYWUzODFjNTEzMzY1XCIsXCJvcmlnaW5Eb21haW5cIjpcImh0dHA6Ly9sb2NhbGhvc3Q6NTE3M1wifSxcInRva2VuSWRcIjpcIjg4ZTVkMWYzLTYyNDAtNGFiMS1iYjhmLWQ3MDcwZDAzNDNiNFwiLFwiZXhwaXJhdGlvbkRhdGVcIjpcIjIwMjMtMTEtMjNUMTQ6MzQ6MzRaXCIsXCJjcmVhdGVkRGF0ZVwiOlwiMjAyMy0xMS0yM1QxMzozNDozNFpcIn0iLCJpYXQiOjE3MDA3NDY0NzQsImV4cCI6MTcwMDc1MDA3NH0.c03hiHIY73pGtKSAyHhDExOncquOebNFbjZfVUvb3wY' },
});

describe('Page', () => {
	const externalData = anExternalDatabaseConnection();
	it('should render title', async () => {
		const driver = new PageDriver();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.title().titleText()).toBe('app.title');
		});
	});

	it('should have a docs button', async () => {
		const driver = new PageDriver();
		driver.render();
		await waitFor(async () => {
			expect(await driver.get.docsButton().exists()).toBeTruthy();
			expect(await driver.get.docsButton().getButtonTextContent()).toBe('contentful.settings.card.documentation');
		});
	});

	describe('upgrade button', () => {
		it('should show premium button when app not premium', async () => {
			const driver = new PageDriver();
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.upgradeButton().exists()).toBeTruthy();
				expect(await driver.get.upgradeButton().getButtonTextContent()).toBe('contentful.settings.card.upgrade.action');
				expect(await driver.get.upgradeSection().titleText()).toBe('contentful.settings.card.upgrade.title');
				expect(await driver.get.upgradeSection().actionText()).toBe('contentful.settings.card.upgrade.action');
				expect(await driver.get.upgradeSection().textContent()).toContain('Your trial will end on Sat Feb 06 2027');
				expect(await driver.get.upgradeSection().isPremium()).toBeTruthy();
			});
		});

		it('should show danger message when trial ended', async () => {
			givenTrialEnded();
			const driver = new PageDriver();
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.upgradeSection().textContent()).toContain('contentful.settings.card.trialEnded');
				expect(await driver.get.upgradeSection().isDanger()).toBeTruthy();
			});
		});

		it('should not show premium button when app premium', async () => {
			givenAppPremium();
			const driver = new PageDriver();
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.title().exists());
				expect(await driver.get.upgradeButton().exists()).toBeFalsy();
				expect(await driver.get.upgradeSection().exists()).toBeFalsy();
			});
		});

		it('should open upgrade modal on button click', async () => {
			const openSpy = vi.spyOn(window, 'open');
			const driver = new PageDriver();
			driver.render();
			await waitFor(async () => {
				await driver.get.upgradeButton().click();
			});
			expect(openSpy).toHaveBeenCalledWith('https://www.wix.com/apps/upgrade/9f6d5767-4aea-4de0-93bc-ae381c513365?appInstanceId=7bdf0b5e-eb16-4f48-84bd-70e19b3719b7', '_blank');
		});
	});

	describe('Connection Error', () => {
		it('should show error message when connection error', async () => {
			const driver = new PageDriver();
			driver.given.anExternalConnectionError();
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.connectionErrorSection().isDanger()).toBeTruthy();
				expect(await driver.get.connectionErrorSection().titleText()).toBe('contentful.settings.form.errorConfiguration.title');
				expect(await driver.get.connectionErrorSection().textContent()).toContain('contentful.settings.form.errorConfiguration.general.message');
			});
		});

		it('should show error message when connection due to dev mode not set', async () => {
			const driver = new PageDriver();
			driver.given.anExternalConnectionError(DEV_MODE_NOT_SET_ERROR_CODE);
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.connectionErrorSection().isDanger()).toBeTruthy();
				expect(await driver.get.connectionErrorSection().titleText()).toBe('contentful.settings.form.errorConfiguration.title');
				expect(await driver.get.connectionErrorSection().textContent()).toContain('contentful.settings.form.errorConfiguration.noDevMode.message');
			});
		});
	});

	describe('missing connection', () => {
		it('should show message when missing connection', async () => {
			const openSpy = vi.spyOn(window, 'open');
			const driver = new PageDriver();
			driver.given.anExternalDataList([]);
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.missingConnectionSection().exists()).toBeTruthy();
				expect(await driver.get.missingConnectionSection().titleText()).toBe('contentful.settings.form.missingConfiguration.title');
				expect(await driver.get.missingConnectionSection().actionText()).toBe('contentful.settings.form.missingConfiguration.action');
			});
			await driver.get.missingConnectionSection().clickAction();
			expect(openSpy).toHaveBeenCalledWith(`${CONNECT_URL}PvKjWDfmEl3wTnbAZ5rKRCDU26YaCyEiQI1ZW0VDW6M.eyJpbnN0YW5jZUlkIjoiN2JkZjBiNWUtZWIxNi00ZjQ4LTg0YmQtNzBlMTliMzcxOWI3IiwiYXBwRGVmSWQiOiI5ZjZkNTc2Ny00YWVhLTRkZTAtOTNiYy1hZTM4MWM1MTMzNjUiLCJzaWduRGF0ZSI6IjIwMjMtMTEtMjNUMTM6MzQ6MzAuNTE1WiIsInVpZCI6ImU3NmQ3MTQ0LTQyOTMtNGVhZi1hOGQ5LTAwYzI4OWY0N2I1YiIsInBlcm1pc3Npb25zIjoiT1dORVIiLCJkZW1vTW9kZSI6ZmFsc2UsInNpdGVPd25lcklkIjoiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViIiwic2l0ZU1lbWJlcklkIjoiZTc2ZDcxNDQtNDI5My00ZWFmLWE4ZDktMDBjMjg5ZjQ3YjViIiwiZXhwaXJhdGlvbkRhdGUiOiIyMDIzLTExLTIzVDE3OjM0OjMwLjUxNVoiLCJsb2dpbkFjY291bnRJZCI6ImU3NmQ3MTQ0LTQyOTMtNGVhZi1hOGQ5LTAwYzI4OWY0N2I1YiIsInBhaSI6bnVsbCwibHBhaSI6bnVsbCwiYW9yIjp0cnVlfQ`, '_blank');
		});

		it('should not show message when connection exists', async () => {
			const driver = new PageDriver();
			driver.given.anExternalDataList([externalData]);
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.missingConnectionSection().exists()).toBeFalsy();
			});
		});

		it('should not present show missing connection message when trial ended', async () => {
			givenTrialEnded();
			const driver = new PageDriver();
			driver.given.anExternalDataList([]);
			driver.render();
			await waitFor(async () => {
				expect(await driver.get.upgradeSection().isDanger()).toBeTruthy();
				expect(await driver.get.missingConnectionSection().exists()).toBeFalsy();
			});
		});
	});

	it('should render all fields with test values', async () => {
		const driver = new PageDriver();
		const expectedData = {
			...externalData.configuration,
			locale: localesMock.items[1].name,
			spaceId: spacesMock.items[1].name,
			environmentId: envsMock.items[1].name,
		};
		driver.given.anExternalDataList([externalData]);
		driver.render();

		await waitFor(async () => {
			const result = await driver.check.inputTestFieldsValues(expectedData);
			expect(result).toBe(true);
		});
	});

	describe('input validation', () => {
		it('field secret key should be required', async () => {
			const driver = new PageDriver();
			driver.given.anExternalDataList([externalData]);
			driver.render();
			await waitFor(async () => {
				await driver.get.formFieldElements().secretKey.enterText('');
			});
			expect(await driver.get.formFieldElements().secretKey.getStatusMessage()).not.toEqual('');
		});

		it('field oauth key should not be required', async () => {
			const driver = new PageDriver();
			driver.given.anExternalDataList([externalData]);
			driver.render();
			await waitFor(async () => {
				await driver.get.formFieldElements().apiKey.enterText('');
			});
			expect(await driver.get.formFieldElements().apiKey.getRequired()).toBeFalsy();
		});
	});

	describe('form validation', () => {
		it('should update when form valid', async () => {
			const driver = new PageDriver();
			driver.given.anExternalDataList([externalData]);
			const updatedData = {
				...externalData,
				configuration: {
					...externalData.configuration,
					apiKey: 'something',
				},
			};
			driver.given.anExternalDataUpdate(updatedData);
			driver.render();
			await waitFor(async () => {
				await driver.get.formFieldElements().apiKey.enterText('something');
			});
			await driver.when.submit();
			expect(driver.get.showToast()).toHaveBeenCalledWith({type: 'success', message: 'contentful.settings.form.successUpdateSettings'});
		});

		it('should show error', async () => {
			const driver = new PageDriver();
			driver.given.anExternalDataList([externalData]);
			const updatedData = {
				...externalData,
				configuration: {
					...externalData.configuration,
					apiKey: 'something1',
				},
			};
			driver.given.anExternalDataUpdate(updatedData);
			driver.render();
			await waitFor(async () => {
				await driver.get.formFieldElements().apiKey.enterText('something');
			});
			await driver.when.submit();
			expect(driver.get.showToast()).toHaveBeenCalledWith({type: 'error', message: 'contentful.settings.form.errorUpdateSettings'});
		});
	});
});
