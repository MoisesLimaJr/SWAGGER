const books = []; // Simples armazenamento em memória para os livros

module.exports = {
    getBooks: (res) => {
        res.json(books);
    },

    addBook: (req, res) => {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'Título e autor são obrigatórios' });
        }
        const newBook = { id: books.length + 1, title, author };
        books.push(newBook);
        res.status(201).json(newBook);
    },

    updateBook: (req, res, id) => {
        const bookIndex = books.findIndex(book => book.id == id);
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        const { title, author } = req.body;
        books[bookIndex] = { id: parseInt(id), title, author };
        res.json(books[bookIndex]);
    },

    deleteBook: (res, id) => {
        const bookIndex = books.findIndex(book => book.id == id);
        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        books.splice(bookIndex, 1);
        res.status(204).send();
    }
};
