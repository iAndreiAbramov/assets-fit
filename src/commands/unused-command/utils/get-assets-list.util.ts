import fs from 'node:fs';
import path from 'node:path';

export const getAssetsList = (assetsDir: string): string[] => {
	const assetsList: string[] = [];
	const elements = fs.readdirSync(assetsDir);
	elements.forEach((element) => {
		const elementPath = path.join(assetsDir, element);
		const stats = fs.statSync(elementPath);
		if (stats.isDirectory()) {
			assetsList.push(...getAssetsList(elementPath));
		} else {
			assetsList.push(elementPath);
		}
	});
	return assetsList;
};
