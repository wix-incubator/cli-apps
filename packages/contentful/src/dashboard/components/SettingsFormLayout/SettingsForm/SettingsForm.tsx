import React, { memo, useEffect, useState } from 'react';
import {
	useUpdateExternalDataServices,
} from '../use-external-data-services';
import useFormState, { FormState } from '../../../hooks/useFormState';
import { optionType } from '../../../types';
import { Box, Button, Cell, FormField, Layout, Loader, SectionHelper } from '@wix/design-system';
import SettingsFormField from '../SettingsFormField/SettingsFormField';
import {
	apiKeyField,
	environmentIdField,
	languageField,
	oauthTokenField,
	spaceIdField,
} from '../../../constants/settingsField';
import Dropdown from '../Dropdown/Dropdown';
import { ContentfulClientApi, createClient } from 'contentful';
import { HOST } from '../../../constants/constants';
import { Trans, useTranslation } from 'react-i18next';
import { useDashboard } from '@wix/dashboard-react';
import { externalDatabaseConnections } from '@wix/data';
import { Link } from '../../LinkWrapper/Link';
import accessTokenForConnection from '../../../services/access-token-for-connection';
import {getContentfulAuthorizeUrl} from '../../../utils';

export enum FormFieldsDataHook {
  SPACE_ID = 'spaceId',
  ENVIRONMENT_ID = 'environmentId',
  API_KEY = 'apiKey',
  OAUTH_TOKEN = 'oauthToken',
  LANGUAGE = 'language',
  SAVE_BUTTON = 'saveButton',
}

interface Props {
	externalListData: externalDatabaseConnections.ExternalDatabaseConnection[];
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

export const SettingsForm = memo((props: Props) => {
	const {t} = useTranslation();
	const spaceIdState = useFormState('');
	const environmentIdState = useFormState('');
	const selectedLanguageState = useFormState('');
	const apiKeyState = useFormState('');
	const oauthTokenState = useFormState('');
	const [languageOptions, setLanguageOptions] = useState<optionType[]>([]);
	const [spacesOptions, setSpacesOptions] = useState<optionType[]>([]);
	const [envsOptions, setEnvsOptions] = useState<optionType[]>([]);
	const [externalDatabaseConnection, setExternalDatabaseConnection] = useState<externalDatabaseConnections.ExternalDatabaseConnection>({});
	const updateExternalData = useUpdateExternalDataServices();
	const [contentfulClient, setContentfulClient] = useState<
    ContentfulClientApi<undefined> | undefined
  >(undefined);
	const dashboard = useDashboard();
	const isSingleEnvMode = props.externalListData[0]?.configuration?.mode === 'contentful-market-app';

	useEffect(() => {
		if (props.externalListData && props.externalListData[0]) {
			setExternalDatabaseConnection(props.externalListData[0]);
			spaceIdState.setValue(
				props.externalListData ? props.externalListData[0].configuration?.spaceId : ''
			);
			environmentIdState.setValue(
				props.externalListData[0].configuration?.environmentId ?? ''
			);
			oauthTokenState.setValue(
				props.externalListData[0].configuration?.secretKey ?? ''
			);
			apiKeyState.setValue(props.externalListData[0].configuration?.apiKey ?? '');
			selectedLanguageState.setValue(
				props.externalListData[0].configuration?.locale ?? ''
			);
			(isSingleEnvMode ?
				dashboard.getAccessToken()
					.then((wixAccessToken) => accessTokenForConnection(props.externalListData[0].configuration, wixAccessToken)
						.then(({ accessToken }) => accessToken))
				: Promise.resolve(props.externalListData[0].configuration?.secretKey)
			).then((accessToken) => {
				setContentfulClient(
					createClient({
						space: props.externalListData[0].configuration?.spaceId ?? '',
						environment: props.externalListData[0].configuration?.environmentId ?? '',
						host: HOST,
						accessToken,
					})
				);
			});
		}
	}, [props.externalListData]);

	useEffect(() => {
		contentfulClient?.getLocales().then((res) => {
			const languages = res.items.map(
				(item) =>
					({
						id: item.code,
						value: item.name,
					} as optionType)
			);
			setLanguageOptions(languages);
		});
	}, [contentfulClient]);

	useEffect(() => {
		oauthTokenState.value && fetch('https://api.contentful.com/spaces',{headers: { Authorization: `Bearer ${oauthTokenState.value}` }})
			.then((res) => res.json())
			.then((data : any) => {
				setSpacesOptions(
					data.items.map((space: any) => ({
						id: space.sys.id,
						value: space.name,
					}))
				);
			});
	}, [oauthTokenState.value]);

	useEffect(() => {
		oauthTokenState.value && spaceIdState.value && fetch(`https://api.contentful.com/spaces/${spaceIdState.value}/environments`,{headers: { Authorization: `Bearer ${oauthTokenState.value}` }})
			.then((res) => res.json())
			.then((data : any) => {
				setEnvsOptions(
					data.items.map((space: any) => ({
						id: space.sys.id,
						value: space.name,
					}))
				);
			});
	}, [spaceIdState.value, oauthTokenState.value]);

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
		const configuration = {
			spaceId: spaceIdState.value,
			environmentId: environmentIdState.value,
			secretKey: oauthTokenState.value,
			apiKey: apiKeyState.value,
			locale: selectedLanguageState.value,
		};
		const mergedConfiguration = {
			...externalDatabaseConnection.configuration,
			...configuration,
		};
		setExternalDatabaseConnection((prevState) => ({
			...prevState,
			configuration: mergedConfiguration,
		}));
		updateExternalData.mutate({
			name: externalDatabaseConnection.name!,
			endpoint: externalDatabaseConnection.endpoint!,
			configuration: mergedConfiguration,
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
	return (
		<form onSubmit={submitHandler}>
			<Layout>
				{isSingleEnvMode ? (
					<Cell>
						<SectionHelper
							fullWidth
							dataHook="contentful-marketplace" appearance="standard"
							title={t('contentful.settings.form.contentful-app-mode.title')}
							actionText={t('contentful.settings.form.contentful-app-mode.action')!} onAction={() => {
								window.open(getContentfulAuthorizeUrl(), '_blank');
							}}>{t('contentful.settings.form.contentful-app-mode.message')}</SectionHelper>
					</Cell>
				) : (
					<>
						<Cell>
							<FormField label={t(spaceIdField.label)}>
								<Dropdown
									required
									keys={spaceIdField}
									options={spacesOptions}
									selected={spaceIdState.value}
									setSelected={spaceIdState.setValue}
									setSelectedError={spaceIdState.setError}
									selectedError={spaceIdState.error}
									dataHook={FormFieldsDataHook.SPACE_ID}
								/>
							</FormField>
						</Cell>
						<Cell>
							<FormField label={t(environmentIdField.label)}>
								<Dropdown
									required
									keys={environmentIdField}
									options={envsOptions}
									selected={environmentIdState.value}
									setSelected={environmentIdState.setValue}
									setSelectedError={environmentIdState.setError}
									selectedError={environmentIdState.error}
									dataHook={FormFieldsDataHook.ENVIRONMENT_ID}
								/>
							</FormField>
						</Cell>
					</>
				)}
				<Cell>
					<FormField label={t(languageField.label)}>
						<Dropdown
							required
							keys={languageField}
							options={languageOptions}
							selected={selectedLanguageState.value}
							setSelected={selectedLanguageState.setValue}
							setSelectedError={selectedLanguageState.setError}
							selectedError={selectedLanguageState.error}
							dataHook={FormFieldsDataHook.LANGUAGE}
						/>
					</FormField>
				</Cell>
				{isSingleEnvMode ? null : (
					<Cell>
						<SettingsFormField
							required
							label={t(oauthTokenField.label)}
							placeholder={t(oauthTokenField.placeholder)!}
							errorStatusMessage={t(oauthTokenField.errorStatusMessage)!}
							infoContent={<Trans i18nKey={oauthTokenField.infoContent} components={{1: (<Link url="https://app.contentful.com/account/profile/cma_tokens"/>)}}/>}
							formState={oauthTokenState}
							dataHook={FormFieldsDataHook.OAUTH_TOKEN}
						/>
					</Cell>
				)}
				<Cell>
					<SettingsFormField
						label={t(apiKeyField.label)}
						placeholder={t(apiKeyField.placeholder)!}
						errorStatusMessage={t(apiKeyField.errorStatusMessage)!}
						infoContent={<Trans i18nKey={apiKeyField.infoContent} components={{1: (<Link url="https://www.contentful.com/blog/api-key/"/>)}}/>}
						errorType="warning"
						formState={apiKeyState}
						statusMessage={<Trans i18nKey={apiKeyField.statusMessage} components={{1: (<span style={{fontWeight: 'bold'}}/>)}}/>}
						errorHandler={(err) =>
							handleErrors!(err, oauthTokenState, apiKeyState)
						}
						dataHook={FormFieldsDataHook.API_KEY}
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
