import { promises as fsPromises } from 'fs';

export const readFileContent = async (filePath: string): Promise<string> => {
    try {
        const content = await fsPromises.readFile(filePath, 'utf-8');
        return content;
    } catch (error: any) {
        console.error('Error reading file:', error.message);
        throw error;
    }
};