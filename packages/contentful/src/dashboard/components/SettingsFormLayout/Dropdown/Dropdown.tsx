import React from 'react';
import { Dropdown } from '@wix/design-system';
import { optionType, settingsFieldType } from '../../../types';
import { useTranslation } from 'react-i18next';

interface Props {
  options: optionType[];
  selected: string;
  setSelected: (value: string) => void;
  setSelectedError: (value: boolean) => void;
  selectedError: boolean;
  required?: boolean;
  dataHook?: string;
  keys: settingsFieldType;
}

export default function Input({
	options,
	selected,
	setSelected,
	setSelectedError,
	selectedError,
	required = false,
	keys,
	...restProps
}: Props) {
	const {t} = useTranslation();
	return (
		<Dropdown
			placeholder={selected ? '' : t(keys.placeholder)!}
			options={options}
			required={required}
			onSelect={(option) => {
				setSelected(option.id! as string);
			}}
			selectedId={selected}
			onBlur={() => setSelectedError(!selected)}
			status={selectedError ? 'error' : undefined}
			statusMessage={t(keys.errorStatusMessage)}
			tooltipPlacement="top-end"
			onFocus={() => setSelectedError(false)}
			{...restProps}
		/>
	);
}
