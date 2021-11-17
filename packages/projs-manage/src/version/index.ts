import { listProjectsVersion } from './ls';

export async function version(): Promise<void> {
    await listProjectsVersion();
}
