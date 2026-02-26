export interface Project {
  id: string;
  title: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Training Dashboard',
    description: 'A real-time training dashboard connected to Strava API. Tracks cycling, running, and swimming volume with period filtering and monthly breakdowns.',
    liveLink: '/dashboard',
    githubLink: 'https://github.com/ali-amer/portfolio',
  },
  {
    id: '2',
    title: 'Home Automation Hub',
    description: 'A centralized control system for smart home devices built with Node.js and MQTT. Manages lighting, climate, and security from a single interface.',
    githubLink: 'https://github.com/example/home-automation',
  },
  {
    id: '3',
    title: 'Race Pace Calculator',
    description: 'A lightweight web tool for runners and triathletes to calculate splits, predict finish times, and plan race-day nutrition strategy.',
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/example/race-pace',
  },
  {
    id: '4',
    title: 'Budget Tracker API',
    description: 'A RESTful API for personal finance tracking built with Express and PostgreSQL. Supports categorization, recurring transactions, and monthly reports.',
    githubLink: 'https://github.com/example/budget-api',
  },
];
