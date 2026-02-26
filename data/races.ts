export interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
  url: string;
}

export const races: Race[] = [
  {
    id: '1',
    name: 'BMO Marathon',
    date: 'May 3, 2026',
    location: 'Vancouver',
    url: 'https://bmovanmarathon.ca/',
  },
  {
    id: '2',
    name: 'Knee Knacker',
    date: 'July 11, 2026',
    location: 'North Vancouver',
    url: 'https://kneeknacker.com/',
  },
  {
    id: '3',
    name: 'Ironman 70.3 Washington',
    date: 'September 20, 2026',
    location: 'Tri-Cities',
    url: 'https://www.ironman.com/races/im703-washington-tri-cities',
  },
];
