import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      </div>
      
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-display-md font-bold text-white md:text-display-lg">
            Ready to enter Spec Mode?
          </h2>
          
          <p className="mt-4 text-body-lg text-white/60">
            Configure once. Generate everywhere.
          </p>
          
          <Link to="/auth/signup" className="mt-8 inline-block">
            <Button 
              size="lg" 
              className="gap-2 px-8 shadow-lg shadow-primary/25"
            >
              Enter Spec Mode →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
