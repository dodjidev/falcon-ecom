const router = require('express').Router()
const productsController = require('../controllers/product.ctrl');

router.get('/' , productsController.list)
router.get('/:id', productsController.show)
router.post('/' , productsController.store)
router.post('/delete/:id' , productsController.delete)
router.post('/:id' , productsController.update)


module.exports = router