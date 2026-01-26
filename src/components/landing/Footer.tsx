import { Link } from 'react-router-dom';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Roadmap', href: '/roadmap' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Guides', href: '/guides' },
    { label: 'API Reference', href: '/api' },
    { label: 'Community', href: '/community' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0d0a0b] py-16">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Logo & newsletter */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/50">
              AI-ready design system generator for precise teams.
            </p>
            
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-white/70">
                Stay updated
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
                <Button size="default">Subscribe</Button>
              </form>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/40">
            © 2026 Palet Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
