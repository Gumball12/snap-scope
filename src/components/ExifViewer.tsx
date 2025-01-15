import type { FocalLengthData } from '../types';
import { cn } from '../utils/styles';
import { selectedFiles } from './FileUploader';
import { FocalLengthAreaChart } from './FocalLengthAreaChart';
import { FocalLengthBarChart } from './FocalLengthBarChart';
import { FocalLengthDetails } from './FocalLengthDetails';
import { FocalLengthRanking } from './FocalLengthRanking';
import { tryExportCard } from './export/tryExportCard';
import { parse } from 'exifr';
import { useEffect, useState, useMemo, useCallback } from 'preact/hooks';

export const ExifViewer = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div class="text-center">
        <div class="text-[15px] text-gray-600">데이터를 분석하는 중...</div>
      </div>
    );
  }

  const [focalLengths, setFocalLengths] = useState<FocalLengthData[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const parseExifData = async () => {
      if (selectedFiles.value.length === 0) {
        setFocalLengths([]);
        return;
      }

      setIsLoading(true);
      const newData: FocalLengthData[] = [];

      for (const file of selectedFiles.value) {
        try {
          const data = (await parse(file, {
            pick: ['FocalLengthIn35mmFormat'],
          })) as { FocalLengthIn35mmFormat: number };

          newData.push({
            fileName: file.name,
            focalLength: data?.FocalLengthIn35mmFormat || null,
          });
        } catch {
          newData.push({
            fileName: file.name,
            focalLength: null,
          });
        }
      }

      setFocalLengths(newData);
      setIsLoading(false);
    };

    parseExifData();
  }, [selectedFiles.value]);

  if (focalLengths.length === 0) {
    return null;
  }

  const chartData = useMemo(() => {
    const validData = focalLengths
      .filter(
        (item): item is FocalLengthData & { focalLength: number } =>
          item.focalLength !== null,
      )
      .reduce(
        (acc, { focalLength }) => {
          acc[focalLength] = (acc[focalLength] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>,
      );

    return Object.entries(validData)
      .map(([focalLength, count]) => ({
        focalLength: Number(focalLength),
        count,
      }))
      .sort((a, b) => a.focalLength - b.focalLength);
  }, [focalLengths]);

  const validDataCount = focalLengths.filter(
    item => item.focalLength !== null,
  ).length;

  const isExportable = !(isExporting || validDataCount === 0);

  const handleExport = useCallback(async () => {
    if (!chartData.length) {
      return;
    }

    setIsExporting(true);

    try {
      await tryExportCard(chartData, validDataCount);
    } finally {
      setIsExporting(false);
    }
  }, [setIsExporting, chartData, validDataCount]);

  const returnToHome = useCallback(() => {
    selectedFiles.value = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div class="space-y-6">
      <FocalLengthBarChart data={chartData} validDataCount={validDataCount} />
      <FocalLengthAreaChart data={chartData} validDataCount={validDataCount} />
      <FocalLengthRanking data={chartData} />
      <FocalLengthDetails data={focalLengths} validDataCount={validDataCount} />

      <div class="text-center space-y-6">
        <button
          onClick={handleExport}
          disabled={!isExportable}
          class={cn(
            'relative overflow-hidden rounded-full px-8 py-3 space-x-2 w-full',
            'text-white font-medium text-sm md:text-base',
            'transition-all duration-300',
            'bg-gradient-to-r from-indigo-500 to-purple-500',
            'shadow-lg shadow-indigo-500/25',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isExportable && 'hover:brightness-80',
          )}
        >
          <i class="i-solar-gallery-favourite-bold-duotone" />
          <span>
            {isExporting
              ? '이미지 만드는 중...'
              : '나만의 포토그래피 요약 이미지 만들기'}
          </span>
        </button>

        <button onClick={returnToHome} class="underline text-sm text-gray-600">
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};
