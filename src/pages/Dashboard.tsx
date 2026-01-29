import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects, useCreateProject, useDeleteProject } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, LayoutGrid, List, FolderOpen, LogOut, MoreHorizontal, Edit3, Copy, Download, Trash2 } from 'lucide-react';
import { Project } from '@/types/database';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';

// Style gradient mappings for project cards
const styleGradients: Record<string, string> = {
  swiss: 'from-red-500 to-red-600',
  brutalist: 'from-yellow-400 to-amber-500',
  minimal: 'from-gray-100 to-gray-200',
  tech: 'from-slate-800 to-slate-900',
  corporate: 'from-blue-500 to-blue-600',
  editorial: 'from-stone-300 to-stone-400',
  playful: 'from-pink-400 to-purple-500',
  elegant: 'from-amber-600 to-amber-800',
  vibrant: 'from-orange-500 via-pink-500 to-purple-600',
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const getDisplayName = (email: string | undefined) => email?.split('@')[0] || 'User';
  const getInitials = (email: string | undefined) => {
    const name = getDisplayName(email);
    return name.slice(0, 2).toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a project name',
        variant: 'destructive',
      });
      return;
    }

    try {
      const project = await createProject.mutateAsync({ name: newProjectName.trim() });
      setCreateDialogOpen(false);
      setNewProjectName('');
      toast({
        title: 'Project created',
        description: `"${project.name}" has been created successfully.`,
      });
      navigate(`/create/template?project=${project.id}`);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject.mutateAsync(projectToDelete.id);
      toast({
        title: 'Project deleted',
        description: `"${projectToDelete.name}" has been deleted.`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const filteredProjects = projects?.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f6f6]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P.</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Palet</span>
          </Link>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            
            {/* User Menu */}
            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  {getInitials(user?.email)}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg z-50">
                {/* Contact Card Section */}
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {getInitials(user?.email)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 truncate">{getDisplayName(user?.email)}</p>
                      <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-muted-foreground">
                      Member since {user?.created_at ? format(new Date(user.created_at), 'MMM yyyy') : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Projects</h1>
          <p className="mt-2 text-muted-foreground">
            Saved design specifications ready to export.
          </p>
        </div>
        
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-gray-200"
            />
          </div>
          
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded-md p-2 transition-colors',
                viewMode === 'grid' ? 'bg-gray-100 text-slate-900' : 'text-muted-foreground hover:bg-gray-50'
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded-md p-2 transition-colors',
                viewMode === 'list' ? 'bg-gray-100 text-slate-900' : 'text-muted-foreground hover:bg-gray-50'
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-600">Failed to load projects. Please try again.</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && filteredProjects?.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {searchQuery ? 'No matching projects' : 'No projects yet'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              {searchQuery
                ? 'Try adjusting your search query.'
                : 'Create your first design system to get started.'}
            </p>
            {!searchQuery && (
              <Button className="mt-6 gap-2" onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Create your first project
              </Button>
            )}
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && !error && filteredProjects && filteredProjects.length > 0 && (
          <div className={cn(
            'grid gap-6',
            viewMode === 'grid' 
              ? 'sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          )}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/studio/${project.id}`)}
              >
                {/* Thumbnail */}
                <div className={cn(
                  'relative h-[140px] bg-gradient-to-br',
                  styleGradients[project.style || 'swiss'] || 'from-gray-100 to-gray-200'
                )}>
                  {/* Mini preview mockup */}
                  <div className="absolute inset-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-current opacity-20" />
                      <div className="h-2 w-12 rounded bg-current opacity-10" />
                    </div>
                    <div className="h-1.5 w-full rounded bg-current opacity-10 mb-1" />
                    <div className="h-1.5 w-3/4 rounded bg-current opacity-10" />
                  </div>
                  
                  {/* Style badge */}
                  {project.style && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-medium text-slate-900 capitalize">
                      {project.style}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project.template && <span className="capitalize">{project.template}</span>}
                      {project.template && ' · '}
                      {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 rounded-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/studio/${project.id}`); }} className="gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(project); }} 
                        className="gap-2 text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new project</DialogTitle>
            <DialogDescription>
              Give your design system a name to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="projectName">Project name</Label>
            <Input
              id="projectName"
              placeholder="My Design System"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={createProject.isPending}>
              {createProject.isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{projectToDelete?.name}" and all its versions.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProject.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
