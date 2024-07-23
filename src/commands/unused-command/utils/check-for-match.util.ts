export const checkForMatch = ({
	assetPath,
	importedPaths,
}: {
	assetPath: string;
	importedPaths: string[];
}) => {
	return importedPaths.some((importPath) => {
		return assetPath.endsWith(importPath);
	});
};
