import { cn } from '../utils/styles';
import { GlassCard } from './common/GlassCard';
import { signal } from '@preact/signals';
import { useCallback, useState, useRef } from 'preact/hooks';

export const selectedFiles = signal<File[]>([]);

export const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUploaded = selectedFiles.value.length > 0;

  const handleFiles = useCallback((files: FileList | File[]) => {
    const newFiles = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .filter(
        newFile =>
          !selectedFiles.value.some(
            existingFile => existingFile.name === newFile.name,
          ),
      );

    if (newFiles.length > 0) {
      selectedFiles.value = [...selectedFiles.value, ...newFiles];
    }
  }, []);

  const processEntry = useCallback(
    async (entry: FileSystemEntry): Promise<File[]> => {
      if (entry.isFile) {
        const fileEntry = entry as FileSystemFileEntry;
        return new Promise<File[]>(resolve => {
          fileEntry.file(file => {
            resolve(file.type.startsWith('image/') ? [file] : []);
          });
        });
      }

      if (entry.isDirectory) {
        const dirEntry = entry as FileSystemDirectoryEntry;
        const dirReader = dirEntry.createReader();

        const entries = await new Promise<FileSystemEntry[]>(resolve => {
          dirReader.readEntries(entries => resolve(entries));
        });

        const filePromises: Promise<File[]>[] = entries.map(entry =>
          processEntry(entry),
        );
        const fileArrays = await Promise.all(filePromises);
        return fileArrays.flat();
      }

      return [];
    },
    [],
  );

  const handleFileChange = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        handleFiles(target.files);
      }
    },
    [handleFiles],
  );

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (
      target.closest('.upload-area') &&
      !target.isEqualNode(e.currentTarget as HTMLElement)
    ) {
      return;
    }

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const items = e.dataTransfer?.items;
      if (!items) {
        return;
      }

      const entries = Array.from(items)
        .map(item => item.webkitGetAsEntry())
        .filter((entry): entry is FileSystemEntry => entry !== null);

      const filePromises = entries.map(entry => processEntry(entry));
      const fileArrays = await Promise.all(filePromises);
      const files = fileArrays.flat();

      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles, processEntry],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <GlassCard
      className={cn(
        'p-0', // overwrite GlassCard default style
        'upload-area text-center cursor-pointer',
        'border-2 border-dashed border-gray/40',
        isDragging && 'border-blue-400/50 bg-blue-50/50',
        'hover:border-blue-300/50 hover:bg-blue-50/30',
      )}
      onClick={handleClick}
    >
      <div
        class={cn('transition-all p-8', !isUploaded && 'py-25')}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          class="hidden"
        />
        <div>
          <p class="mb-2 text-slate-600 text-balance break-keep">
            이미지 파일이나 폴더를 여기에 끌어다 놓거나 클릭해 선택해 주세요
          </p>
          <p class="mt-4 text-sm text-slate-500">
            {isUploaded
              ? `${selectedFiles.value.length}개의 파일이 선택됨`
              : '선택된 파일 없음'}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
