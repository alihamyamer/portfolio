import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
      <p className="text-slate-500 mb-4">{project.description}</p>
      <div className="flex gap-3 flex-wrap">
        {project.liveLink && (
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition-colors font-medium text-sm"
          >
            Live Demo
          </Link>
        )}
        {project.githubLink && (
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors font-medium text-sm"
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}
