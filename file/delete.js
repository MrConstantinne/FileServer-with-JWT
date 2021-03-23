import path from 'path';
import { remove } from 'fs-extra';

import Files from '../models/file';

export const deleteFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await Files.findOne({ where: id });
        if (file) {
            await Promise.all([
                Files.destroy({ where: id  }),
                remove(path.resolve(file.pathname))
            ]);
            return res.json({ message: 'File deleted' });
        } else {
            return res.status(404).json({ message: 'File not found' });
        }
    } catch (err) {
        res.status(500).json({
            message: `Error: ${ err }`
        });
    }
};