import type { FocalLengthData } from '../types';
import { cn } from '../utils/styles';
import { GlassCard } from './common/GlassCard';
import { useTranslation } from 'react-i18next';

interface FocalLengthDetailsProps {
  data: FocalLengthData[];
  validDataCount: number;
}

export const FocalLengthDetails = ({
  data,
  validDataCount,
}: FocalLengthDetailsProps) => {
  const { t } = useTranslation();

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          {t('analysis.details.title')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('analysis.details.total', { count: validDataCount })}
        </p>
      </div>
      <div className="max-h-[240px] space-y-1 overflow-y-auto text-gray-900 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span className="flex-1 truncate">{item.fileName}</span>
            <span
              className={cn(
                'ml-4 tabular-nums',
                item.focalLength ? 'text-gray-900' : 'text-gray-500',
              )}
            >
              {item.focalLength
                ? `${Math.round(item.focalLength)}mm`
                : t('analysis.details.noInfo')}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
