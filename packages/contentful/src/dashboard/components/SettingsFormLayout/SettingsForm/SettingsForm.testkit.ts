import {vi} from 'vitest';
export const createFormStateMock = (initialValue: string = '') => ({
	value: initialValue,
	setError: vi.fn(),
	setValue: vi.fn(),
	error: false,
});

export const successfulToast = {
	message: 'Settings updated successfully',
	biName: 'contentful.settings.form.submit',
	type: 'success',
	timeout: 5000,
};

export const failedToast = {
	message: 'Error updating settings - please check your credentials',
	biName: 'contentful.settings.form.submit',
	type: 'error',
	timeout: 5000,
};
