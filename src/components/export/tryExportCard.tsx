import type { ChartData } from '../../types';
import { groupChartData } from '../../utils/groupChartData';
import { ExportCard } from './ExportCard';
import { toBlob } from 'html-to-image';
import { render } from 'preact';

export const tryExportCard = async (
  chartData: ChartData[],
  validDataCount: number,
): Promise<void> => {
  const processedData = groupChartData(chartData);
  const topThree = processedData.slice(0, 3);

  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '800px',
    height: '520px',
    transform: 'scale(1)',
    transformOrigin: 'top left',
  });

  document.body.appendChild(container);

  render(
    <ExportCard
      validDataCount={validDataCount}
      chartData={chartData}
      topThree={topThree}
    />,
    container,
  );

  try {
    const blob = await toBlob(container, {
      backgroundColor: '#fff',
      width: 800,
      height: 520,
    });

    if (!blob) {
      throw new Error('Failed to create blob');
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'snap-scope-summary.png';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  } finally {
    document.body.removeChild(container);
  }
};
