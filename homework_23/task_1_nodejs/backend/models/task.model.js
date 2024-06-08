const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    title: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    taskList: {
        type: Schema.Types.ObjectId,
        ref: 'TaskList',
        required: true
    },
})

module.exports = model('Task', TaskSchema);
