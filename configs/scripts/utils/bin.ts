import child from 'child_process';

export function buildPackages(): void {
    const packagesOrder = ['@package/memorize', '@package/random-string', '@package/template-nodejs'];

    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
    }
}

export function buildProjects(): void {
    const packagesOrder = ['@project/demo-test-nodejs', '@project/template-browser-react', '@project/template-nodejs'];

    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
    }
}
