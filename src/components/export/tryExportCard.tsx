import type { ChartData } from '../../types';
import { groupChartData } from '../../utils/groupChartData';
import { ExportCard } from './ExportCard';
import { toBlob } from 'html-to-image';
import { render } from 'preact';

export const tryExportCard = async (
  chartData: ChartData[],
  validDataCount: number,
): Promise<void> => {
  const processedData = groupChartData(chartData, 1);
  const topThree = processedData.slice(0, 3);

  const parentContainer = document.createElement('div');
  Object.assign(parentContainer.style, {
    position: 'absolute',
    zIndex: -999,
    left: '0',
    top: '0',
    opacity: 0,

    // avoid cropping imgs when exporting
    transform: 'scale(1)',
    transformOrigin: 'top left',
  });

  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '800px',
    height: '520px',
  });

  parentContainer.appendChild(container);
  document.body.appendChild(parentContainer);

  render(
    <ExportCard
      validDataCount={validDataCount}
      chartData={chartData}
      topThree={topThree}
    />,
    container,
  );

  try {
    // avoid missing svg icons in Safari
    await toBlob(container, {
      backgroundColor: '#fff',
      width: 800,
      height: 520,
    });

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
    document.body.removeChild(parentContainer);
  }
};
