import fs from 'node:fs';
import { getImportedPathsFromFile } from './get-imported-paths-from-file.util.js';
import { getFilesList } from '../../../utils/get-files-list.util.js';

export const getImportedPathsFromFileList = (filesList: string[]): string[] => {
	const importedPaths: string[] = [];
	filesList.forEach((filePath) => {
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			const nestedFilesList = getFilesList({
				includedDirs: [filePath],
				excludedDirs: [],
			});
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
