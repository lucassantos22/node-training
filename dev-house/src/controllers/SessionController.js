import User from "../models/User";

class SessionController {
    async store(req, res) {
        const { email } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' })
        const user = await User.create({
            email
        })

        res.json(user)
    }
}

export default new SessionController;