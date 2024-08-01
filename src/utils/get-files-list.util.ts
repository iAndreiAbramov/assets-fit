import fs from 'node:fs';
import path from 'node:path';
import * as process from 'node:process';

/**
 * Get a list of files from a list of directories recursively
 * @param includedDirs The list of directories to get the files from
 * @param excludedDirs The list of directories to exclude from the search
 * @returns The list of files
 */
export const getFilesList = ({
	includedDirs,
	excludedDirs,
}: {
	includedDirs: string[];
	excludedDirs: string[];
}): string[] => {
	const filesList: string[] = [];
	includedDirs.forEach((directory) => {
		const elements = fs.readdirSync(directory);
		elements.forEach((element) => {
			const elementPath = path.join(directory, element);
			const stats = fs.statSync(elementPath);
			if (stats.isDirectory()) {
				filesList.push(
					...getFilesList({ includedDirs: [elementPath], excludedDirs }),
				);
			} else if (stats.isFile()) {
				filesList.push(elementPath);
			}
		});
	});

	return filesList
		.map((filePath) => path.resolve(process.cwd(), filePath))
		.filter((filePath) =>
			excludedDirs.every((excludedDir) => !filePath.includes(excludedDir)),
		);
};
