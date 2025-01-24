import { ExifViewer } from './components/ExifViewer';
import { FileUploader } from './components/FileUploader';
import { BackgroundBlur } from './components/common/BackgroundBlur';
import { FileProvider } from './contexts/FileContext';
import 'virtual:uno.css';

export const App = () => {
  return (
    <FileProvider>
      <div className="flex flex-col p-4 md:p-8">
        <BackgroundBlur />

        <div className="relative mx-auto max-w-3xl w-full">
          <header className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-medium text-gray-900 md:text-4xl">
              Snap Scope
            </h1>
            <p className="text-gray-600">
              찰칵! 찰칵! 자주 사용하는 초점거리를 알려드려요{' '}
              <i className="i-twemoji-camera-with-flash align-top" />
            </p>
          </header>

          <main className="space-y-10 mb-12">
            <FileUploader />
            <ExifViewer />
          </main>
        </div>

        <footer className="relative space-y-2 text-center text-sm text-gray-500 break-keep text-balance">
          <p>
            모든 이미지 처리와 EXIF 데이터 분석은 사용자의 브라우저에서만
            이루어집니다. 이미지와 이미지에서 추출하는 모든 데이터는 그 어떤
            곳에도 전송하지 않습니다.
          </p>
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
          </p>
        </footer>
      </div>
    </FileProvider>
  );
};
