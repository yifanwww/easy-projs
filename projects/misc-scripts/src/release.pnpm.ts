import type { Nullable } from '@easy-pkg/utils-type';
import child from 'node:child_process';
import semver from 'semver';

function getGitTag(): string | null {
    try {
        const stdout = child.execSync('git describe --exact-match --tags', { encoding: 'utf-8' });
        return stdout.trim() || null;
    } catch {
        return null;
    }
}

function getVersionTag(prerelease: Nullable<readonly (string | number)[]>): string {
    const _pre =
        typeof prerelease?.[0] === 'undefined' || prerelease[0] === null || typeof prerelease[0] === 'number'
            ? null
            : prerelease[0];

    switch (_pre) {
        case null:
            return 'latest';

        case 'alpha':
        case 'beta':
        case 'next':
        case 'rc':
            return _pre;

        default:
            return 'next';
    }
}

function release(): void {
    const tag = getGitTag();
    if (!tag) return;

    const prerelease = semver.prerelease(tag);
    const versionTag = getVersionTag(prerelease);

    const cmd = `pnpm publish --tag ${versionTag} --no-git-checks`;
    console.info(cmd);
    child.execSync(cmd, { encoding: 'utf-8', stdio: 'inherit' });
}

release();
