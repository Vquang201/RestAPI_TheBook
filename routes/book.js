const { getALLBook, getABook } = require('../controllers/bookController')
const bookController = require('../controllers/bookController')

const router = require('express').Router()


//ADD A BOOK
router.post("/", bookController.addABook)

//ADD ALL BOOK
router.get('/', bookController.getALLBook)

//ADD A BOOK
router.get('/:id', bookController.getABook)

//UPDATE A BOOK
router.put('/:id', bookController.updateBook)

// DELETE A BOOL
router.delete('/:id', bookController.deleteABook)

module.exports = router