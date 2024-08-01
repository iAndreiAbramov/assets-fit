const BANNED_EXTENSIONS = [
	'svg',
	'png',
	'bmp',
	'jpg',
	'jpeg',
	'gif',
	'webp',
	'ico',
	'tif',
	'tiff',
	'woff',
	'woff2',
	'eot',
	'ttf',
	'otf',
];

/**
 * Check if the file should be parsed based on its extension
 * @param filePath - The path of the file
 * @returns True if the file should be parsed, false otherwise
 */
export const shouldBeParsed = (filePath: string): boolean => {
	const extension = filePath.split('.').pop();
	return !extension || !BANNED_EXTENSIONS.includes(extension);
};
