import React from 'react';
import { AutoComplete, DropdownLayoutValueOption } from '@wix/design-system';
import { languageType } from '../../../types';
import { languageField } from '../../../constants/settingsField';
import { useTranslation } from 'react-i18next';

interface Props {
  languageOptions: languageType[];
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  predicateInputValue: string;
  setPredicateInputValue: (value: string) => void;
  searchInputHandler: (value: string) => void;
  setSelectedLanguageError: (value: boolean) => void;
  selectedLanguageError: boolean;
  required?: boolean;
  dataHook?: string;
}

export default function LanguageInput({
	languageOptions,
	selectedLanguage,
	setSelectedLanguage,
	predicateInputValue,
	setPredicateInputValue,
	searchInputHandler,
	setSelectedLanguageError,
	selectedLanguageError,
	required = false,
	...restProps
}: Props) {
	const {t} = useTranslation();
	return (
		<AutoComplete
			placeholder={selectedLanguage ? '' : t(languageField.placeholder)!}
			options={languageOptions}
			required={required}
			onChange={(e) => searchInputHandler(e.target.value)}
			predicate={(option: DropdownLayoutValueOption) =>
				(option.value as string)
					.toLowerCase()
					.includes(predicateInputValue.toLowerCase())
			}
			onManuallyInput={(value) => {
				const option = languageOptions.find((option) =>
          option.value!.toLowerCase().includes(value.toLowerCase())
				) || { value: '' };
				setSelectedLanguage(option.value!);
				setPredicateInputValue(option.value!);
			}}
			onSelect={(option) => {
				setSelectedLanguage(option.value! as string);
				setPredicateInputValue(option.value! as string);
			}}
			value={predicateInputValue || selectedLanguage}
			onBlur={() => setSelectedLanguageError(!selectedLanguage)}
			status={selectedLanguageError ? 'error' : undefined}
			statusMessage={t(languageField.errorStatusMessage)}
			tooltipPlacement="top-end"
			onFocus={() => setSelectedLanguageError(false)}
			{...restProps}
		/>
	);
}
