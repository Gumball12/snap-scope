import type { ChartData } from '../types';
import { groupChartData, MAX_VISIBLE_ITEMS } from '../utils/groupChartData';
import { GlassCard } from './common/GlassCard';
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

interface FocalLengthChartProps {
  data: ChartData[];
  validDataCount: number;
}

export const FocalLengthChart = ({
  data,
  validDataCount,
}: FocalLengthChartProps) => {
  const processedData = groupChartData(data);
  const isDataTruncated = data.length > MAX_VISIBLE_ITEMS;

  return (
    <GlassCard>
      <div class="mb-6 md:mb-8">
        <h3 class="text-2xl font-semibold text-gray-900">초점거리 분포</h3>
        <p class="text-sm text-gray-600">
          분석한 데이터: {validDataCount}장
          {isDataTruncated && ` (상위 ${MAX_VISIBLE_ITEMS}개 표시)`}
        </p>
        <p class="mt-1 text-xs text-gray-500">
          * 초점거리는 35mm 포맷 기준으로 환산된 값입니다
        </p>
      </div>
      <div class="h-[240px] w-full md:h-[300px]">
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
                  value: '초점거리 (mm)',
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
                  value: '촬영 수',
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
                formatter={(value: number) => [value, '촬영 수']}
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
          <div class="flex h-full items-center justify-center text-sm text-gray-500">
            분석 가능한 데이터가 없습니다
          </div>
        )}
      </div>
    </GlassCard>
  );
};
