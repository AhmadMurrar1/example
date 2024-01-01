import fs from 'fs';
import { filePath } from '../utils/dataFilePath.js';

const readBooksFromFile = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        throw new Error("Error reading from book file");
    }
};

const writeBooksToFile = (books) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(books), 'utf-8');
    } catch (error) {
        throw new Error("Error writing to the books file");
    }
};

export { readBooksFromFile, writeBooksToFile };
