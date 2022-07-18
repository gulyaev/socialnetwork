const db = require('../db')

class UserController {
    async getUsers(req, res) {
        try {
            const currentPage = parseInt(req.query.currentpage);
            const perPage = parseInt(req.query.perpage);

            const startIndex = (currentPage - 1) * perPage;
            const endIndex = currentPage * perPage;

            const users = await db.query(`select * from person`)

            const results = {}

            if (endIndex < users.rows.length) {
                results.next = {
                    currentPage: currentPage + 1,
                    perPage: perPage
                }
            }

            if (startIndex > 0) {
                results.previous = {
                    currentPage: currentPage - 1,
                    perPage: perPage
                }
            }
            results.totalCount = users.rows.length;

            //вывод пользователей в пределах заданного размера порции:
            results.results = users.rows.slice(startIndex, endIndex);

            if (!users) throw Error('No items');

            if (currentPage && perPage) {
                res.status(200).json(results);
            } else {
                res.status(200).json(users.rows);
            }


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