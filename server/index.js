const express = require('express')
const app = express();
const cors = require('cors');
const dbService = require('./dbService.js');
const dotenv = require('dotenv')

dotenv.config() 

app.use(cors());
app.use(express.json());

const db = dbService.getDbServiceInstance();

// app.get('/', (req, res) => {
//     res.send('Welcome');
// });

// app.get('/teste', (req, res) => {
//     res.send('Welcome endpoint teste');
// });

app.get('/buscarclientes', (req, res) => {
    const result = db.BuscarClientes();
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.post('/NovoCliente', (req, res) => {
    const result = db.NovoCliente(req.body);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.delete('/deletarCliente/:id', (req, res) => {
    const id = req.params.id;
    const result = db.deletarCliente(id);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});


app.get('/buscarprodutos', (req, res) => {
    const result = db.buscarprodutos();
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.post('/novoproduto', (req, res) => {
    const result = db.novoproduto(req.body);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.delete('/deletarproduto/:id', (req, res) => {
    const id = req.params.id;
    const result = db.deletarproduto(id);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.get('/buscarservicos', (req, res) => {
    const result = db.buscarservicos();
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.post('/novoServico', (req, res) => {
    const result = db.novoServico(req.body);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.delete('/deletarservico/:id', (req, res) => {
    const id = req.params.id;
    const result = db.deletarservico(id);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

app.put('/editarproduto', (req, res) => {
    const result = db.editarproduto(req.body);
    result
        .then(data => res.json(data))
        .catch(err => console.log(err));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
