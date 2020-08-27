import express from 'express';
import path from 'path';

import multer from '../middleware/multer';
import { getFile, getFiles } from '../file/get';
import { createFile } from '../file/upload';
import { deleteFile } from '../file/delete';
import { updateFile } from '../file/update';
import { downloadFile } from '../file/download';
import {authenticateToken} from '../middleware/auth';

const files = express.Router();

files.get(
    '/list',
    authenticateToken,
    getFiles
);

files.get(
    '/:id',
    authenticateToken,
    getFile
);

files.post(
    '/upload',
    authenticateToken,
    express.static(path.resolve('file/filebd')),
    multer.single(''),
    createFile
);

files.delete(
    '/delete/:id',
    authenticateToken,
    deleteFile
);

files.get(
    '/download/:id',
    authenticateToken,
    downloadFile
);

files.put(
    '/update/:id',
    authenticateToken,
    express.static(path.resolve('file/filebd')),
    multer.single(''),
    updateFile,
);

export default files;