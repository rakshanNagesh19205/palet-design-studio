import { ReactNode } from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface ConfigSectionProps {
  value: string;
  title: string;
  icon: ReactNode;
  recommendation?: string;
  children: ReactNode;
}

export function ConfigSection({
  value,
  title,
  icon,
  recommendation,
  children,
}: ConfigSectionProps) {
  return (
    <AccordionItem value={value} className="border-b border-studio-border px-4">
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-body-sm font-medium">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4">
        {recommendation && (
          <p className="mb-3 text-caption text-muted-foreground bg-muted/50 px-2 py-1.5 rounded-md">
            ✨ Recommended for {recommendation}
          </p>
        )}
        <div className="space-y-3">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}
