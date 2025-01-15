import type { FocalLengthData } from '../types';
import { cn } from '../utils/styles';
import { GlassCard } from './common/GlassCard';

interface FocalLengthDetailsProps {
  data: FocalLengthData[];
  validDataCount: number;
}

export const FocalLengthDetails = ({
  data,
  validDataCount,
}: FocalLengthDetailsProps) => {
  return (
    <GlassCard>
      <div class="mb-6">
        <h3 class="text-2xl font-semibold text-gray-900">상세 데이터</h3>
        <p class="text-sm text-gray-600">총 {validDataCount}개</p>
      </div>
      <div class="max-h-[240px] space-y-1 overflow-y-auto text-gray-900 text-sm">
        {data.map((item, index) => (
          <div key={index} class="flex items-center justify-between py-2">
            <span class="flex-1 truncate">{item.fileName}</span>
            <span
              class={cn(
                'ml-4 tabular-nums',
                item.focalLength ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              {item.focalLength
                ? `${Math.round(item.focalLength)}mm`
                : '정보 없음'}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
