import express from "express"
import Todo from "../model/todo.model.js"
const route = express.Router()

route.post("/insert", async (req, res) => {
    try {
        const { itemName, date } = req.body
        const obj = new Todo({
            itemName,
            date
        })
        const saveTodo = await obj.save()
        res.send({
            status: 1,
            msg: "Added successfully",
            data: saveTodo
        })
    } catch (error) {
        console.log("Error While data Added", error)
    }
})

route.get("/view", async (req, res) => {
    try {
        let view = await Todo.find()
        let obj = {
            status: 1,
            msg: "Your All Todos Here",
            data: view
        }
        res.send(obj)
    } catch (error) {
        console.log("Error while Fitchind Your data", error)
    }
})

route.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const del = await Todo.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: "deleted Successfully",
        data: del,
    }
    res.send(obj)
})

route.put("/update/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let { itemName, date } = req.body;
        let obj = await Todo.updateOne(
            { _id: id },
            {
                $set: {
                    itemName,
                    date
                }
            }
        )
        res.send({
            status: 1,
            msg: "Update successfully",
            data: obj
        })
    } catch (error) {
        console.log("Error while updating data", error)
    }
})

export default route