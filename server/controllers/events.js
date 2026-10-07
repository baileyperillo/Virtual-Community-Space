import { pool } from '../config/database.js'

const getEventsByGym = async (req, res) => {
    try {
        const gymId = req.params.gymId

        const results = await pool.query(
            'SELECT * FROM events WHERE gym_id = $1 ORDER BY date ASC',
            [gymId]
        )

        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({
            error: error.message
        })
    }
}

export default {
    getEventsByGym
}