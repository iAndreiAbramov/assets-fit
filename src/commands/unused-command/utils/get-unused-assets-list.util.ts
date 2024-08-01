import { checkForMatch } from './check-for-match.util.js';

/**
 * Get the list of unused assets.
 * @param assetsList The list of assets paths.
 * @param usagePaths The list of usage paths.
 * @returns The list of unused assets paths.
 */
export const getUnusedAssetsList = ({
	assetsList,
	usagePaths,
}: {
	assetsList: string[];
	usagePaths: string[];
}): string[] => {
	return assetsList.filter((assetPath) => {
		return !checkForMatch({ assetPath, usagePaths: usagePaths });
	});
};
