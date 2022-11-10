import * as Yup from 'yup';

import User from '../models/User';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({
            email,
        });

        return res.json(user);
    }
}

export default new SessionController();
