import { getFileHashWithStream } from './get-file-hash-with-stream.util.js';

/**
 * Get the list of duplicate files.
 * @param filesList The list of files.
 * @returns The list of duplicate files as an array of arrays.
 */
export const getDuplicateFiles = async (
	filesList: string[],
): Promise<string[][]> => {
	return new Promise((resolve, reject) => {
		const hashMap = new Map<string, string[]>();
		const promises = filesList.map(async (filePath) => {
			const fileHash = await getFileHashWithStream(filePath);
			if (hashMap.has(fileHash)) {
				hashMap.set(fileHash, [
					...(hashMap.get(fileHash) as string[]),
					filePath,
				]);
			} else {
				hashMap.set(fileHash, [filePath]);
			}
		});

		Promise.all(promises)
			.then(() => {
				resolve(
					Array.from(hashMap.values()).filter((files) => files.length > 1),
				);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
