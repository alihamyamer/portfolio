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
              I'm Ali Abuelnasr — an Applied AI & Data Analyst and Workflow Automation Specialist based in Vancouver, Canada. I have a "builder-teacher" mindset, bridging the gap between complex technical concepts and business users.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              I'm experienced in reverse-engineering legacy workflows to build scalable, automated solutions that empower teams. My passion is in Applied AI — moving beyond prompt engineering to build semantic search tools, data visualizations, and automated pipelines that drive internal efficiency and revenue growth.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Outside of work, I'm training for my next triathlon and exploring the trails on the North Shore. I'm also a Big Brother mentor with Big Brothers Vancouver, supporting youth through connection and mentorship.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Skills</h2>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Core Competencies</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Stakeholder Discovery', 'AI Enablement',
                  'Process Architecture', 'Rapid Prototyping',
                ].map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm font-medium text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Data & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'AI & Automations', 'SQL', 'Python',
                  'AWS', 'Microsoft Office', 'Power Query',
                ].map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Experience</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Strategy & Data Analyst</h3>
                  <span className="text-sm text-slate-400">Jun 2025 - Present</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">Arc'teryx — North Vancouver</p>
                <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
                  <li>Prototyped a "Similarity Index" recommendation engine to solve cold-start problems for new product launches, using AI to semantically embed product descriptions so the merchandising team could identify historical benchmarks without manual tagging.</li>
                  <li>Built a signal detection pipeline monitoring target subreddits, Yelp reviews, and Google reviews. Translated sell-through signals into actionable insights, enabling the team to reallocate 1,200 units and improve DTC conversion by 3% YoY.</li>
                  <li>Reverse-engineered a brittle network of legacy Excel reports and rebuilt the logic using Power Query — transforming a manual 4-hour weekly process into a one-click refresh pipeline, reducing error rates by near-100% and freeing 150+ hours/year.</li>
                </ul>
              </div>
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Operations Manager</h3>
                  <span className="text-sm text-slate-400">May 2024 - Jun 2025</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">Amazon — Vancouver</p>
                <ul className="text-slate-600 text-sm leading-relaxed space-y-2">
                  <li>Identified a recurring administrative bottleneck and automated data extraction using AWS tools, returning 40 minutes per day to frontline leaders so they could focus on high-value coaching.</li>
                  <li>Led the discovery and design of a new equipment checkout tool — conducted user interviews, built the logic, and managed rollout. Achieved 40+ user adoption and increased equipment return rates by 30%.</li>
                  <li>Implemented a SQL-based predictive staffing model that reduced operational costs by 18%, translating complex outputs into simple daily plans for shift managers.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Education</h2>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-900">BA — Economics & Philosophy</h3>
                <span className="text-sm text-slate-400">2019 - 2024</span>
              </div>
              <p className="text-sm text-green-600 font-medium mb-2">The University of British Columbia</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Key Courses: Game Theory, Multivariate Calculus, Political Economy
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Thesis: Assessing the Belt and Road Initiative as a Form of Debt Trap Diplomacy
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Undergraduate Work Learn Research Award ($10,000 CAD)
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Volunteering</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Big Brother Mentor</h3>
                  <span className="text-sm text-slate-400">2025 - Present</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">Big Brothers Vancouver</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Supporting youth through a one-to-one mentorship relationship built on trust, connection, and fun. Organizing weekly outings to foster empowerment and autonomy.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-slate-900">Co-Chair, Relay For Life</h3>
                  <span className="text-sm text-slate-400">Sep 2021 - May 2022</span>
                </div>
                <p className="text-sm text-green-600 font-medium mb-2">Canadian Cancer Society</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Co-led the annual Relay For Life fundraiser, raising over $35K to support the Canadian Cancer Society.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
