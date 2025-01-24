import type { ChartData } from '../types';
import { cn } from '../utils/styles';
import { GlassCard } from './common/GlassCard';
import { RANK_STYLES } from './export/ExportCard';
import { useTranslation } from 'react-i18next';

interface FocalLengthRankingProps {
  data: ChartData[];
}

export const FocalLengthRanking = ({ data }: FocalLengthRankingProps) => {
  const { t } = useTranslation();
  const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 3);
  const rankStyles = sortedData.map((_, index) => {
    const rank = (index + 1) as keyof typeof RANK_STYLES;
    return RANK_STYLES[rank];
  });

  return (
    <GlassCard>
      <div className="mb-6 md:mb-8">
        <h3 className="text-2xl font-semibold text-gray-900">
          {t('analysis.mostUsedFocalLength.title')}
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {t('analysis.focalLengthDistribution.notice')}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {sortedData.map((item, index) => (
          <div
            key={item.focalLength}
            className={cn(
              'text-center p-3 rounded-lg border',
              rankStyles[index].bg,
              rankStyles[index].border,
            )}
          >
            <div className="text-2xl mb-2">
              <i
                className={cn(
                  rankStyles[index].icon,
                  rankStyles[index].iconColor,
                )}
              />
            </div>
            <div className="font-medium text-gray-900">
              {item.focalLength}mm
            </div>
            <div className="text-sm text-gray-600">
              {t('analysis.details.usageCount', { count: item.count })}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
