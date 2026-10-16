
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);

function getArg(name) {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
    return args.includes(name);
}

function fail(message) {
    console.error(`\n[db:restore] ${message}`);
    process.exit(1);
}

function run(command, commandArgs) {
    const result = spawnSync(command, commandArgs, {
        stdio: 'inherit',
        shell: process.platform === 'win32',
    });

    if (result.error) fail(result.error.message);
    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

const env = getArg('--env');
const project = getArg('--project');
const backup = getArg('--backup');

if (!['emulator', 'production'].includes(env)) {
    fail('Chọn --env emulator hoặc --env production.');
}

if (!project) fail('Thiếu --project <project-id>.');
if (!backup) fail('Thiếu --backup <path-or-gs-uri>.');

if (env === 'emulator') {
    const backupPath = path.resolve(backup);

    if (!existsSync(backupPath)) {
        fail(`Không tìm thấy thư mục backup: ${backupPath}`);
    }

    // Firebase Emulator export phải chứa metadata export hợp lệ.
    const exportMetadata = path.join(
        backupPath,
        'firebase-export-metadata.json',
    );

    if (!existsSync(exportMetadata)) {
        fail(
            'Không tìm thấy firebase-export-metadata.json. ' +
            'Đường dẫn có thể không phải bản export Emulator hợp lệ.',
        );
    }

    console.log(`[db:restore] Project Emulator: ${project}`);
    console.log(`[db:restore] Import source: ${backupPath}`);
    console.log(
        '[db:restore] Dừng Emulator đang chạy trước khi tiếp tục.',
    );
    console.log(
        '[db:restore] Emulator sẽ tiếp tục chạy sau khi import. ' +
        'Nhấn Ctrl+C để dừng.',
    );

    run('npx', [
        'firebase',
        'emulators:start',
        '--only',
        'auth,firestore',
        `--import=${backupPath}`,
        '--project',
        project,
    ]);
} else {
    if (!backup.startsWith('gs://')) {
        fail(
            'Backup Production phải là Cloud Storage URI, ví dụ ' +
            'gs://my-bucket/firestore-backups/project-id/backup-id.',
        );
    }

    if (!hasFlag('--confirm-production')) {
        fail(
            'Restore Production bị chặn. ' +
            'Hãy kiểm tra project/backup rồi thêm --confirm-production.',
        );
    }

    console.error('\n!!! PRODUCTION RESTORE !!!');
    console.error(`Project: ${project}`);
    console.error(`Source:  ${backup}`);
    console.error(
        'Import có thể thay đổi dữ liệu hiện có. ' +
        'Hãy backup trạng thái hiện tại trước khi tiếp tục.',
    );

    const confirmation = getArg('--confirm-project');

    if (confirmation !== project) {
        fail(
            `Để xác nhận project, truyền --confirm-project ${project}`,
        );
    }

    run('gcloud', [
        'firestore',
        'import',
        backup,
        '--project',
        project,
    ]);

    console.log('[db:restore] Import đã hoàn tất.');
}
