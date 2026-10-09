'use client';

import { useState } from 'react';
import { Sidebar } from '@/domain/admin/dashboard/presentation/SideBar';
import { Header } from '@/domain/admin/dashboard/presentation/Header';
import { useAdminDashboard } from '@/domain/admin/dashboard/application/useAdminDashboard';
import { Toaster } from 'react-hot-toast';
import { useAdminIdentity } from '@/domain/admin/dashboard/application/useAdminIdentity';
import { useNetworkStatus } from '@/domain/admin/hooks/useNetworkStatus';
import { ReconnectionBanner } from '@/domain/admin/ui/ReconnectionBanner';
import { Spinner } from '@heroui/react'; // Dùng Spinner của HeroUI cậu đang cài
import { HighRiskAlertListener } from '@/domain/admin/activity-alert/presentation/HighRiskAlertListener';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Lấy thêm trạng thái isLoading từ Identity hook
  const { adminInfo, isLoading } = useAdminIdentity();
  const { handleLogout, isLoggingOut, recentLogs } = useAdminDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isOnline = useNetworkStatus();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  //nếu chưa có token để lấy thông tin admin thì không return gì cả
  if (!adminInfo) {
    return null;
  }


  return (
    <div className="flex min-h-screen bg-background">

      {/* lắng nghe nguy cơ */}
      <HighRiskAlertListener />

      {/* siderbar */}
      <Sidebar
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* header */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          adminInfo={adminInfo}
          recentLogs={recentLogs}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/*  connection network */}
        <ReconnectionBanner isVisible={!isOnline} />

        {/* Nội dung chính */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Toaster thông báo */}
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
              iconTheme: { primary: '#22C55E', secondary: '#FFFFFF' }
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' }
            },
          }}
        />
      </div>
    </div>
  );
}