// ALT+SHIFT+F para formatar
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const booksController = require('./booksController');

// Configuração inicial
// npm install cors
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware para JSON
app.use(cors()); // Habilita CORS

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.get('/books', (req, res) => {
    booksController.getBooks(res);
});

app.post('/books', (req, res) => {
    booksController.addBook(req, res);
});

app.put('/books/:id', (req, res) => {
    booksController.updateBook(req, res, req.params.id);
});

app.delete('/books/:id', (req, res) => {
    booksController.deleteBook(res, req.params.id);
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} com Swagger disponível em /api-docs`);
});
