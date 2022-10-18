
const { handleCreateProducts, handleGetAllProducts, handleDeleteProduct, handleEditProduct } = require('../controllers/ProductController')
const { AdminAuthenticate } = require('../middlewares/AdminAuth')

const router = require('express').Router()



router.post('/create', AdminAuthenticate, handleCreateProducts)

router.get('/', handleGetAllProducts)
router.delete('/:id', AdminAuthenticate, handleDeleteProduct)

router.put('/:id', AdminAuthenticate, handleEditProduct)
router.patch('/:id', AdminAuthenticate, handleEditProduct)







module.exports = router
// express-fileupload