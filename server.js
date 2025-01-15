import express, { response } from 'express'
import cors from "cors" //for fixing cors error
import "./database.js"
const app = express()
const port = process.env.PORT || 5001
const todos = []

app.use(express.json())// to convert body into JSON

app.use(
  cors({ origin: ["http://localhost:5173", "https://E-commerce-by-talha.surge.sh"] }),
);
// for get all todo
app.get('/api/v1/todos', (req, res) => {
  const message = !todos.lenght ? "todos empty" : "get all todos successfully!"

  res.send({ data: todos, message: message })
})

// create new todo
app.post('/api/v1/todo', (req, res) => {
  const obj = {
    todoItem: req.body.todo,
    id: String(new Date().getTime())
  }
  todos.push(obj)
  res.send({ data: obj , message: "todo added successfully!" })
})

// for update or edit todo api
app.patch('/api/v1/todo/:id', (req, res) => {
  const id = req.params.id
  let isUpdated = false

  for (let i = 0; i < todos.length; i++) {

    if (todos[i].id === id) {
      todos[i].todoItem = req.body.todoItem
      isUpdated = true
      break;
    }
  }
  if (isUpdated) {
    res.status(201).send({
      message: "todo updated successfully",
      data: {
        todoItem: req.body.todoItem,
        id: id
      }
    })
  }
  else {
    res.status(200).send({ message: "todo not found", data: null })
  }
})

// for delete todo api
app.delete('/api/v1/todo/:id', (req, res) => {
  const id = req.params.id
  let isDeleted = false

  for (let i = 0; i < todos.length; i++) {

    if (todos[i].id === id) {

      todos.splice(i, 1);
      isDeleted = true
      break;
    }
  }
  if (isDeleted) {
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