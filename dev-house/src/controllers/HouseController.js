import House from "../models/House"

class HouseController {
    async store(req, res) {
        console.log(req.body)
        console.log(req.file)
        res.json({ OK: true })
    }
}

export default new HouseController