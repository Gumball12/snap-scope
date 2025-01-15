import type { ChartData } from '../types';

export const MAX_VISIBLE_ITEMS = 10;

export const groupChartData = (
  data: ChartData[],
  groupSize: number,
): ChartData[] => {
  const groupedData = data.reduce(
    (acc, item) => {
      if (!item.focalLength) {
        return acc;
      }

      const roundedFocalLength =
        Math.floor(parseInt(item.focalLength.toString()) / groupSize) *
        groupSize;
      const key = createKey(roundedFocalLength, groupSize);

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

const createKey = (roundedFocalLength: number, groupSize: number) =>
  groupSize === 1
    ? roundedFocalLength
    : `${roundedFocalLength}~${roundedFocalLength + groupSize - 1}`;
