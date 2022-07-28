const Router = require("express");
const router = new Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");
const fileService = require("../services/fileService");

router.post(
  "/register",
  [
    check("email", "Email is not correct").isEmail(),
    check("nikname", "Nikname should be 3 and 12").isLength({
      min: 3,
      max: 12,
    }),
    check("password", "Password should be 3 and 12").isLength({
      min: 3,
      max: 12,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: "Uncorrect email, nikname or password", errors });
      } else {
        const { email, nikname, password } = req.body;
        const candidate = await db.query(
          `select * from person where email=$1 or nikname=$2`,
          [email, nikname]
        );
        if (candidate.rows.length !== 0) {
          res.json({ message: "Allready exists" });
        } else {
          const hashedpassword = await bcrypt.hash(password, 15);
          const newUser = await db.query(
            `insert into person (email, nikname, password) values ($1, $2, $3) RETURNING *`,
            [email, nikname, hashedpassword]
          );
          await fileService.createDir(newUser.rows[0]);
          //res.status(200).json({ message: "User was created" })
          res.status(200).json(newUser.rows[0]);
        }
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.query(`select * from person where email=$1`, [email]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isPassValid = bcrypt.compareSync(password, user.rows[0].password);
      if (!isPassValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user.rows[0].id }, config.get("secretKey"), {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          nikname: user.rows[0].nikname,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Server error" });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.query(`select * from person where id=$1`, [userId]);

    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      //res.status(200).json(user.rows[0].id)
      const token = jwt.sign({ id: user.rows[0].id }, config.get("secretKey"), {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email,
          nikname: user.rows[0].nikname,
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

module.exports = router;
