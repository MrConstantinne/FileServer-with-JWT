import Files from '../models/file';
import fs from 'fs'

export const downloadFile = async (req, res) => {

    const { id } = req.params;

    try {

        const file = await Files.findOne({
            where: { id: id }
        });

        const filePath = file.pathname;

        fs.access(filePath, fs.constants.R_OK, err => {
            if(err){
                res.status(404).json({
                    message: `${ err }`
                });
            }
            else{
                res.status(200);
                fs.createReadStream(filePath).pipe(res);
            }
        });

    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
}