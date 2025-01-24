import { App } from './app.tsx';
import './i18n';
import '@unocss/reset/tailwind.css';
import { createRoot } from 'react-dom/client';
import 'virtual:uno.css';

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
