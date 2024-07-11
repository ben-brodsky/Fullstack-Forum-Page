import express from 'express'

import {getPosts, getPostFromID, createPost} from "./database.js"

const app = express()
const port = 8080
app.use(express.json())

app.get("/posts", async (req, res) =>
{
    const notes = await getPosts()
    res.send(notes)
})

app.get("/posts/:id", async (req, res) =>
{
    const id = req.params.id
    const notes = await getPostFromID(id)
    res.send(notes)
})

app.post("/posts", async (req, res) => 
{
    const {username, title, contents} = req.body
    const result = await createPost(username, title, contents)
    res.status(201).send(result)
})

app.use((err, req, res, next) =>
{
    console.error(err.stack)
    res.status(500).send("Something Broke")
})

app.listen(port, () =>
{
    console.log("Server is running on port", port)
})