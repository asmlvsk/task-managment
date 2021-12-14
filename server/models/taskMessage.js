import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        min: [3, 'Title has to be at least 3 symbols long.'],
        max: [30, 'Title has to be 30 symbols long.'],
        required: [true, 'You have to write your title']
    },
    description: {
        type: String,
        min: [3, 'Description has to be at least 3 symbols long.'],
        required: [true, 'You have to write your description']
    },
    isDone: Boolean,
    priority: ['High', 'Medium', 'Low'],
    dueDate: {
        type: Date,
        default: Date.now()
    },
    name: String,
    creator: String,
    createdAt: Date
});

const TaskMessage = mongoose.model('TaskMessage', taskSchema);

export default TaskMessage;