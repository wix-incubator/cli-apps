import { describe, it, expect } from 'vitest';
import { PageDriver } from './Page.driver';
import { anExternalDatabaseConnection } from '../services/external-data-builder';
import { waitFor } from '@testing-library/react';
import { envsMock, localesMock, spacesMock } from '../../../test/wix-apis-mock-server';

describe('Page', () => {
	const externalData = anExternalDatabaseConnection();

	it('should render the form', async () => {
		const driver = new PageDriver();
		driver.render();
		expect(await driver.did.formRender()).toBe(true);
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
