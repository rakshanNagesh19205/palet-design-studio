import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

interface ProductHeaderProps {
  currentStep?: 1 | 2 | 3;
  showBreadcrumb?: boolean;
}

const steps = [
  { step: 1, label: 'Template', path: '/create/template' },
  { step: 2, label: 'Style', path: '/create/style' },
  { step: 3, label: 'Studio', path: '/studio' },
];

export const ProductHeader = ({ currentStep = 1, showBreadcrumb = true }: ProductHeaderProps) => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border bg-background">
      <div className="container flex h-14 items-center justify-between">
        <Logo linkTo="/" />
        
        {showBreadcrumb && (
          <nav className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <div key={s.step} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-muted-foreground">/</span>
                )}
                <Link
                  to={s.path}
                  className={cn(
                    'text-sm transition-colors',
                    currentStep === s.step
                      ? 'font-medium text-primary'
                      : currentStep > s.step
                        ? 'text-muted-foreground hover:text-foreground'
                        : 'text-muted-foreground/50 pointer-events-none'
                  )}
                >
                  {s.label}
                </Link>
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
