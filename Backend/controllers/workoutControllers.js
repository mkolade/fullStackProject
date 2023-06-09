const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getAllWorkOuts = async (req,res) =>{
    const  user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getOneWorkOut = async (req,res) =>{
    const {id} = req.params
    //The function below simply means if the id is not the same type as the mongoDB pre-defined one, throw an error.Also, we use return to stop the execution of the code at that point
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
       return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}

//create a workout
const createWorkout = async (req,res) =>{
    
    const{title,load,reps} = req.body;

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length >0){
        return res.status(400).json({error: 'Please fill in all required fields',emptyFields})
    }

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

//update a single workout
const updateWorkOut = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body})
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}

//delete a single workout
const deleteWorkOut = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getAllWorkOuts,
    getOneWorkOut,
    deleteWorkOut,
    updateWorkOut
}