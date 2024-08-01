import fs from 'node:fs';
import { getUsagePathsFromFile } from './get-usage-paths-from-file.util.js';
import { getFilesList } from '../../../utils/get-files-list.util.js';

/**
 * Get all usage paths from a list of files
 * @param filesList The list of files to get the usage paths from
 * @returns The list of usage paths
 */
export const getUsagePathsFromFileList = (filesList: string[]): string[] => {
	const importedPaths: string[] = [];
	filesList.forEach((filePath) => {
		const stats = fs.statSync(filePath);
		if (stats.isDirectory()) {
			const nestedFilesList = getFilesList({
				includedDirs: [filePath],
				excludedDirs: [],
			});
			importedPaths.push(...getUsagePathsFromFileList(nestedFilesList));
		} else if (stats.isFile()) {
			const pathsFromFile = getUsagePathsFromFile(filePath);
			if (pathsFromFile?.length) {
				importedPaths.push(...pathsFromFile);
			}
		}
	});

	return importedPaths;
};
