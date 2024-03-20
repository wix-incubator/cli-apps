import { vi } from 'vitest';
import messages from '../src/dashboard/assets/locale/messages_en.json';

vi.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: (str: string, options: Record<string, string>) => {
				if (options === undefined) return str;
				return messages[str as keyof typeof messages].replaceAll(/{{(.+?)}}/g, (_, key: string) => options[key]);
			},
		};
	},
	Trans: ({ i18nKey }: {i18nKey: string}) => i18nKey,
	I18nextProvider: ({ children }: {children: React.ReactNode}) => children,
}));