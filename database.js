import mysql from 'mysql2';

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Tronh3ad1!",
    database:"test_database",
    connectionLimit: 10
}).promise()

const result = await pool.query("SELECT * FROM posts")
console.log(result)