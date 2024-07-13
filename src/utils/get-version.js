import fs from 'node:fs';
export const getVersion = () => {
    const packageJson = fs.readFileSync('package.json', 'utf-8');
    const { version } = JSON.parse(packageJson);
    return version || 'undetected';
};
//# sourceMappingURL=get-version.js.map