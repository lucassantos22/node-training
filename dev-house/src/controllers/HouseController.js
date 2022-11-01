import House from "../models/House"

class HouseController {
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
}

export default new HouseController