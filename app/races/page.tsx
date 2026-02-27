import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UpcomingRacesCard from '@/components/dashboard/UpcomingRacesCard';
import RacePhoto from '@/components/dashboard/RacePhoto';
import PageTransition from '@/components/PageTransition';
import { races } from '@/data/races';

export default function RacesPage() {
  return (
    <DashboardLayout>
      <PageTransition className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Races
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <UpcomingRacesCard races={races} />
          <RacePhoto />
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
