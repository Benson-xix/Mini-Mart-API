const { handleRegistration, handleLogin } = require('../controllers/adminController')

const router = require ('express').Router()

router.get('/', (req, res) => {
    res.send("<h3> Admin Route </h3>")
})

router.post('/register', handleRegistration )
router.post('/login', handleLogin )


module.exports = router