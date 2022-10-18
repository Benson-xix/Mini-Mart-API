const { handleCreateCategory, handleGetAllCategories, handleEditCategory, handleDeleteCategory } = require ('../controllers/categoryController')

const router = require('express').Router()

router.post('/', handleCreateCategory )
router.get('/', handleGetAllCategories)
router.patch('/:id', handleEditCategory)
router.delete('/:id', handleDeleteCategory)
router.put('/:id', handleEditCategory)

module.exports = router