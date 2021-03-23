import fs from 'fs'
import path from 'path';
import Files from '../models/file';

export const updateFile = async (req, res) => {
    const { id } = req.params;
    const { originalname, mimeType, size} = req.file;
    try {
        const file = await Files.findOne({ where: id });
        if (!file) return res.status(404).json({ message: 'File not found' });
        await Promise.all([
            Files.update({
                filename: originalname,
                extname: path.extname(req.file.path),
                pathname: file.pathname,
                mime_type: mimeType,
                size: size
            },
            { where: id }
            ),
            fs.rename( `${ req.file.path }`, `${ file.pathname }`, err => {
                if (err) {
                    return res.status(500).json({ message: `Error: ${ err }` });
                }
            })
        ]);
        return res.json({ message: 'File changed' });
    } catch (err) {
        res.status(500).json({
            message: `Error: ${ err }`
        });
    }
};