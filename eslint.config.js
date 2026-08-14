import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs.recommended,
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			},
			globals: globals.browser
		}
	},
	{
		files: ['**/*.{ts,js}'],
		languageOptions: {
			globals: globals.browser
		}
	}
];
