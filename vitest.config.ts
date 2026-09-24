import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'happy-dom',
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: [
                'src/domain/admin/staff/application/useDebounce.ts',
                'src/domain/admin/staff/application/useStaffFilter.ts',
                'src/domain/admin/dashboard/application/usePermission.ts'
            ],
            exclude: ['node_modules/', '.next/', '**/*.d.ts', '**/*.test.ts'],
        },
    },
});