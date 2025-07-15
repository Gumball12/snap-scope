import type { ChartData } from '../types';
import { GlassCard } from './common/GlassCard';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FocalLengthAreaChartProps {
  data: ChartData[];
  validDataCount: number;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartData }[];
}) => {
  const { t } = useTranslation();
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/20 bg-white/80 backdrop-blur-sm p-2 shadow-lg text-sm">
      <p className="font-medium text-gray-900">{data.focalLength}mm</p>
      <p className="text-gray-600">
        {t('analysis.details.usageCount', { count: data.count })}
      </p>
    </div>
  );
};

export const FocalLengthAreaChart = ({
  data,
  validDataCount,
}: FocalLengthAreaChartProps) => {
  const { t } = useTranslation();

  return (
    <GlassCard>
      <div className="mb-6 md:mb-8">
        <h3 className="text-2xl font-semibold text-gray-900">
          {t('analysis.focalLengthDistribution.title')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('analysis.focalLengthDistribution.analyzedData', {
            count: validDataCount,
          })}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {t('analysis.focalLengthDistribution.notice')}
        </p>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="focalLength"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value: number) => `${value}mm`}
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              width={30}
              tickFormatter={(value: number) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
