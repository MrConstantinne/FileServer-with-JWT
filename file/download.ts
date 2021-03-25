import { Request, Response } from 'express';
import Files from '../models/file';
import fs from 'fs';

export const downloadFile = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const file = await Files.findOne({ where: id });
        const filePath = file.pathname;
        fs.access(filePath, fs.constants.R_OK, err => {
            if(err){
                res.status(404).json({ message: `${ err }` });
            }
            else{
                res.status(201);
                fs.createReadStream(filePath).pipe(res);
            }
        });
    } catch (err) {
        res.status(500).json({ message: `Error: ${ err }` });
    }
};