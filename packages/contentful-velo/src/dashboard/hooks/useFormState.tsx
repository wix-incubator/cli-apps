import { Dispatch, SetStateAction, useState } from 'react';

export type FormState<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
};

function useFormState<T>(initialValue: T): FormState<T> {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState(false);

	return { value, setValue, error, setError };
}

export default useFormState;
