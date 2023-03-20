const authorController = require('../controllers/authorController')
const router = require('express').Router()

// ADD Author
router.post("/", authorController.addAuthor)

// GET AUTHORS
router.get("/", authorController.getAuthors)

// GET AN AUTHOR
router.get('/:id', authorController.getAnAuthor)

// UPDATE AN AUTHOR
router.put('/:id', authorController.updateAuthor)

//DELETE AN AUTHOR
router.delete('/:id', authorController.deleteAnAuthor)

module.exports = router