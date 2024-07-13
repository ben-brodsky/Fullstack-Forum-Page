import mysql from 'mysql2'
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10
}).promise()

export async function getPosts()
{
    const [result] = await pool.query("SELECT * FROM posts")
    return result
}

export async function getPostFromID(id)
{
    const [result] = await pool.query("SELECT * FROM posts WHERE ID = ?", [id])
    return result[0]
}

export async function getCommentsUnderPost(id)
{
    const [result] = await pool.query("SELECT * FROM comments WHERE ID = ?", [id])
    return result
}

export async function createPost(username, title, contents)
{
    const [result] = await pool.query("INSERT INTO posts (Username, Title, Contents) VALUES (?, ?, ?)", [username, title, contents])
    const id = result.insertId
    return getPostFromID(id)
}