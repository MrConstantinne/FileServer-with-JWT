import fs from 'fs'
import path from 'path';

import Files from '../models/file';

export const updateFile = async (req, res) => {

    const { id } = req.params;
    const { originalname, mimeType, size} = req.file;

    try {
        const file = await Files.findOne({
            where: { id: id }
        });

        if (!file) return res.status(404).json({
            message: 'Файл не найден'
        });

        await Promise.all([
            Files.update({
                filename: originalname,
                extname: path.extname(req.file.path),
                pathname: file.pathname,
                mime_type: mimeType,
                size: size
            },
            { where: { id: id } }
            ),
            fs.rename( `${ req.file.path }`, `${ file.pathname }`, err => {
                if (err) {
                    return res.status(500).json({
                        message: `Ошибка при обновлении файла: ${ err }`
                    });
                }
            })
        ]);

        return res.status(200).json({
            message: 'Файл изменен',
        });

    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
};