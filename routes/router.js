const express = require("express");
const tasksController = require("../controllers/tasksController");

const router = express.Router();

// Get All Tasks
router.get("/tasks", async (req, res) => {
    return res.status(200).json(await tasksController.getMany());
});

// // Create Task
router.post("/tasks", async (req, res) => {
    const {name, description} = req.body;
    const task = await tasksController.insertTask(name,description);
    return res.status(201).json({message: "Task was created", status: 201, task});
})

// //Update Task
router.put("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    const {name, description, isDone} = req.body;
    const task = await tasksController.getOne(id);

    if(!task) return res.status(400).json({message: `Task ${id} are not created`, status:400});

    const data = {
        name,
        description,
        isDone
    };

    await tasksController.updateTask(id, data);

    return res.status(200).json({message: "Task was updated", status: 200, task})

})

// // Delete Task
router.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({message: `Id ${id} informed is not valid`, status:400});

    const task = await tasksController.getOne(id);
    if(!task) return res.status(400).json({message: `Task ${id} are not created`, status:400});
    
    await tasksController.deleteTask(id);

    return res.status(200).json({message: `Task ${id} was deleted with success`, status:200});
})


module.exports = { router }
