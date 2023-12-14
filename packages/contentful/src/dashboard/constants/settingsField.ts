import { settingsFieldType } from '../types';

export const spaceIdField: settingsFieldType = {
	label: 'contentful.settings.form.spaceIdLabel',
	placeholder: 'contentful.settings.form.spaceIdPlaceholder',
	errorStatusMessage: 'contentful.settings.form.spaceIdErrorStatusMessage',
};

export const environmentIdField: settingsFieldType = {
	label: 'contentful.settings.form.environmentIdLabel',
	placeholder: 'contentful.settings.form.environmentIdPlaceholder',
	errorStatusMessage:
    'contentful.settings.form.environmentIdErrorStatusMessage',
};

export const languageField: settingsFieldType = {
	label: 'contentful.settings.form.languageLabel',
	placeholder: 'contentful.settings.form.languagePlaceholder',
	errorStatusMessage: 'contentful.settings.form.languageErrorStatusMessage',
};

export const apiKeyField: settingsFieldType = {
	label: 'contentful.settings.form.apiKeyLabel',
	placeholder: 'contentful.settings.form.apiKeyPlaceholder',
	errorStatusMessage: 'contentful.settings.form.apiKeyErrorStatusMessage',
	infoContent: 'contentful.settings.form.apiKeyInfoContent',
	statusMessage: 'contentful.settings.form.apiKeyInfoStatusMessage',
};

export const oauthTokenField: settingsFieldType = {
	label: 'contentful.settings.form.oauthTokenLabel',
	placeholder: 'contentful.settings.form.oauthTokenPlaceholder',
	errorStatusMessage: 'contentful.settings.form.oauthTokenErrorStatusMessage',
	infoContent: 'contentful.settings.form.oauthTokenInfoContent',
};
