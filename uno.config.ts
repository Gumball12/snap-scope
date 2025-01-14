import presetWebFonts from '@unocss/preset-web-fonts';
import presetWind from '@unocss/preset-wind';
import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: [
          {
            name: 'Nanum Gothic',
            weights: ['400', '700'],
          },
        ],
      },
    }),
  ],
});
