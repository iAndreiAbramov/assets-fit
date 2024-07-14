import fs from 'node:fs';
import path from 'node:path';

const FILE_PATH_REGEXP = /([./\w-]+(?:\.\w+)?\/[\w-]+(?:\.\w+)?)/gi;

export const getImportedPathsFromFile = (filePath: string): string[] => {
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const paths = fileContent.match(FILE_PATH_REGEXP);
	if (!paths) {
		return [];
	}
	return paths.map((filePath) =>
		path.resolve(path.dirname(filePath), path.basename(filePath)),
	);
};
