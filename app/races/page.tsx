import Image from 'next/image';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UpcomingRacesCard from '@/components/dashboard/UpcomingRacesCard';
import { races } from '@/data/races';

export default function RacesPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Races
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <UpcomingRacesCard races={races} />

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src="/images/ironman-finish.png"
              alt="Ironman 70.3 Victoria finish — May 2025"
              width={800}
              height={1000}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="bg-white px-5 py-3">
              <p className="text-sm text-gray-500">
                Ironman 70.3 Victoria &mdash; May 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
