import { ReactNode } from 'react';

interface StatCardProps {
  children: ReactNode;
  className?: string;
  icon?: string;
  grid?: {
    start?: number;
    span?: number;
    row?: number;
  };
}

export const StatCard = ({
  children,
  className,
  icon,
  grid,
}: StatCardProps) => {
  const gridStyle = grid
    ? {
        gridColumn: `${grid.start} / span ${grid.span}`,
        gridRow: grid.row ? `${grid.row}` : 'auto',
      }
    : undefined;

  return (
    <div className={className} style={gridStyle}>
      {icon && (
        <div className="mb-4 text-2xl text-gray-600">
          <i className={icon} />
        </div>
      )}
      {children}
    </div>
  );
};
