require('dotenv').config();

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.MONGO_URI);
const taskList = require('./models/taskList.model');
const task = require('./models/task.model');
connect.then(() => console.log('Connected!'));

const app = express();
app.listen(5000, () => {
    console.log('Server is running on localhost:5000...')
})
app.use(cors())
app.use(express.json())

app.get("/taskList", (req, res) => {
    taskList.find()
        .populate("tasks")
        .then(data => {
            data.forEach(list => {
                list.tasks.sort((a, b) => a.completed - b.completed);
            });
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
})

app.post("/taskList", (req, res) => {
    name = req.body.name !== ""
        ? req.body.name
        : "New Task List";

    const list = new taskList({
        name
    })

    list.save()
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})

app.put("/taskList/:id", (req, res) => {
    name = req.body.name
    if (!name) {
        return res.status(400).json({message: "Name is required"})
    }

    taskList.findByIdAndUpdate(req.params.id, {
        name
    })
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})

app.delete("/taskList/:id", (req, res) => {
    const listId = req.params.id;

    task.deleteMany({taskList: listId})
        .then(() => {
            taskList.findByIdAndDelete(listId)
                .then(data => res.status(200).json(data))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
})

app.post("/task", async (req, res) => {
    if (!req.body.taskList) {
        return res.status(400).json({message: "taskListId is required"})
    }

    const newTask = new task({
        name: req.body.name,
        taskList: req.body.taskList,
        completed: req.body.completed
    })

    const data = await newTask.save()
    taskList.findByIdAndUpdate(req.body.taskList, {
        $push: {tasks: data._id}
    })
        .then(() => res.status(200).json(data))
        .catch(err => console.log(err))
})

app.put("/task/:id", (req, res) => {
    let title = req.body.title
    if (!title) {
        return res.status(400).json({message: "Title is required"})
    }

    task.findByIdAndUpdate(req.params.id, {
        title
    })
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})

app.put("/task/:id/completed", (req, res) => {
    let completed = req.body.completed
    if (typeof completed === "undefined") {
        return res.status(400).json({message: "Completed is required"})
    }

    task.findByIdAndUpdate(req.params.id, {
        completed
    })
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})

app.delete("/task/:id", (req, res) => {
    task.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})