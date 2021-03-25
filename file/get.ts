import { Request, Response } from 'express';
import Files from '../models/file';
// @ts-ignore
import { calculateLimitAndOffset, paginate } from 'paginate-info';

export const getFiles = async (req: Request, res: Response) => {
    try {
        const { query: { page, list_size } } = req;
        const { limit, offset } = calculateLimitAndOffset(page, list_size);
        const { rows, count } = await Files.findAndCountAll({ limit, offset});
        const meta = paginate(page, count, rows, list_size);
        return res.json({ rows, meta });
    } catch (err) {
        res.status(500).json({ message: `Error: ${ err }` });
    }
};

export const getFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const file = await Files.findOne({ where: `${ id }` });
        return res.json({ data: file });
    } catch (err) {
        res.status(500).json({ message: `Error: ${ err }` });
    }
};