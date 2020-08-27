import Users from '../models/users';

export const logout = async (req, res) => {

    const { id } = req.body;

    try {
        await Users.update({ refreshToken: null }, {
            where: {
                id: id
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            message: `Ошибка сервера: ${ err }`
        });
    }
};