import User from '../models/User';

class UserController {
    async store(req, res) {
        const { body } = req;
        const userExists = await User.findOne({
            where: { email: body.email },
        });
        if (userExists) {
            return res.json({ error: 'E-mail already exists' }).status(401);
        }
        const { name, email, id } = await User.create(body);
        return res.json({
            id,
            name,
            email,
        });
    }
}

export default new UserController();
