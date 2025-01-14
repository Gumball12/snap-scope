import { App } from './app.tsx';
import '@unocss/reset/tailwind.css';
import { render } from 'preact';
import 'uno.css';

render(<App />, document.getElementById('app')!);
