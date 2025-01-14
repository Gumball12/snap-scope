import type { ChartData } from '../types';

export const MAX_VISIBLE_ITEMS = 10;
const GROUP_SIZE = 5;

export const groupChartData = (data: ChartData[]): ChartData[] => {
  const groupedData = data.reduce(
    (acc, item) => {
      if (!item.focalLength) {
        return acc;
      }

      const roundedFocalLength =
        Math.floor(parseInt(item.focalLength.toString()) / GROUP_SIZE) *
        GROUP_SIZE;
      const key = `${roundedFocalLength}~${roundedFocalLength + GROUP_SIZE - 1}`;

      if (!acc[key]) {
        acc[key] = {
          focalLength: key,
          count: 0,
        };
      }

      acc[key].count += item.count;
      return acc;
    },
    {} as Record<string, ChartData>,
  );

  const sortedData = Object.values(groupedData).sort(
    (a, b) => b.count - a.count,
  );

  return sortedData.slice(0, MAX_VISIBLE_ITEMS);
};
