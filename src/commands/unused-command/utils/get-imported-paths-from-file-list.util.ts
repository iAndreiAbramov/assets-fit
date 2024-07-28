import { getImportedPathsFromFile } from './get-imported-paths-from-file.util.js';
import { getFilesList } from './get-files-list.util.js';
import fs from 'node:fs';

export const getImportedPathsFromFileList = (filesList: string[]): string[] => {
	const importedPaths: string[] = [];
	filesList.forEach((filePath) => {
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			const nestedFilesList = getFilesList([filePath]);
			importedPaths.push(...getImportedPathsFromFileList(nestedFilesList));
		} else if (stats.isFile()) {
			const pathsFromFile = getImportedPathsFromFile(filePath);
			if (pathsFromFile?.length) {
				importedPaths.push(...pathsFromFile);
			}
		}
	});

	return importedPaths;
};
