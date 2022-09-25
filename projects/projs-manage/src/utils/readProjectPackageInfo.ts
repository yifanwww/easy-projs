import fs from 'fs/promises';
import path from 'path';

import { PackageInfo } from '../types';

export async function readProjectPackageInfo(projDir: string): Promise<PackageInfo> {
    const packageFile = path.resolve(projDir, 'package.json');

    const raw = await fs.readFile(packageFile, 'utf-8');
    const content = JSON.parse(raw);

    return content;
}
