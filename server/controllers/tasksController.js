import TaskMessage from '../models/taskMessage.js';
import mongoose from 'mongoose';

export const getTasks = async (req, res) => {
    const task = req.body;
    
    try {
        const taskMessages = await TaskMessage.find({...task, creator: req.userId});
        res.status(200).json(taskMessages);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const createTasks = async (req, res) => {

    const task = req.body;

    const newTask = new TaskMessage({...task, creator: req.userId, createdAt: new Date().toISOString()});

    try {

        await newTask.save();

        res.status(201).json(newTask);

    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updateTasks = async (req, res) => {
    const { id: _id } = req.params;

    const task = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No task with that id");

    const updatedTask = await TaskMessage.findByIdAndUpdate(_id, {...task, _id}, {new: true});

    res.json(updatedTask);
}

export const deleteTasks = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No task with that id");

    await TaskMessage.findByIdAndRemove(id);

    res.json({message: "Task deleted."});
}