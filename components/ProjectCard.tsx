import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/5 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
      <p className="text-white/70 mb-4">{project.description}</p>
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
            className="bg-white/5 border border-white/20 text-white/80 px-4 py-2 rounded-full hover:bg-white/5 transition-colors font-medium text-sm"
          >
            GitHub
          </Link>
        )}
      </div>
    </div>
  );
}
