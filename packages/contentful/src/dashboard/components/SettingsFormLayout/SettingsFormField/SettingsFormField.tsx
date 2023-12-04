import React from 'react';
import { FormField, Input } from '@wix/design-system';
import { FormState } from '../../../hooks/useFormState';

interface Props {
  formState: FormState<string>;
  errorHandler?: ((bool: boolean, ...args: FormState<string>[]) => void) | null;
  errorType?: 'error' | 'warning';
  placeholder?: string;
  required?: boolean;
  errorStatusMessage?: string;
  label: string;
  infoContent?: string | React.ReactNode;
  inputValue?: string;
  dataHook?: string;
}

export default function SettingsFormField({
	formState: { value, setValue, error, setError },
	errorHandler = undefined,
	errorType = 'error',
	placeholder,
	required = false,
	errorStatusMessage = '',
	label = '',
	infoContent = undefined,
	...restProps
}: Props) {
	return (
		<FormField
			label={label || ''}
			infoContent={infoContent}
		>
			<Input
				placeholder={placeholder ?? ''}
				required={required}
				onChange={(e) => {
					setValue(e.target.value);
					errorHandler
						? errorHandler(!e.target.value)
						: setError(!e.target.value);
				}}
				onBlur={() => {
					errorHandler ? errorHandler(!value) : setError(!value);
				}}
				status={error ? errorType : undefined}
				statusMessage={errorStatusMessage ?? ''}
				tooltipPlacement="top-end"
				value={value}
				{...restProps}
			/>
		</FormField>
	);
}
