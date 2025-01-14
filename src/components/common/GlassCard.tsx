import { cn } from '../../utils/styles';
import { ComponentChildren } from 'preact';

interface GlassCardProps {
  children: ComponentChildren;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      class={cn(
        'p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-400',
        'bg-white/40 border border-white/30 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
};
