import { cn } from '../../utils/styles';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl backdrop-blur-xl bg-white/40',
        'border border-white/20',
        'shadow-lg hover:shadow-xl transition-all duration-200 shadow-black/5',
        'p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};
