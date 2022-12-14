import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { body } = req;
        const userExists = await User.findOne({
            where: { email: body.email },
        });
        if (userExists) {
            return res.json({ error: 'E-mail already exists' }).status(400);
        }
        const { name, email, id } = await User.create(body);
        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Incorrect data' });
        }

        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);
        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.json({ error: 'E-mail already exists' }).status(400);
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name, email });
    }
}

export default new UserController();
