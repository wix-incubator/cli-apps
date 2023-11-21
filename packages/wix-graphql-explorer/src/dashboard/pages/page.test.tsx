
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { wixApisMockServer } from '../../../test/wix-apis-mock-server';
import { dashboardPageProps } from '../../../test/wix-dashboard-testkit';
import Page from './page';

beforeAll(() => wixApisMockServer.listen());
afterEach(() => wixApisMockServer.resetHandlers());
afterAll(() => wixApisMockServer.close());

test('should allow picking visitor identity and display graphiql', async () => {
	const user = userEvent.setup();

	render(<Page {...dashboardPageProps()} />);
	expect(screen.getByText('Wix GraphQL Explorer')).toBeDefined();

	const mainPane = within(document.querySelector('#page-main-pane')!);

	await user.click(mainPane.getByLabelText('Visitor', {
		exact: false,
	}));

	await user.click(mainPane.getByPlaceholderText('Please select an OAuth app'));

	expect(mainPane.getByText('Website')).toBeVisible();
	expect(mainPane.getByText('Mobile App')).toBeVisible();

	await user.click(mainPane.getByText('Website'));

	await user.click(await mainPane.findByText('Go'));

	expect(mainPane.getByTestId('graphiql-container')).toBeVisible();
});
