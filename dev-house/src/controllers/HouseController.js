import House from "../models/House"
import User from "../models/User"

class HouseController {

    async index(req, res) {
        const { status } = req.query
        const houses = await House.find({ status })
        res.json(houses)
    }

    async store(req, res) {
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        const house = await House.create({
            thumbnail: filename,
            description,
            price,
            location,
            status,
            user: user_id
        })
        res.status(201).json(house)
    }

    async update(req, res) {
        const { filename } = req.file
        const { id } = req.params
        const { user_id } = req.headers
        const { description, price, location, status } = req.body

        const user = await User.findById(user_id)
        const house = await House.findById(id)

        if (!user) return res.status(401).json({ message: 'Unauthorized' })

        if (String(user._id) !== String(house.user)){
            return res.status(401).json({ message: 'Unauthorized' })
        }

        await House.updateOne({ _id: id }, {
            thumbnail: filename,
            description,
            price,
            location,
            status,
            user: user_id
        })
        res.json({ updated: true })
    }

    async destroy(req, res) {
        const { id } = req.params
        const { user_id } = req.headers

        const user = await User.findById(user_id)
        const house = await House.findById(id)

        if (!user) return res.status(401).json({ message: 'Unauthorized' })

        if (String(user._id) !== String(house.user)){
            return res.status(401).json({ message: 'Unauthorized' })
        }
        await House.deleteOne({ _id: id })
        res.json({ destroyed: true })
    }
}

export default new HouseController