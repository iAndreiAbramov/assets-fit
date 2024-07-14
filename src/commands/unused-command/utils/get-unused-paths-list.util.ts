export const getUnusedAssetsList = ({
	assetsList,
	importedPathsList,
}: {
	assetsList: string[];
	importedPathsList: string[];
}): string[] => {
	return assetsList.filter((filePath) => !importedPathsList.includes(filePath));
};
