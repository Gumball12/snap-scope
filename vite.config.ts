import presetWind from '@unocss/preset-wind';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetWind()],
    }),
    react(),
  ],
});
