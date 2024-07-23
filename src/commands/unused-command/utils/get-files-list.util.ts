import fs from 'node:fs';
import path from 'node:path';
import * as process from 'node:process';

export const getFilesList = (directory: string): string[] => {
	const filesList: string[] = [];
	const elements = fs.readdirSync(directory);
	elements.forEach((element) => {
		const elementPath = path.join(directory, element);
		const stats = fs.statSync(elementPath);
		if (stats.isDirectory()) {
			filesList.push(...getFilesList(elementPath));
		} else if (stats.isFile()) {
			filesList.push(elementPath);
		}
	});

	return filesList.map((filePath) => path.resolve(process.cwd(), filePath));
};
