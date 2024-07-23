const EXTENSIONS_CHECKLIST = [
	'.ts',
	'.tsx',
	'.js',
	'.jsx',
	'.html',
	'.css',
	'.scss',
	'.sass',
	'.less',
	'.vue',
];

export const isInChecklist = (filePath: string) => {
	const extension = filePath.split('.').pop();
	return EXTENSIONS_CHECKLIST.includes(`.${extension}`);
};
