import { InputTestkit, ButtonTestkit, PageHeaderTestkit, TooltipTestkit } from '@wix/design-system/dist/testkit/testing-library';
import {
	FormFieldsDataHook,
} from '../components/SettingsFormLayout/SettingsForm/SettingsForm';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Page from './page';
import { wixApisMockServer, givenConnection, givenUpdatedConnection } from '../../../test/wix-apis-mock-server';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { dashboardPageProps } from '../../../test/wix-dashboard-testkit';
import { externalDatabaseConnections } from '@wix/data';

beforeAll(() => wixApisMockServer.listen({onUnhandledRequest: 'error'}));
afterEach(() => wixApisMockServer.resetHandlers());
afterAll(() => wixApisMockServer.close());

afterEach(cleanup);

export class PageDriver {
	private BMProps = dashboardPageProps();

	constructor(
        private baseElement?: Element,
	) {
	}

	public get = {
		formFieldElements: () => {
			return {
				spaceId: this.findInputByTestId(FormFieldsDataHook.SPACE_ID),
				environmentId: this.findInputByTestId(FormFieldsDataHook.ENVIRONMENT_ID),
				apiKey: this.findInputByTestId(FormFieldsDataHook.API_KEY),
				secretKey: this.findInputByTestId(FormFieldsDataHook.OAUTH_TOKEN),
				locale: this.findInputByTestId(FormFieldsDataHook.LANGUAGE),
			};
		},
		title: () => {
			return PageHeaderTestkit({
				wrapper: this.baseElement!,
				dataHook: 'app-title',
			});
		},
		upgradeButton: () => {
			return ButtonTestkit({
				wrapper: this.baseElement!,
				dataHook: 'upgrade',
			});
		},
		upgradeTooltip: () => {
			return TooltipTestkit({
				wrapper: this.baseElement!,
				dataHook: 'upgrade-tooltip',
			});
		},
		submit: () => {
			return ButtonTestkit({
				wrapper: this.baseElement!,
				dataHook: FormFieldsDataHook.SAVE_BUTTON,
			});
		},
		showToast: () => {
			return this.BMProps.host.channel.showToast;
		}
	} as const;

	public given = {
		anExternalDataUpdate: (externalDatabaseConnection: externalDatabaseConnections.ExternalDatabaseConnection) => givenUpdatedConnection(externalDatabaseConnection),
		anExternalDataList: (externalDatabaseConnections: externalDatabaseConnections.ExternalDatabaseConnection[]) => {
			givenConnection(externalDatabaseConnections);
		},
	} as const;

	public when = {
		submit: () => {
			const driver = this.get.submit();
			return driver?.click();
		}
	};

	public check = {
		inputTestFieldsValues: async (expectedData: any) => {
			const elements = this.get.formFieldElements();
			const textValues = await Promise.all(
				Object.entries(elements).map(async ([key, element]) => ({key, text: await element?.getText()})),
			);
			return textValues.every(({key, text}) => text === expectedData[key]);
		},
	} as const;

	private findInputByTestId = (dataHook: string) => {
		return InputTestkit({
			wrapper: this.baseElement!,
			dataHook,
		});
	};

	public render = () => {
		const results = render(
			<Page {...this.BMProps}/>
		);
		this.baseElement = results.baseElement;
	};
}
