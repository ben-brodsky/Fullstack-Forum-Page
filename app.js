import express from 'express'
import {getPosts, getPostFromID, createPost, getCommentsUnderPost, createComment} from "./database.js"

const app = express()
const port = 8080
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set("view engine", "ejs")
app.set("views", "views")


app.get("/posts", async (req, res) => {
  
    const posts = await getPosts()
    res.render("index.ejs", {posts: posts})
})

app.get("/posts/:id", async (req, res) =>
{
    const id = req.params.id
    const post = await getPostFromID(id)
    const comments = await getCommentsUnderPost(id)
    res.render("post.ejs", {post: post, comments: comments})
})

app.post("/posts", async (req, res) => 
{
    const {username, title, contents} = req.body
    const result = await createPost(username, title, contents)
    res.status(201).send(result)
})

app.post("/posts/:id", async (req, res) => {

    const postID = req.params.id
    const contents = req.body.commentContents

    if (req.body.commentContents != null)
    {
        const result = await createComment(contents, postID)
        const post = await getPostFromID(postID)
        const comments = await getCommentsUnderPost(postID)
        
        return res.redirect("/posts/" + postID)
    }
})

app.post("/posts/:id/:cid", async (req, res) => {

    const postID = req.params.id
    const parentID = req.params.cid
    const contents = req.body.commentContents

    if (req.body.commentContents != null)
    {
        const result = await createComment(contents, postID, parentID)
        const post = await getPostFromID(postID)
        const comments = await getCommentsUnderPost(postID)
        
        return res.redirect("/posts/" + postID)
    }
})

app.use((err, req, res, next) =>
{
    console.error(err.stack)
    res.status(500).send("Something Broke")
})

app.use(express.static("public"))

app.listen(port, () =>
{
    console.log("Server is running on port", port)
})