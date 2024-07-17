import fs from 'node:fs';
import path from 'node:path';

const FILE_PATH_REGEXP = /(?<=['"`])[\w\S]+(\/[\w\S]+)+(?=['"`])/gi;

export const getImportedPathsFromFile = (filePath: string | undefined): string[] | undefined => {
	if (!filePath) {
		return;
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const importedPaths = fileContent.match(FILE_PATH_REGEXP);

	if (!importedPaths) {
		return;
	}

	return importedPaths.map((importedPath) =>
		path.normalize(importedPath),
	);
};
