import path from 'path';
import Files from '../models/file';
import { Request, Response } from 'express';

export const createFile = async (req: Request, res: Response) => {
    try {
        const file = await Files.create({
            id: req.file.filename.split('.')[0],
            filename: req.file.originalname,
            extname:  path.extname(req.file.path),
            pathname: req.file.path,
            mime_type: req.file.mimetype,
            size: req.file.size
        });

        return res.status(201).json({
            message: 'File created',
            data: file
        });
    } catch (err) {
        res.status(500).json({ message: `Error: ${ err }` });
    }
};