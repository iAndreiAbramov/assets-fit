import fs from 'node:fs';
import path from 'node:path';

export const getFilesList = (directory: string): string[] => {
	const assetsList: string[] = [];
	const elements = fs.readdirSync(directory);
	elements.forEach((element) => {
		const elementPath = path.join(directory, element);
		const stats = fs.statSync(elementPath);
		if (stats.isDirectory()) {
			assetsList.push(...getFilesList(elementPath));
		} else {
			assetsList.push(elementPath);
		}
	});
	return assetsList.map((filePath) =>
		path.resolve(path.dirname(filePath), path.basename(filePath)),
	);
};
