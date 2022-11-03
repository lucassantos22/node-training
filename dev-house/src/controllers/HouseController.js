import House from "../models/House"

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
        const house = await House.updateOne({ _id: id }, {
            thumbnail: filename,
            description,
            price,
            location,
            status,
            user: user_id
        })
        res.json(house)
    }

    async list(req, res) {
        const houses = await House.find({})
        res.json(houses)
    }
}

export default new HouseController