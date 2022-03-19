const express = require('express')
const bcrypt = require('bcrypt')

const router = express()
const db = require("../db/db.js")

router.get('/getAll', (req, res) => {
    db.query("select username from users", (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.post("/signup", (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    let user = {
        "username": req.body.username,
        "passwordHash": passwordHash
    }
    db.query("insert into users set ?", user, (err, result) => {
        if (err) throw err;
        else{
            res.send(true)
        }
    })
})

router.post("/login", (req, res) => {
    console.log(req.body)
    db.query("select * from users where username = ?", [req.body.username], (err, result) => {
        if(err) throw err
        else {
            console.log(result)
            if (result.length === 0)
                res.send(false)
            else if(bcrypt.compareSync(req.body.password, result[0].passwordHash))
                res.send(true)
            else
                res.send(false)
        }
    })
})

module.exports = router