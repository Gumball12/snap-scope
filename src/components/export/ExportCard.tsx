import type { ChartData } from '../../types';
import { cn } from '../../utils/styles';
import { BackgroundBlur } from '../common/BackgroundBlur';
import { GlassCard } from '../common/GlassCard';
import { StatCard } from './StatCard';

interface ExportCardProps {
  validDataCount: number;
  chartData: ChartData[];
  topThree: ChartData[];
}

const MetricBox = ({ value, label }: { value: number; label: string }) => (
  <div>
    <div class="mb-2 text-5xl font-bold text-gray-900 tabular-nums">
      {value} <span class="text-xl font-medium">개</span>
    </div>
    <div class="text-sm text-gray-600">{label}</div>
  </div>
);

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
  const style = RANK_STYLES[rank as keyof typeof RANK_STYLES];

  return (
    <div
      class={cn(
        'flex items-center gap-3 rounded-2xl p-4',
        'border backdrop-blur-md',
        style.bg,
        style.border,
      )}
    >
      <i class={cn('text-2xl', style.icon, style.iconColor)} />
      <div>
        <div class="mb-1 text-xl font-semibold text-gray-900">
          {focalLength}mm
        </div>
        <div class="text-xs text-gray-500">{count}회 사용</div>
      </div>
    </div>
  );
};

export const ExportCard = ({
  validDataCount,
  chartData,
  topThree,
}: ExportCardProps) => (
  <div class="relative flex h-[520px] w-[800px] flex-col gap-6 overflow-hidden p-10 pb-6">
    <BackgroundBlur variant="card" />

    <div class="relative grid h-full grid-cols-12 gap-4">
      <header class="flex items-center gap-3 grid-col-start-1 grid-col-span-12">
        <div>
          <h3 class="text-3xl font-semibold text-gray-900 leading-relaxed">
            Snap Scope
          </h3>
          <p class="text-lg text-gray-600">
            찰칵! 찰칵! 자주 사용하는 초점거리를 알려드려요{' '}
            <i class="i-twemoji-camera-with-flash align-top" />
          </p>
        </div>
      </header>

      {topThree.map((data, index) => (
        <StatCard grid={{ start: index * 4 + 1, span: 4 }}>
          <RankBox {...data} rank={index + 1} />
        </StatCard>
      ))}

      <GlassCard className="grid-col-start-1 grid-col-span-6 shadow-none">
        <i class="i-solar-gallery-bold-duotone text-2xl mb-4 text-gray-600" />
        <MetricBox value={validDataCount} label="분석한 이미지" />
      </GlassCard>

      <GlassCard className="grid-col-start-7 grid-col-span-6 shadow-none">
        <i class="i-solar-camera-bold-duotone text-2xl mb-4 text-gray-600" />
        <MetricBox value={chartData.length} label="발견된 초점거리" />
      </GlassCard>

      <footer class="flex h-full flex-col items-end justify-center gap-0.5 grid-col-start-1 grid-col-span-12 text-xs text-gray-500">
        <span>초점거리는 35mm 포맷 기준으로 환산된 값입니다</span>
        <span>https://snap-scope.shj.rip</span>
      </footer>
    </div>
  </div>
);
