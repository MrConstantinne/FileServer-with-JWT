import path from 'path';

import Files from '../models/file';

export const createFile = async (req, res) => {

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
            message: 'Файл добавлен',
            file
        });

    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
};