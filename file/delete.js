import path from 'path';
import { remove } from 'fs-extra';

import Files from '../models/file'

export const deleteFile = async (req, res) => {
    const { id } = req.params;
    try {
        const file = await Files.findOne({
            where: { id: id }
        });
        if (file) {
            await Promise.all([
                Files.destroy({
                    where: { id: id }
                }),
                remove(path.resolve(file.pathname))
            ]);
            return res.status(200).json({
                message: 'Файл удален'
            });
        } else {
            return res.status(404).json({
                message: 'Файл не найден'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
};