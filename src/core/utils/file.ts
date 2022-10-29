import * as FileSystem from "expo-file-system";

export const checkFileSize = async (
    fileURI: string,
    maxSize = 2
): Promise<boolean> => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    if (!fileInfo.size) return false;
    const sizeInMb = fileInfo.size / 1024 / 1024;
    return sizeInMb < maxSize;
};

