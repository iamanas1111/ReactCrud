import express from "express";
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:'ReactCrud'
})

app.get('/',(req,res)=>{
    const sql = "SELECT * from student" ;
    db.query(sql,(error,result)=>{
        if(error) return  res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (name, email) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, values, (error, result) => {
        if (error) {
            return res.json(error);
        }
        return res.json(result);
    });
});

app.get('/read/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * from student WHERE id = ?" ;
    db.query(sql,[id],(error,result)=>{
        if(error) return  res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.put('/update/:id', (req, res) => {
    const id=req.params.id;
    const sql = "UPDATE  student SET `name`=?, `email`=? WHERE id=?";
    
    db.query(sql, [req.body.name, req.body.email,id], (error, result) => {
        if (error) {
            return res.json(error);
        }
        return res.json(result);
    });
});

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE from student WHERE id = ?" ;
    db.query(sql,[id],(error,result)=>{
        if(error) return  res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("Listen on 8081");
})