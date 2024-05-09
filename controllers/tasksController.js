const { prisma } = require("../db/prisma");

const getMany = async () => {
    return prisma.task.findMany();
}

const getOne = async (id) => {
    return prisma.task.findFirst({
        where: {
            id
        }
    });
}

const insertTask = async (name, description) => {
    await prisma.task.create({
        data: {
            name,
            description
        }
    })
}

const updateTask = async (id, task) => {
    await prisma.task.update({
       where: {
           id
       },
       data: {
           name: task.name,
           description: task.description,
           isDone: !task.isDone ? undefined : task.isDone
       }
    });
}

const deleteTask = async (id) => {
    await prisma.task.delete({
        where: {
            id
        }
    });
}

module.exports = {
    getMany,
    getOne,
    insertTask,
    updateTask,
    deleteTask
}