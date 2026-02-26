import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-theme min-h-screen pt-16">
      {children}
    </div>
  );
}
