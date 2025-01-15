import type { ChartData } from '../types';
import { cn } from '../utils/styles';
import { GlassCard } from './common/GlassCard';
import { RANK_STYLES } from './export/ExportCard';

interface FocalLengthRankingProps {
  data: ChartData[];
}

export const FocalLengthRanking = ({ data }: FocalLengthRankingProps) => {
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 3);
  const rankStyles = sortedData.map((_, index) => {
    const rank = (index + 1) as keyof typeof RANK_STYLES;
    return RANK_STYLES[rank];
  });

  return (
    <GlassCard>
      <div class="mb-6 md:mb-8">
        <h3 class="text-2xl font-semibold text-gray-900">
          가장 많이 사용한 초점거리
        </h3>
        <p class="mt-1 text-xs text-gray-500">
          * 초점거리는 35mm 포맷 기준으로 환산된 값입니다
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4">
        {sortedData.map((item, index) => (
          <div
            key={item.focalLength}
            class={cn(
              'text-center p-3 rounded-lg border',
              rankStyles[index].bg,
              rankStyles[index].border,
            )}
          >
            <div class="text-2xl mb-2">
              <i
                class={cn(rankStyles[index].icon, rankStyles[index].iconColor)}
              />
            </div>
            <div class="font-medium text-gray-900">{item.focalLength}mm</div>
            <div class="text-sm text-gray-600">{item.count}회</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
