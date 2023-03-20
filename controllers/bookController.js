const { Book, Author } = require('../model/model')

const bookController = {

    //GET A BOOk
    addABook: async (req, res) => {
        try {
            const newBook = new Book(req.body)
            const saveBook = await newBook.save()
            // lưu book vào db
            if (req.body.author) { // nếu cuốn sách này có tác giả
                // const author = Author.find({ _id: res.body.Author })
                // find author có id match với res.body.Author
                const author = Author.findById(req.body.author)
                await author.updateOne({ $push: { books: saveBook._id } });
            }
            res.status(200).json(saveBook)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // GET ALL BOOKS
    getALLBook: async (req, res) => {
        try {
            const allBook = await Book.find()
            res.status(200).json(allBook)

        } catch (error) {
            res.status(500).json(error)
        }

    },

    // GET A Book
    getABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author')
            res.status(200).json(book)

        } catch (error) {
            res.status(500).json(error)
        }
    },

    // UPDATE A BOOK 
    updateBook: async (req, res) => {
        try {
            const book = Book.findById(req.params.id)
            await book.updateOne({ $set: req.body })
            res.status(200).json('Updated Successfully !')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // DELETE A BOOk
    //Muốn xóa 1 quyển sách ở db Book thì cũng phải xóa book ở Author (Vì chúng liên kết với nhau)
    deleteABook: async (req, res) => {
        try {
            await Author.updateMany({ books: req.params.id }, { $pull: { books: req.params.id } })
            // lúc đầu push sách vào arr của Author , giờ pull sách đó ra
            // books ở trong lênh pull là field in db
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json('DELETE SUCCESSFULLY !')

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = bookController