import { getFileHashSync } from './get-file-hash-sync.util.js';

export const getDuplicateFiles = (filesList: string[]): string[][] => {
	const hashMap = new Map<string, string[]>();
	filesList.forEach((filePath) => {
		const fileHash = getFileHashSync(filePath);
		if (hashMap.has(fileHash)) {
			hashMap.set(fileHash, [...(hashMap.get(fileHash) as string[]), filePath]);
		} else {
			hashMap.set(fileHash, [filePath]);
		}
	});

	return Array.from(hashMap.values()).filter((files) => files.length > 1);
};
