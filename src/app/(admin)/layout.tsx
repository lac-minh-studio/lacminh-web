'use client';

import { useState } from 'react';
import { Sidebar } from '@/domain/admin/dashboard/presentation/SideBar';
import { Header } from '@/domain/admin/dashboard/presentation/Header';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminInfo, handleLogout, isLoggingOut, recentLogs } = useAdminDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        currentRole={adminInfo.role}
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          adminInfo={adminInfo}
          recentLogs={recentLogs}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* render children */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{

              duration: 3000,
              style: {
                background: '#FDFBF7',
                color: '#1A1A1A',
                border: '1px solid #E5E5E5',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#22C55E', // Màu xanh success
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444', // Màu đỏ destructive
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </main>
      </div>
    </div>
  );
}