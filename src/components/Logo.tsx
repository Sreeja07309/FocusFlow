import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Logo({ size = 'md', onClick }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 24, text: 'text-xl' },
    lg: { icon: 32, text: 'text-2xl' },
  };
  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 group"
      aria-label="FocusFlow home"
    >
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-lavender-600 text-white shadow-md transition-transform group-hover:scale-105">
        <BrainCircuit size={s.icon} className="m-1.5" />
      </div>
      <span className={`font-bold tracking-tight ${s.text} text-navy-900 dark:text-white`}>
        Focus<span className="text-lavender-600 dark:text-lavender-400">Flow</span>
      </span>
    </button>
  );
}
