const express = require("express");
const router = express.Router();

let tasks = [
    {
        "id": 1,
        "name": "Comprar leite",
        "description": "Ir no mercado da esquina e comprar leite",
        "isDone": false
    }
];

// Get All Tasks
router.get("/tasks", (req, res) => {
    return res.status(200).json(tasks);
});

// Create Task
router.post("/tasks", (req, res) => {
    const {name, description} = req.body;
    const task = {id: tasks.length + 1, name, description, isDone: false};
    tasks.push(task);
    return res.status(201).json({message: "Task was created", status: 201, task});
})

//Update Task
router.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);
    const {name, description, isDone} = req.body;
    const task = tasks.find((obj) => obj.id === id);

    if(!task) return res.status(400).json({message: `Task ${id} are not created`, status:400});

    task.name = name;
    task.description = description;
    task.isDone = isDone;

    return res.status(200).json({message: "Task was updated", status: 200, task})

})

// Delete Task
router.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({message: `Id ${id} informed is not valid`, status:400});
    const task =  tasks.find((obj) => obj.id === id);
    if(!task) return res.status(400).json({message: `Task ${id} are not created`, status:400});
    tasks = tasks.filter((obj) => obj.id !== id);

    return res.status(200).json({message: `Task ${id} was deleted with success`, status:200});
})


module.exports = { router }
