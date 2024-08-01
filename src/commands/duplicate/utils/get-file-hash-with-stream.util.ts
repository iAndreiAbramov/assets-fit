import crypto from 'node:crypto';
import fs from 'node:fs';

/**
 * Get the file hash using a stream.
 * Removes all whitespaces from the file content.
 * @param filePath The file path.
 * @returns The file hash.
 */
export const getFileHashWithStream = async (
	filePath: string,
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha256');
		const stream = fs.createReadStream(filePath);

		stream.on('data', (chunk) => {
			hash.update(chunk.toString().replace(/\s/g, ''));
		});

		stream.on('end', () => {
			resolve(hash.digest('hex'));
		});

		stream.on('error', (error) => {
			reject(error);
		});
	});
};
