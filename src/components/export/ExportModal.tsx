import { useState } from 'react';
import { Copy, Check, Download, FileJson } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  spec: string;
  projectName: string;
}

export const ExportModal = ({ isOpen, onClose, spec, projectName }: ExportModalProps) => {
  const [copied, setCopied] = useState(false);

  const previewLines = spec.split('\n').slice(0, 20).join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spec);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = spec;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([spec], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}-spec.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const lines = spec.split('\n');
    const json = {
      name: projectName,
      format: 'palet-spec-v1',
      generatedAt: new Date().toISOString(),
      raw: spec,
      sections: extractSections(lines),
    };
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}-spec.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Your specification is ready</DialogTitle>
        </DialogHeader>

        {/* Spec preview */}
        <div className="relative rounded-md border border-border bg-muted/50 p-4 max-h-60 overflow-auto">
          <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">{previewLines}</pre>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-muted/90 to-transparent" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button onClick={handleCopy} className="gap-2 w-full">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleDownloadMd} className="gap-2">
              <Download className="h-4 w-4" />
              Download .md
            </Button>
            <Button variant="outline" onClick={handleDownloadJson} className="gap-2">
              <FileJson className="h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Works with Claude, GPT, Cursor, Lovable, Replit, v0, and more
        </p>
      </DialogContent>
    </Dialog>
  );
};

/** Extract markdown H2 sections into a keyed object */
function extractSections(lines: string[]): Record<string, string> {
  const sections: Record<string, string> = {};
  let current = '';
  const buf: string[] = [];

  const flush = () => {
    if (current) sections[current] = buf.join('\n').trim();
    buf.length = 0;
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush();
      current = line.replace('## ', '').trim();
    } else {
      buf.push(line);
    }
  }
  flush();
  return sections;
}
