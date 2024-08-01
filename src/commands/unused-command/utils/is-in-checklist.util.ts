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

export const shouldBeParsed = (filePath: string): boolean => {
	const extension = filePath.split('.').pop();
	return !extension || !BANNED_EXTENSIONS.includes(extension);
};
