import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {

    async store(req, res) {
        const { user_id } = req.headers;
        const { id } = req.params;
        const { date } = req.body;

        const house = await House.findById(id)
        if (!house) return res.status(404).json({
            message: 'House not found'
        })

        if (!house.status) return res.status(400).json({
            message: 'House is not available'
        })

        const reserve = await Reserve.create({
            user: user_id,
            house: id,
            date
        })

        await reserve.populate('house')
        await reserve.populate('user')

        res.json(reserve)
    }

}

export default new ReserveController