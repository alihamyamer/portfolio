import { projects } from '@/data/projects';
import ProjectsGrid from '@/components/ProjectsGrid';
import PageTransition from '@/components/PageTransition';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-28">
      <PageTransition className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          Projects
        </h1>
        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
          A collection of projects showcasing my skills and experience in software development.
        </p>
        <ProjectsGrid projects={projects} />
      </PageTransition>
    </div>
  );
}
