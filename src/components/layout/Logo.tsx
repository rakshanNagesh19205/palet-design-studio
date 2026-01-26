import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  linkTo?: string;
}

export const Logo = ({ variant = 'dark', className, linkTo = '/' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';
  
  return (
    <Link to={linkTo} className={cn('flex items-center gap-2', className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <span className="font-mono text-sm font-bold text-primary-foreground">P.</span>
      </div>
      <span className={cn('font-semibold tracking-tight', textColor)}>Palet</span>
    </Link>
  );
};
