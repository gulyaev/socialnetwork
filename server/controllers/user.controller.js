const db = require('../db')

class UserController {
    async createUser(req, res) {
        try {
            const { email, password } = req.body
            const user = await db.query(`insert into person (email, password) values ($1, $2) RETURNING *`, [email, password])
            res.status(200).json(user.rows[0])
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(`select * from person`)
            res.status(200).json(users.rows)
        } catch (error) {
            console.log(error)
        }
    }

    async getOneUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`SELECT * FROM person where id=$1`, [id])
            res.json(user.rows[0])
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(req, res) {
        try {
            const { id, email, password } = req.body
            const user = await db.query(`update person set email=$2, password=$3 where id=$1 RETURNING *`, [id, email, password])
            res.json(user.rows[0])
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM person where id=$1`, [id])
            res.status(200).json({ message: "User was deleted" })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()