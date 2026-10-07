import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import GymsController from '../controllers/gyms.js'
import locData from '../data/gyms.js'
import EventsController from '../controllers/events.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Get all gyms from the database
router.get('/', GymsController.getGyms)

// router.get('/', (req, res) => {
//   res.status(200).json(locData)
// })
router.get('/:gymId/events', EventsController.getEventsByGym)

router.get('/:gymId', (req, res) => {
  const gym = locData.find(g => g.id === parseInt(req.params.gymId))
  if (!gym) {
    return res.status(404).json({ error: 'Gym not found' })
  }
  res.status(200).sendFile(path.resolve(__dirname, '../public/gym.html'))
})

export default router
