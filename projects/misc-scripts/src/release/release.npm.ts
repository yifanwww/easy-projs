import child from 'node:child_process';
import semver from 'semver';

function getNpmTag(prerelease: readonly (string | number)[] | null): string {
    const type = typeof prerelease?.[0] !== 'string' ? null : prerelease[0];

    switch (type) {
        case null:
            return 'latest';

        case 'alpha':
        case 'beta':
        case 'next':
        case 'rc':
            return type;

        default:
            return 'next';
    }
}

function release(): void {
    // This environment variable is injected in Github Actions
    //
    // ```yml
    // - name: Publish
    //   run: node scripts/release.js
    //   env:
    //     GITHUB_REF_NAME: ${{ github.ref_name }}
    // ```
    const version = process.env.GITHUB_REF_NAME;
    if (!version) return;

    const prerelease = semver.prerelease(version);
    const npmTag = getNpmTag(prerelease);

    const cmd = `npm publish --tag ${npmTag} --access public`;
    console.info(cmd);
    child.execSync(cmd, { encoding: 'utf-8', stdio: 'inherit' });
}

release();
