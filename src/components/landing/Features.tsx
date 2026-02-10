import { Palette, Sparkles, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Palette,
    title: 'Visual-First Configuration',
    description: 'See before you specify. Click, adjust, done.',
    link: '/docs/visual-config',
  },
  {
    icon: Sparkles,
    title: 'Works with Any AI',
    description: 'Claude, GPT, Cursor, Lovable, Replit, v0 — one spec, every platform.',
    link: '/docs/ai-output',
  },
  {
    icon: Layers,
    title: '81 Starting Points',
    description: "Templates × styles = combinations. Don't start from scratch.",
    link: '/docs/presets',
  },
];

export const Features = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-display-sm font-bold text-white">Features</h2>
          <p className="mt-4 text-body-lg text-white/60">
            Everything you need to generate precise design specifications
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="mb-2 text-heading-md font-semibold text-white">
                {feature.title}
              </h3>
              
              <p className="mb-4 text-body-md text-white/60">
                {feature.description}
              </p>
              
              <Link
                to={feature.link}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                Explore docs →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
