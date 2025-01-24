import type { ChartData } from '../types';
import { groupChartData, MAX_VISIBLE_ITEMS } from '../utils/groupChartData';
import { GlassCard } from './common/GlassCard';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';

interface FocalLengthBarChartProps {
  data: ChartData[];
  validDataCount: number;
}

export const FocalLengthBarChart = ({
  data,
  validDataCount,
}: FocalLengthBarChartProps) => {
  const { t } = useTranslation();
  const processedData = groupChartData(data, 5);
  const isDataTruncated = data.length > MAX_VISIBLE_ITEMS;

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
          {isDataTruncated &&
            t('analysis.focalLengthDistribution.topDisplay', {
              count: MAX_VISIBLE_ITEMS,
            })}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {t('analysis.focalLengthDistribution.notice')}
        </p>
      </div>
      <div className="h-[240px] w-full md:h-[300px]">
        {processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 30, right: 20, left: 20, bottom: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.1)"
                opacity={0.2}
              />
              <XAxis
                dataKey="focalLength"
                label={{
                  value: t('chart.axis.focalLength'),
                  position: 'bottom',
                  offset: 0,
                  style: {
                    fill: '#374151',
                    fontSize: 13,
                  },
                }}
                tick={{ fill: '#374151', fontSize: 12 }}
                tickFormatter={(value: string | number) =>
                  typeof value === 'string' ? value : `${Math.round(value)}mm`
                }
              />
              <YAxis
                label={{
                  value: t('chart.axis.photoCount'),
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  style: {
                    fill: '#374151',
                    fontSize: 13,
                  },
                }}
                tick={{ fill: '#374151', fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [
                  value,
                  t('chart.tooltip.photoCount'),
                ]}
                labelFormatter={(label: string | number) =>
                  typeof label === 'string' ? label : `${Math.round(label)}mm`
                }
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '13px',
                  padding: '8px 12px',
                }}
              />
              <Bar
                dataKey="count"
                fill="rgba(17, 24, 39, 0.8)"
                opacity={0.8}
                radius={[4, 4, 0, 0]}
                animationDuration={500}
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  style={{
                    fill: '#374151',
                    fontSize: '12px',
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            {t('analysis.noData')}
          </div>
        )}
      </div>
    </GlassCard>
  );
};
