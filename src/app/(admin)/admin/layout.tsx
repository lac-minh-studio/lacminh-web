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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Lấy thêm trạng thái isLoading từ Identity hook
  const { adminInfo, isLoading } = useAdminIdentity();
  const { handleLogout, isLoggingOut, recentLogs } = useAdminDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isOnline = useNetworkStatus();

  // 1. CƠ CHẾ PHÒNG THỦ: Trạng thái Loading
  // Chặn toàn bộ UI cho đến khi Client đọc và giải mã xong Token
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  // 2. CƠ CHẾ PHÒNG THỦ: Trạng thái Unauthorized
  // Nếu không có token (hoặc token lỗi), không render Layout. 
  // (Thường middleware sẽ đá văng user ra trang login trước khi đến bước này, nhưng cứ phòng hờ là không thừa)
  if (!adminInfo) {
    return null;
  }

  // 3. Render giao diện chuẩn
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        // currentRole={adminInfo.role} // Hoàn toàn an toàn, adminInfo chắc chắn != null
        onClose={() => setIsSidebarOpen(false)}
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          adminInfo={adminInfo} // An toàn tuyệt đối
          recentLogs={recentLogs}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <ReconnectionBanner isVisible={!isOnline} />

        {/* Nội dung chính */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Đưa Toaster ra khỏi thẻ main để chuẩn hóa cấu trúc DOM */}
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