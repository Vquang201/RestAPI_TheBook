const { Book, Author } = require("../model/model")

const authorController = {
    //ADD Author 
    addAuthor: async (req, res) => {
        try {
            const newAuthor = new Author(req.body)
            const saveAuthor = await newAuthor.save()
            res.status(200).json(saveAuthor)
        } catch (error) {
            res.status(500).json(error)
            // Http status code
        }
    },

    // GET ALL AUTHORS
    getAuthors: async (req, res) => {
        const authors = await Author.find()
        res.status(200).json(authors)
        try {

        } catch (error) {
            res.status(500).json(error)
        }
    },

    getAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate('books')
            //populate lấy thêm thông tin cuốn sách ở trong tác giả
            // NẾU kh chỉ xuất ID tác giả
            res.status(200).json(author)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // UPDATE AN AUTHOR
    updateAuthor: async (req, res) => {
        try {
            const author = Author.findById(req.params.id)
            await author.updateOne({ $set: req.body })
            res.status(200).json('Updated Successfully !')
        } catch (error) {
            res.status(500).json(error)

        }
    },

    //DELETE AN AUTHOR 
    deleteAnAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id }, { author: null })
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json('DELETE SUCCESSFULLY !')
        } catch (error) {
            res.status(500).json(error)
        }
    }


}

module.exports = authorController