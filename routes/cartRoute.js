const { handleAddToCart, handleDeleteCartItem, handleGetCartItem, handleGetAllCartItem, handleDecrementItem } = require('../controllers/cartController')
const { UserAuthenticate } = require('../middlewares/UserAuth')

const router = require('express').Router()


router.get('/:id',  handleGetCartItem)
router.get('/',  handleGetAllCartItem)
router.post('/add', UserAuthenticate, handleAddToCart)
router.delete('/:id', UserAuthenticate, handleDeleteCartItem)
router.put('/:id', UserAuthenticate,  handleDecrementItem)

//router.get ("/", (req, res) => res.send({ message: "Cart ENDPOINT"}))

module.exports = router 