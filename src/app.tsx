import { ExifViewer } from './components/ExifViewer';
import { FileUploader } from './components/FileUploader';
import { BackgroundBlur } from './components/common/BackgroundBlur';
import 'virtual:uno.css';

export const App = () => {
  return (
    <div class="flex flex-col p-4 md:p-8">
      <BackgroundBlur />

      <div class="relative mx-auto max-w-3xl w-full">
        <header class="mb-8 text-center">
          <h1 class="mb-2 text-3xl font-medium text-gray-900 md:text-4xl">
            Snap Scope
          </h1>
          <p class="text-gray-600">
            찰칵! 찰칵! 당신의 촬영 패턴을 알려드려요{' '}
            <i class="i-twemoji-camera-with-flash align-top" />
          </p>
        </header>

        <main class="space-y-10 mb-12">
          <FileUploader />
          <ExifViewer />
        </main>
      </div>

      <footer class="relative space-y-2 text-center text-sm text-gray-500">
        <p>© 2024 Snap Scope. All rights reserved.</p>
        <p>
          이미지와 이미지에서 추출하는 모든 데이터는 그 어떤 곳에도 전송하지
          않습니다.
        </p>
        <p class="space-x-1">
          <a
            href="https://github.com/Gumball12/snap-scope/"
            target="_blank"
            class="underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};
