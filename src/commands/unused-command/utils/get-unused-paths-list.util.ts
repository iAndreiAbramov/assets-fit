import { checkForMatch } from './check-for-match.util.js';

export const getUnusedAssetsList = ({
	assetsList,
	importedPaths,
}: {
	assetsList: string[];
	importedPaths: string[];
}): string[] => {
	return assetsList.filter((assetPath) => {
		return !checkForMatch({assetPath, importedPaths})
	});
};
