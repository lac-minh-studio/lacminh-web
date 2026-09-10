'use client';

import { useState } from 'react';
import { Sidebar } from '@/domain/admin/dashboard/presentation/SideBar';
import { Header } from '@/domain/admin/dashboard/presentation/Header';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminInfo, handleLogout, isLoggingOut } = useAdminDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        currentRole={adminInfo.role}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          adminInfo={adminInfo}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* render children */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}