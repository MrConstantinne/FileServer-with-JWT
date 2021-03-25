import fs from 'fs';
import path from 'path';
import Files from '../models/file';
import { Request, Response } from 'express';

export const updateFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { originalname, mimeType, size} = req.file;
    try {
        const file = await Files.findOne({ where: `${ id }` });
        if (!file) return res.status(404).json({ message: 'File not found' });
        Promise.allSettled([
            Files.update({
                filename: originalname,
                extname: path.extname(req.file.path),
                pathname: file.pathname,
                mime_type: mimeType,
                size: size
            },
            { where: `${ id }` }
            ),
            fs.rename( `${ req.file.path }`, `${ file.pathname }`, err => {
                if (err) {
                    return res.status(500).json({ message: `Error: ${ err }` });
                }
            })
        ]).then();
        return res.json({ message: 'File changed' });
    } catch (err) {
        res.status(500).json({
            message: `Error: ${ err }`
        });
    }
};