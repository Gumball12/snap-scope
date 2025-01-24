import { ExifViewer } from './components/ExifViewer';
import { FileUploader } from './components/FileUploader';
import { BackgroundBlur } from './components/common/BackgroundBlur';
import { LanguageToggle } from './components/common/LanguageToggle';
import { FileProvider } from './contexts/FileContext';
import { useTranslation } from 'react-i18next';
import 'virtual:uno.css';

export const App = () => {
  const { t } = useTranslation();

  return (
    <FileProvider>
      <div className="flex flex-col p-4 md:p-8">
        <BackgroundBlur />

        <div className="relative mx-auto max-w-3xl w-full">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-medium text-gray-900 md:text-4xl">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('subtitle')}{' '}
              <i className="i-twemoji-camera-with-flash align-top" />
            </p>
          </header>

          <main className="space-y-10 mb-12">
            <FileUploader />
            <ExifViewer />
          </main>
        </div>

        <footer className="relative space-y-2 text-center text-sm text-gray-500 break-keep text-balance">
          <p>{t('footer.privacy')}</p>
          <p className="space-x-1">
            <a
              href="https://github.com/Gumball12/snap-scope/"
              target="_blank"
              className="underline"
            >
              GitHub
            </a>
            {' / '}
            <a href="mailto:to@shj.rip" className="underline">
              to@shj.rip
            </a>
            {' / '}
            <LanguageToggle />
          </p>
        </footer>
      </div>
    </FileProvider>
  );
};
