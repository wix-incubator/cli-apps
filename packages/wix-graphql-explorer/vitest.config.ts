import { defineConfig } from 'vitest/config';
import isCI from 'is-ci';

export default defineConfig({
	test: {
		setupFiles: ['./test/setup.ts'],
		environment: 'jsdom',
		...(isCI && {
			reporters: ['vitest-teamcity-reporter'],
		}),
	},
});
