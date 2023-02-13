import { sveltekit } from '@sveltejs/kit/vite';
import { presetUno } from 'unocss';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),

		UnoCSS({
			presets: [presetUno()]
		})
	]
});
