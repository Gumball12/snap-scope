import { cn } from '../../utils/styles';

interface BackgroundBlurProps {
  variant?: 'app' | 'card';
}

const BUBBLES = [
  { size: 900, color: 'bg-blue-400/30', blur: 'blur-3xl', duration: 12 },
  { size: 700, color: 'bg-indigo-400/35', blur: 'blur-3xl', duration: 14 },
  { size: 800, color: 'bg-violet-400/30', blur: 'blur-3xl', duration: 16 },
  { size: 500, color: 'bg-fuchsia-400/30', blur: 'blur-3xl', duration: 18 },
  { size: 400, color: 'bg-cyan-400/25', blur: 'blur-3xl', duration: 15 },
  { size: 550, color: 'bg-rose-400/30', blur: 'blur-3xl', duration: 17 },
  { size: 550, color: 'bg-sky-400/30', blur: 'blur-3xl', duration: 13 },
];

const CARD_BUBBLES = [
  { size: 800, color: 'bg-blue-400/30', blur: 'blur-[80px]', duration: 8 },
  { size: 400, color: 'bg-indigo-400/35', blur: 'blur-[70px]', duration: 10 },
  { size: 350, color: 'bg-rose-400/30', blur: 'blur-[60px]', duration: 12 },
  { size: 300, color: 'bg-fuchsia-400/30', blur: 'blur-[50px]', duration: 14 },
  { size: 250, color: 'bg-cyan-400/25', blur: 'blur-[40px]', duration: 11 },
  { size: 280, color: 'bg-sky-400/30', blur: 'blur-[45px]', duration: 9 },
];

export const BackgroundBlur = ({ variant = 'app' }: BackgroundBlurProps) => {
  const bubbles = variant === 'card' ? CARD_BUBBLES : BUBBLES;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={cn(
            'absolute rounded-full animate-pulse',
            bubble.color,
            bubble.blur,
          )}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${(index * 20) % 100}%`,
            top: `${(index * 15) % 100}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `-${index * 3}s`,
          }}
        />
      ))}
    </div>
  );
};
