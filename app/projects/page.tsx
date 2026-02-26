import { projects } from '@/data/projects';
import ProjectsGrid from '@/components/ProjectsGrid';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-center">
          Projects
        </h1>
        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
          A collection of projects showcasing my skills and experience in software development.
        </p>
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
