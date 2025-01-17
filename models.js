import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        todoItem: { type: String, required: true },
        ip: { type: String }
        // owner/todoAddBy: { type: Schema.ObjectId, ref: "User" },
    },
    { timestamps: true },
);


export const Todo = model("Todo", todoSchema);