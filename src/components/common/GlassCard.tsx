import { cn } from '../../utils/styles';
import type { ComponentChildren } from 'preact';

interface GlassCardProps {
  children: ComponentChildren;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      class={cn(
        'rounded-xl backdrop-blur-sm bg-white/40',
        'border border-white/20',
        'shadow-lg shadow-black/5',
        'p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};
