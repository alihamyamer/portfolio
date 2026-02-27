import PageTransition from '@/components/PageTransition';

export default function AutomationPage() {
  const automations = [
    {
      title: 'Strava Activity Sync',
      description: 'Automatically pulls training data from Strava every time you open the dashboard. Aggregates by sport, calculates monthly volume, and refreshes tokens seamlessly.',
      status: 'Active',
      tech: ['Strava API', 'OAuth 2.0', 'Next.js API Routes'],
    },
    {
      title: 'Deployment Pipeline',
      description: 'Push to main triggers a build, runs type checks and linting, and deploys to Vercel. Zero-downtime deployments with automatic rollback on failure.',
      status: 'Active',
      tech: ['GitHub Actions', 'Vercel', 'TypeScript'],
    },
    {
      title: 'Morning Briefing Bot',
      description: 'A daily digest delivered at 7 AM with weather, calendar events, training plan for the day, and any open pull requests that need review.',
      status: 'In Development',
      tech: ['Node.js', 'Cron', 'Slack API'],
    },
    {
      title: 'Smart Home Energy Monitor',
      description: 'Tracks real-time energy consumption across zones, logs historical data, and sends alerts when usage exceeds configurable thresholds.',
      status: 'Planned',
      tech: ['MQTT', 'InfluxDB', 'Grafana'],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageTransition className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Automation
        </h1>
        <p className="text-slate-500 mb-10 max-w-2xl">
          I automate the boring stuff so I can spend more time building and training. Here are some of the systems I've set up.
        </p>

        <div className="space-y-6">
          {automations.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Active'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : item.status === 'In Development'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageTransition>
    </div>
  );
}
