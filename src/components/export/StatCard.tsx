import { ComponentChildren } from 'preact';

interface StatCardProps {
  children: ComponentChildren;
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
    <div class={className} style={gridStyle}>
      {icon && (
        <div class="mb-4 text-2xl text-gray-600">
          <i class={icon} />
        </div>
      )}
      {children}
    </div>
  );
};
