const { Schema, model } = require('mongoose');

const TaskListSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

module.exports = model('TaskList', TaskListSchema);
