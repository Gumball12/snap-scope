import type { ChartData } from '../../types';
import { cn } from '../../utils/styles';
import { BackgroundBlur } from '../common/BackgroundBlur';
import { GlassCard } from '../common/GlassCard';
import { StatCard } from './StatCard';
import { useTranslation } from 'react-i18next';

const MetricBox = ({ value, label }: { value: number; label: string }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-2 text-5xl font-bold text-gray-900 tabular-nums">
        {value} <span className="text-xl font-medium">{t('units.count')}</span>
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export const RANK_STYLES = {
  1: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'i-twemoji-1st-place-medal',
    iconColor: 'text-amber-500',
  },
  2: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    icon: 'i-twemoji-2nd-place-medal',
    iconColor: 'text-slate-400',
  },
  3: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'i-twemoji-3rd-place-medal',
    iconColor: 'text-orange-400',
  },
} as const;

export const RankBox = ({
  rank,
  focalLength,
  count,
}: {
  rank: number;
  focalLength: string | number;
  count: number;
}) => {
  const { t } = useTranslation();
  const style = RANK_STYLES[rank as keyof typeof RANK_STYLES];

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl p-4',
        'border backdrop-blur-md',
        style.bg,
        style.border,
      )}
    >
      <i className={cn('text-2xl', style.icon, style.iconColor)} />
      <div>
        <div className="mb-1 text-xl font-semibold text-gray-900">
          {focalLength}mm
        </div>
        <div className="text-xs text-gray-500">
          {t('analysis.details.usageCount', { count })}
        </div>
      </div>
    </div>
  );
};

interface ExportCardProps {
  validDataCount: number;
  chartData: ChartData[];
  topThree: ChartData[];
}

export const ExportCard = ({
  validDataCount,
  chartData,
  topThree,
}: ExportCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex h-[520px] w-[800px] flex-col gap-6 overflow-hidden p-10 pb-6">
      <BackgroundBlur variant="card" />

      <div className="relative grid h-full grid-cols-12 gap-4">
        <header className="flex items-center gap-3 grid-col-start-1 grid-col-span-12">
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 leading-relaxed">
              {t('title')}
            </h3>
            <p className="text-lg text-gray-600">
              {t('subtitle')}{' '}
              <i className="i-twemoji-camera-with-flash align-top" />
            </p>
          </div>
        </header>

        {topThree.map((data, index) => (
          <StatCard
            grid={{ start: index * 4 + 1, span: 4 }}
            key={data.focalLength}
          >
            <RankBox {...data} rank={index + 1} />
          </StatCard>
        ))}

        <GlassCard className="grid-col-start-1 grid-col-span-6 shadow-none">
          <i className="i-solar-gallery-bold-duotone text-2xl mb-4 text-gray-600" />
          <MetricBox
            value={validDataCount}
            label={t('export.metrics.analyzedPhotos')}
          />
        </GlassCard>

        <GlassCard className="grid-col-start-7 grid-col-span-6 shadow-none">
          <i className="i-solar-camera-bold-duotone text-2xl mb-4 text-gray-600" />
          <MetricBox
            value={chartData.length}
            label={t('export.metrics.discoveredFocalLengths')}
          />
        </GlassCard>

        <footer className="flex h-full flex-col items-end justify-center gap-0.5 grid-col-start-1 grid-col-span-12 text-xs text-gray-500">
          <span>{t('analysis.focalLengthDistribution.notice')}</span>
          <span>https://snap-scope.shj.rip</span>
        </footer>
      </div>
    </div>
  );
};
