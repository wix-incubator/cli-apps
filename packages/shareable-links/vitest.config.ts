import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		mockReset: true,
		environment: 'jsdom',
		setupFiles: ['./test/i18n-mock.ts'],
	},
});