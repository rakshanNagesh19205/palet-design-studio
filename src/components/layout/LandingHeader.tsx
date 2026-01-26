import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const LandingHeader = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#1a1215]/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Logo variant="light" />
        
        <nav className="hidden items-center gap-8 md:flex">
          <Link 
            to="/docs" 
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Documentation
          </Link>
          <Link 
            to="/pricing" 
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Pricing
          </Link>
          <Link 
            to="/enterprise" 
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Enterprise
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/auth/signin">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button size="sm" className="gap-1.5">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
