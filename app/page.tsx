import Link from 'next/link';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <PageTransition className="text-center max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          ali-amer
        </h1>
        <p className="text-xl text-slate-600 mb-4">
          Software developer, endurance athlete, and automation enthusiast.
        </p>
        <p className="text-lg text-slate-500 mb-8">
          I build tools and applications that solve real problems. Currently training for an Ironman while shipping code.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/projects"
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-500 transition-colors font-medium text-lg inline-block"
          >
            View Projects
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-slate-700 border border-slate-300 px-8 py-3 rounded-full hover:bg-slate-50 transition-colors font-medium text-lg inline-block"
          >
            Training Dashboard
          </Link>
        </div>
      </PageTransition>
    </div>
  );
}
