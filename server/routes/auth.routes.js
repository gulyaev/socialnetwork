const Router = require('express')
const router = new Router()
const db = require('../db')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const config = require("config");
const jwt = require("jsonwebtoken");

router.post('/register',
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Password should be 3 and 12').isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ message: "Uncorrect email or password", errors })
            } else {
                const { email, password } = req.body
                const candidate = await db.query(`select * from person where email=$1`, [email])
                if (candidate.rows.length !== 0) {
                    res.json({ message: "Allready exists" })
                } else {
                    const hashedpassword = await bcrypt.hash(password, 15)
                    const newUser = await db.query(`insert into person (email, password) values ($1, $2) RETURNING *`, [email, hashedpassword])
                    res.status(200).json({ message: "User was created" })
                }
            }
        } catch (error) {
            console.log(error);
            res.send({ message: "Server error" })
        }
    })


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await db.query(`select * from person where email=$1`, [email])
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else {
            const isPassValid = bcrypt.compareSync(password, user.rows[0].password)
            if (!isPassValid) {
                return res.status(400).json({ message: 'Invalid password' })
            }
            const token = jwt.sign({ id: user.rows[0].id }, config.get("secretKey"), { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: user.rows[0].id,
                    email: user.rows[0].email
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send({ message: "Server error" })
    }
})

module.exports = router
