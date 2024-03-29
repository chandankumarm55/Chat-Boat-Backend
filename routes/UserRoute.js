const { register, login, GenerateContent } = require("../controllers/UserController")
const router = require('express').Router();
router.post("/register", register)
router.post("/login", login)
router.post("/ask", GenerateContent)

module.exports = router;