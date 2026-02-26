export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
          About
        </h1>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who I Am</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              I'm a software developer based in Vancouver with a passion for building clean, functional applications. My focus is on full-stack web development, automation, and data-driven tools.
            </p>
            <p className="text-slate-600 leading-relaxed">
              When I'm not coding, you'll find me training for my next triathlon or exploring the trails on the North Shore. I believe the discipline and consistency required in endurance sports translates directly into better engineering.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'TypeScript', 'React', 'Next.js',
                'Node.js', 'Python', 'PostgreSQL',
                'Tailwind CSS', 'Docker', 'REST APIs',
                'Git', 'CI/CD', 'AWS',
              ].map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium text-center"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Full-Stack Developer</h3>
                  <span className="text-sm text-slate-400">2023 - Present</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">Acme Corp</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Building and maintaining internal tools and customer-facing applications using React, Next.js, and Node.js. Leading migration of legacy systems to modern architecture.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Junior Developer</h3>
                  <span className="text-sm text-slate-400">2021 - 2023</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">StartupCo</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Developed REST APIs, automated deployment pipelines, and contributed to the frontend of a SaaS product used by thousands of customers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
