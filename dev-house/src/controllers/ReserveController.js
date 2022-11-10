import Reserve from '../models/Reserve';
import House from '../models/House';

class ReserveController {
    async index(req, res) {
        const { user_id } = req.headers;
        const reserves = await Reserve.find({ user: user_id }).populate(
            'house'
        );

        return res.json(reserves);
    }

    async destroy(req, res) {
        const { user_id } = req.headers;
        const { reserve_id } = req.body;

        const reserve = await Reserve.findById(reserve_id);
        if (reserve.user !== user_id)
            return res
                .status(401)
                .json({ message: 'This reserve is not yours' });
        await Reserve.deleteOne({ _id: reserve_id });
        return res.send();
    }

    async store(req, res) {
        const { user_id } = req.headers;
        const { id } = req.params;
        const { date } = req.body;

        const house = await House.findById(id);
        if (!house) {
            return res.status(404).json({
                message: 'House not found',
            });
        }

        if (!house.status) {
            return res.status(400).json({
                message: 'House is not available',
            });
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: id,
            date,
        });

        await reserve.populate('house');
        await reserve.populate('user');

        return res.json(reserve);
    }
}

export default new ReserveController();
