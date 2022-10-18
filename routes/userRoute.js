const { handleCreateUser, handleUserLogin, handleGetAllUser, handleGetOneUser } = require('../controllers/userController')

const router = require('express').Router()

router.post("/auth/register", handleCreateUser)
router.post("/auth/login", handleUserLogin)
router.get("/", handleGetAllUser)
router.get("/:id", handleGetOneUser)

router.get ("/", (req, res) => res.send({ message: "User ENDPOINT"}))

module.exports = router 