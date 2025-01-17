import express, { response } from 'express'
import cors from "cors" //for fixing cors error
import "dotenv/config"
import "./database.js"
import { Todo } from './models.js'


const app = express()
const port = process.env.PORT || 5001
// const todos = []

app.use(express.json())// to convert body into JSON

app.use(
  cors({ origin: ["http://localhost:5173", "https://E-commerce-by-talha.surge.sh"] }),
);
// for get all todo
app.get('/api/v1/todos', async (req, res) => {

  try {
    const todos = await Todo.find({},
      { ip: 0, __v: 0, updatedAt: 0 } // projection (0 wale front per nhi aaye)
      // { todoContent: 1 } saruf todoContent show hoga frontend per aur kuxh show nhi hoga
      // { todoContent: 1, _id: 0 } // advance saruf id ma different keys use ho sagti hy like 0 and 1 
    ).sort({ _id: -1 })

    const message = !todos.lenght ? "todos empty" : "get all todos successfully!"
    res.send({ data: todos, message: message });

  } catch (error) {
    response.status(500).send("Internal server error")
  }
})

// create new todo
app.post('/api/v1/todo', async (req, res) => {
  try {
    const obj = {
      todoItem: req.body.todo,
      ip: req.ip,
      testingDate: new Date()
    }
    const result = await Todo.create(obj)
    // todos.push(obj)

    // todos.push(obj)
    res.send({ data: result, message: "todo added successfully!" })
  } catch (error) {
    res.status(500).send("Internal server error")
  }
})

// for update or edit todo api
app.patch('/api/v1/todo/:id', async (req, res) => {
  const id = req.params.id

  const result = await Todo.findByIdAndUpdate(id,
    {todoItem : req.body.todoItem}
  )
  if (result) {
    res.status(201).send({
      message: "todo updated successfully",
      data: result
    })
  }
  else {
    res.status(200).send({ message: "todo not found", data: null })
  }
})

// for delete todo api
app.delete('/api/v1/todo/:id',async (req, res) => {
  const id = req.params.id
 
  const result = await Todo.findByIdAndDelete(id)
  if (result) {
    res.status(201).send({
      message: "todo deleted successfully",
    })
  }
  else {
    res.status(200).send({ message: "todo not found", data: null })
  }

})



app.use((req, res) => {
  res.status(404).send('no route found!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})