import preact from '@preact/preset-vite';
import presetWind from '@unocss/preset-wind';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetWind()],
    }),
    preact(),
  ],
});
