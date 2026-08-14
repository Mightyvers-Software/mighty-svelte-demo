import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve('./src'),
			'@lib': path.resolve('./src/lib'),
			'@components': path.resolve('./src/components'),
			'@services': path.resolve('./src/services'),
			'@server': path.resolve('./src/server')
		}
	}
});
