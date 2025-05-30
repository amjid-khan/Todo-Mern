import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Todo = mongoose.model("Todos", todoSchema)

export default Todo