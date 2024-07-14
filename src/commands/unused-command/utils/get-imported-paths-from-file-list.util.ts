import { getImportedPathsFromFile } from './get-imported-paths-from-file.util.js';

export const getImportedPathsFromFileList = (filesList: string[]): string[] => {
	const importedPaths: string[] = [];
	filesList.forEach((filePath) => {
		importedPaths.push(...getImportedPathsFromFile(filePath));
	});
	return importedPaths;
};
