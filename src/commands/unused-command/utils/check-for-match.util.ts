/**
 * Check if the asset path ends with any of the usage paths
 * Which means the asset is used in the usage path
 * @param assetPath
 * @param importedPaths
 */
export const checkForMatch = ({
	assetPath,
	usagePaths,
}: {
	assetPath: string;
	usagePaths: string[];
}) => {
	return usagePaths.some((usagePath) => {
		return assetPath.endsWith(usagePath);
	});
};
