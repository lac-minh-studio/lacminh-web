
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);

function getArg(name) {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : undefined;
}

function fail(message) {
    console.error(`\n[db:backup] ${message}`);
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

function timestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

const env = getArg('--env');
const project = getArg('--project');

if (!['emulator', 'production'].includes(env)) {
    fail('Chọn --env emulator hoặc --env production.');
}

if (!project) {
    fail('Thiếu --project <project-id>.');
}

if (env === 'emulator') {
    const outputDir = path.resolve(
        'backups',
        'emulator',
        `${project}-${timestamp()}`,
    );

    mkdirSync(path.dirname(outputDir), { recursive: true });

    console.log(`[db:backup] Export Emulator: ${project}`);
    console.log(`[db:backup] Destination: ${outputDir}`);
    console.log(
        '[db:backup] Đảm bảo Emulator đang chạy và dùng đúng project ID.',
    );

    run('npx', [
        'firebase',
        'emulators:export',
        outputDir,
        '--project',
        project,
    ]);

    writeFileSync(
        path.join(outputDir, 'backup-metadata.json'),
        JSON.stringify(
            {
                environment: 'emulator',
                project,
                createdAt: new Date().toISOString(),
            },
            null,
            2,
        ),
    );

    console.log('[db:backup] Export hoàn tất.');
    console.log(`Backup path: ${outputDir}`);
} else {
    const bucket = getArg('--bucket');

    if (!bucket) {
        fail(
            'Thiếu --bucket <bucket-name> cho Production. ' +
            'Không sử dụng bucket mặc định.',
        );
    }

    const destination =
        `gs://${bucket}/firestore-backups/${project}/${timestamp()}`;

    console.log(`[db:backup] Export Production: ${project}`);
    console.log(`[db:backup] Cloud Storage: ${destination}`);

    run('gcloud', [
        'firestore',
        'export',
        destination,
        '--project',
        project,
    ]);

    console.log('[db:backup] Export hoàn tất.');
    console.log(`Backup URI: ${destination}`);
}
