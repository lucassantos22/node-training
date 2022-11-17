import User from '../models/User';

class UserController {
    async store(req, res) {
        const { name, email, id } = await User.create(req.body);
        res.json({
            id,
            name,
            email,
        });
    }
}

export default new UserController();
