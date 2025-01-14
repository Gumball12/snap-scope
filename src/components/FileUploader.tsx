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
    const newFiles = Array.from(files).filter(
      newFile =>
        !selectedFiles.value.some(
          existingFile => existingFile.name === newFile.name,
        ),
    );

    if (newFiles.length > 0) {
      selectedFiles.value = [...selectedFiles.value, ...newFiles];
    }
  }, []);

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
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleAreaClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <GlassCard
      className={cn(
        'p-0', // overwrite GlassCard default style
        'upload-area text-center',
        'border-2 border-dashed border-gray/40',
        isDragging && 'border-blue-400/50 bg-blue-50/50',
        'cursor-pointer hover:border-blue-300/50',
      )}
    >
      <div
        class={cn('transition-all p-8', !isUploaded && 'py-25')}
        onClick={handleAreaClick}
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
        <div class="pointer-events-none">
          <p class="mb-2 text-slate-600 text-balance break-keep">
            이미지 파일을 여기에 끌어다 놓거나 클릭해 선택해 주세요
          </p>
          <p class="text-sm text-slate-500">
            {isUploaded
              ? `${selectedFiles.value.length}개의 파일이 선택됨`
              : '선택된 파일 없음'}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
