import React, { memo, useEffect, useState } from 'react';
import {
	useListingExternalDataServices,
	useUpdateExternalDataServices,
} from '../use-external-data-services';
import useFormState, { FormState } from '../../../hooks/useFormState';
import { languageType } from '../../../types';
import { LoadingLayout } from '../../LoadingLayout/LoadingLayout';
import { Box, Button, Cell, FormField, Layout, Loader } from '@wix/design-system';
import SettingsFormField from '../SettingsFormField/SettingsFormField';
import {
	apiKeyField,
	environmentIdField,
	languageField,
	oauthTokenField,
	spaceIdField,
} from '../../../constants/settingsField';
import LanguageInput from '../LanguageInput/LanguageInput';
import { ContentfulClientApi, createClient } from 'contentful';
import { defaultExternalDatabaseConnection } from '../../../constants/defaults';
import { HOST } from '../../../constants/constants';
import { useTranslation } from 'react-i18next';
import { useDashboard} from '@wix/dashboard-react';

export enum FormFieldsDataHook {
  SPACE_ID = 'spaceId',
  ENVIRONMENT_ID = 'environmentId',
  API_KEY = 'apiKey',
  OAUTH_TOKEN = 'oauthToken',
  LANGUAGE = 'language',
  SAVE_BUTTON = 'saveButton',
}

export const isFormInvalid = ({
	singleArgs,
	multipleArgs = [],
}: {
  singleArgs: FormState<string>[];
  multipleArgs: FormState<string>[];
}) => {
	singleArgs.forEach((state) => state.setError(() => !state.value));

	const allMultipleArgsInValid =
    multipleArgs.length === 0
    	? false
    	: multipleArgs.every((state) => !state.value);
	if (allMultipleArgsInValid) {
		multipleArgs.forEach((state) => state.setError(true));
	}

	const singleArgsInvalid = singleArgs.some((state) => !state.value);

	return singleArgsInvalid || allMultipleArgsInValid;
};

export const SettingsForm = memo(() => {
	const {t} = useTranslation();
	const spaceIdState = useFormState('');
	const environmentIdState = useFormState('');
	const selectedLanguageState = useFormState('');
	const apiKeyState = useFormState('');
	const oauthTokenState = useFormState('');
	const predicateInputState = useFormState('');
	const [languageOptions, setLanguageOptions] = useState<languageType[]>([]);
	const [externalDatabaseConnection, setExternalDatabaseConnection] = useState(
		defaultExternalDatabaseConnection
	);
	const { data: listExternalData, isLoading: isListExternalDataLoading } =
    useListingExternalDataServices();
	const updateExternalData = useUpdateExternalDataServices();
	const [contentfulClient, setContentfulClient] = useState<
    ContentfulClientApi<undefined> | undefined
  >(undefined);
	const dashboard = useDashboard();

	useEffect(() => {
		if (listExternalData && listExternalData[0]) {
			setExternalDatabaseConnection({
				configuration: {
					spaceId: listExternalData[0].configuration?.spaceId,
					environmentId: listExternalData[0].configuration?.environmentId,
					secretKey: listExternalData[0].configuration?.secretKey,
					apiKey: listExternalData[0].configuration?.apiKey,
					locale: listExternalData[0].configuration?.locale,
				},
				endpoint: listExternalData[0].endpoint!,
				name: listExternalData[0].name!,
			});
			spaceIdState.setValue(
				listExternalData ? listExternalData[0].configuration?.spaceId : ''
			);
			environmentIdState.setValue(
				listExternalData[0].configuration?.environmentId ?? ''
			);
			oauthTokenState.setValue(
				listExternalData[0].configuration?.secretKey ?? ''
			);
			apiKeyState.setValue(listExternalData[0].configuration?.apiKey ?? '');
			selectedLanguageState.setValue(
				listExternalData[0].configuration?.locale ?? ''
			);
			setContentfulClient(
				createClient({
					space: listExternalData[0].configuration?.spaceId ?? '',
					environment: listExternalData[0].configuration?.environmentId ?? '',
					host: HOST,
					accessToken: listExternalData[0].configuration?.secretKey ?? '',
				})
			);
		}
	}, [isListExternalDataLoading]);

	useEffect(() => {
		contentfulClient?.getLocales().then((res) => {
			const languages = res.items.map(
				(item, index) =>
					({
						id: index,
						value: item.code,
					} as languageType)
			);
			setLanguageOptions(languages);
		});
	}, [contentfulClient]);

	useEffect(() => {
		if (
			!updateExternalData.isLoading &&
      updateExternalData.isSuccess &&
      updateExternalData.data
		) {
			dashboard.showToast({
				message: t('contentful.settings.form.successUpdateSettings'),
				type: 'success',
			});
		} else if (!updateExternalData.isLoading && updateExternalData.isError) {
			dashboard.showToast({
				message: t('contentful.settings.form.errorUpdateSettings'),
				type: 'error',
			});
		}
	}, [
		updateExternalData.isLoading,
		updateExternalData.isError,
		updateExternalData.isSuccess,
	]);
	const searchInputHandler = (value: string) => {
		predicateInputState.setValue(value);
		selectedLanguageState.setValue('');
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			isFormInvalid({
				singleArgs: [spaceIdState, environmentIdState],
				multipleArgs: [apiKeyState, oauthTokenState],
			})
		) {
			return;
		}
		const configure = {
			spaceId: spaceIdState.value,
			environmentId: environmentIdState.value,
			secretKey: oauthTokenState.value,
			apiKey: apiKeyState.value,
			locale: selectedLanguageState.value,
		};
		setExternalDatabaseConnection((prevState) => ({
			...prevState,
			configuration: configure,
		}));
		updateExternalData.mutate({
			...externalDatabaseConnection,
			configuration: configure,
		});
	};

	const handleErrors = (err: boolean, ...args: FormState<string>[]) => {
		if (args.some((state) => state.value)) {
			return;
		}

		args.forEach((state) => {
			state.setError(err);
		});
	};
	if (isListExternalDataLoading) {
		return <LoadingLayout />;
	}
	return (
		<form onSubmit={submitHandler}>
			<Layout>
				<Cell>
					<SettingsFormField
						required
						label={t(spaceIdField.label)}
						placeholder={t(spaceIdField.placeholder)!}
						formState={spaceIdState}
						errorStatusMessage={t(spaceIdField.errorStatusMessage)!}
						dataHook={FormFieldsDataHook.SPACE_ID}
					/>
				</Cell>
				<Cell>
					<SettingsFormField
						required
						label={t(environmentIdField.label)}
						errorStatusMessage={t(environmentIdField.errorStatusMessage)!}
						placeholder={t(environmentIdField.placeholder)!}
						formState={environmentIdState}
						dataHook={FormFieldsDataHook.ENVIRONMENT_ID}
					/>
				</Cell>
				<Cell>
					<FormField label={t(languageField.label)}>
						<LanguageInput
							required
							languageOptions={languageOptions}
							selectedLanguage={selectedLanguageState.value}
							setSelectedLanguage={selectedLanguageState.setValue}
							predicateInputValue={predicateInputState.value}
							setPredicateInputValue={predicateInputState.setValue}
							searchInputHandler={searchInputHandler}
							setSelectedLanguageError={selectedLanguageState.setError}
							selectedLanguageError={selectedLanguageState.error}
							dataHook={FormFieldsDataHook.LANGUAGE}
						/>
					</FormField>
				</Cell>
				<Cell>
					<SettingsFormField
						label={t(apiKeyField.label)}
						placeholder={t(apiKeyField.placeholder)!}
						errorStatusMessage={t(apiKeyField.errorStatusMessage)!}
						infoContent={t(apiKeyField.infoContent ?? '')!}
						errorType="warning"
						formState={apiKeyState}
						errorHandler={(err) =>
                    handleErrors!(err, oauthTokenState, apiKeyState)
						}
						dataHook={FormFieldsDataHook.API_KEY}
					/>
				</Cell>
				<Cell>
					<SettingsFormField
						required
						label={t(oauthTokenField.label)}
						placeholder={t(oauthTokenField.placeholder)!}
						errorStatusMessage={t(oauthTokenField.errorStatusMessage)!}
						infoContent={t(oauthTokenField.infoContent ?? '')!}
						formState={oauthTokenState}
						dataHook={FormFieldsDataHook.OAUTH_TOKEN}
					/>
				</Cell>
				<Cell>
					<Box align="right" gap="SP1">
						<Button type="submit" dataHook={FormFieldsDataHook.SAVE_BUTTON}>
							{updateExternalData.isLoading ? (
								<Loader size="tiny" />
							) : (
								t('contentful.settings.form.saveButton')
							)}
						</Button>
					</Box>
				</Cell>
			</Layout>
		</form>
	);
});
