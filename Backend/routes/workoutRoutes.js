const express = require('express')
const {
    createWorkout,
    getAllWorkOuts,
    getOneWorkOut,
    deleteWorkOut,
    updateWorkOut
} = require('../controllers/workoutControllers')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

//require auth for all workouts routes
router.use(requireAuth)

//Get all workouts
router.get('/',getAllWorkOuts)

//Get a single workout
router.get('/:id',getOneWorkOut)

//Post a new  workout
router.post('/', createWorkout)

//Delete a single workout
router.delete('/:id',deleteWorkOut)

//Update single workout
router.patch('/:id',updateWorkOut)

module.exports = router