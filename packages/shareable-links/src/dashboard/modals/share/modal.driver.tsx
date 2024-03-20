import {
	InputTestkit,
	MessageModalLayoutTestkit,
	TextTestkit
} from '@wix/design-system/dist/testkit/testing-library';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Modal , {queryClient} from './modal';

import { afterAll, afterEach, beforeAll } from 'vitest';
import { dashboardPageProps } from '../../../../test/wix-dashboard-testkit';
import { wixApisMockServer } from '../../../../test/wix-apis-mock-server';

beforeAll(() => wixApisMockServer.listen({onUnhandledRequest: 'error'}));
afterEach(() => wixApisMockServer.resetHandlers());
afterAll(() => wixApisMockServer.close());

afterEach(() => {
	queryClient.clear();
});

afterEach(cleanup);

export class ModalDriver {
	private BMProps = dashboardPageProps();

	constructor(
        private baseElement?: Element,
	) {
	}

	public get = {
		modal: () => {
			return MessageModalLayoutTestkit({
				wrapper: this.baseElement!,
				dataHook: 'container',
			});
		},
		input: () => {
			return InputTestkit({
				wrapper: this.baseElement!,
				dataHook: 'url-input',
			});
		},
		publishMessage: () => {
			return TextTestkit({
				wrapper: this.baseElement!,
				dataHook: 'not-published-message',
			});

		}
	} as const;

	public given = {
		headless: () => {
			this.BMProps = dashboardPageProps(true);
		},
		unpublished: () => {
			this.BMProps = dashboardPageProps(false, false);
		}
	} as const;

	public render = () => {
		const results = render(
			<Modal redirectIdentifier="redirectIdentifier" selectedId="selectedId" dataCollectionId="dataCollectionId" fieldName="fieldName" redirectField="redirectField" {...this.BMProps}/>
		);
		this.baseElement = results.baseElement;
	};
}
