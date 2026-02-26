export interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
}

export const races: Race[] = [
  {
    id: '1',
    name: 'BMO Marathon',
    date: 'May 3, 2026',
    location: 'Vancouver',
  },
  {
    id: '2',
    name: 'Knee Knacker',
    date: 'July 11, 2026',
    location: 'North Vancouver',
  },
  {
    id: '3',
    name: 'Ironman 70.3 Washington',
    date: 'September 20, 2026',
    location: 'Tri-Cities',
  },
];
