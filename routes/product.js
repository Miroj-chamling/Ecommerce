const express = require('express')
const router = express.Router()


const { create, productById, read, remove, update, list, listRelated, listCategories } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');



router.param("userId", userById);
router.param("productId", productById);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/allproducts', list);
router.get('/allproducts/related/:productId', listRelated);
router.get('/allproducts/categories', listCategories);

module.exports = router;