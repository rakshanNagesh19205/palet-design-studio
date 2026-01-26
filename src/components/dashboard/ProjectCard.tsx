import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Project } from '@/types/database';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Copy, Download, Trash2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onExport?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDuplicate,
  onExport,
  onDelete,
}: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <Link to={`/studio/${project.id}`} className="block">
        <div className="relative aspect-[4/3] bg-muted">
          {/* Mini preview mockup */}
          <div className="absolute inset-4 flex flex-col gap-2">
            <div className="h-2 w-16 rounded bg-foreground/10" />
            <div className="h-1.5 w-full rounded bg-foreground/5" />
            <div className="h-1.5 w-3/4 rounded bg-foreground/5" />
            <div className="mt-2 flex gap-2">
              <div 
                className="h-4 w-12 rounded"
                style={{ backgroundColor: project.config?.colors?.primary || 'hsl(var(--primary))' }}
              />
              <div className="h-4 w-8 rounded bg-foreground/10" />
            </div>
          </div>
          
          {/* Style badge */}
          {project.style && (
            <div className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
              {project.style}
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="flex items-start justify-between p-4">
        <Link to={`/studio/${project.id}`} className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {project.template && (
              <span className="capitalize">{project.template}</span>
            )}
            {project.template && ' · '}
            Edited {formatDate(project.updated_at)}
          </p>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem onClick={onEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
