const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config() 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

connection.connect((err) => {
    if(err){
        console.log(err);
    }

    console.log('Coneconnection sucessfully established')
});

class dbService {
    static instance;

    static getDbServiceInstance(){
        if(!this.instance){
            this.instance = new dbService();
        }
        return this.instance;
    }

    async BuscarClientes() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tbl_clientes;";
            connection.query(query, (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async NovoCliente(data){
        try {
        const query = "INSERT INTO tbl_clientes (nome, email) VALUES (?, ?)"
        const nome = data.nome;
        const email = data.email;

        const response = await new Promise((resolve, reject) => {
            connection.query(query, [nome, email], (err, result) => {
                if (err) reject(new Error(err.message))
                resolve(result)
            })
        })

        console.log("Cliente inserido com sucesso!")

        return response;
        } catch (error) {
            console.log("Erro ao inserir o cliente: ", + error);
            throw error;
        }
    }

    async deletarCliente(id){
        const query = `DELETE FROM tbl_clientes WHERE id = ?;`;
        try {
            const res = await new Promise ((resolve, reject) => {
                connection.query(query, id, (err, result) =>{
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            if(res.affectedRows == 0){
                throw new Error ('Cliente não encontrado');
            }

            console.log("Cliente deletado com sucesso!");
        } catch (err){
            console.log(err)
            throw err;
        }
    }

    async buscarprodutos() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tbl_produtos;";
            connection.query(query, (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async novoproduto(data){
        try {
        const query = "INSERT INTO tbl_produtos (nome, preco, estoque) VALUES  (?, ?, ?)";
        const nome = data.nome;
        const preco = data.preco;
        const estoque = data.estoque;

        const response = await new Promise((resolve, reject) => {
            connection.query(query, [nome, preco, estoque], (err, result) => {
                if (err) reject(new Error(err.message))
                resolve(result)
            })
        })

        console.log("Produto inserido com sucesso!")

        return response;
        } catch (error) {
            console.log("Erro ao inserir o produto: ", + error);
            throw error;
        }
    }

    async deletarproduto(id){
        const query = `DELETE FROM tbl_produtos WHERE id = ?;`;
        try {
            const res = await new Promise ((resolve, reject) => {
                connection.query(query, id, (err, result) =>{
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            if(res.affectedRows == 0){
                throw new Error ('Produto não encontrado');
            }

            console.log("Produto deletado com sucesso!");
        } catch (err){
            console.log(err)
            throw err;
        }
    }

    async buscarservicos() {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tbl_servicos;";
            connection.query(query, (err, result) => {
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async novoServico(data){
        try {
        const query = "INSERT INTO tbl_servicos (nome, preco) VALUES  (?, ?)";
        const nome = data.nome;
        const preco = data.preco;

        const response = await new Promise((resolve, reject) => {
            connection.query(query, [nome, preco], (err, result) => {
                if (err) reject(new Error(err.message))
                resolve(result)
            })
        })

        console.log("Serviço inserido com sucesso!")

        return response;
        } catch (error) {
            console.log("Erro ao inserir o serviço: ", + error);
            throw error;
        }
    }

    async deletarservico(id){
        const query = `DELETE FROM tbl_servicos WHERE id = ?;`;
        try {
            const res = await new Promise ((resolve, reject) => {
                connection.query(query, id, (err, result) =>{
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            if(res.affectedRows == 0){
                throw new Error ('Serviço não encontrado');
            }

            console.log("Serviço deletado com sucesso!");
        } catch (err){
            console.log(err)
            throw err;
        }
    }
    async editarproduto(data) {
        console.log("Dados recebidos para edição:", data);
        let query = `UPDATE tbl_produtos SET`;
        const values = [];
        let isFirstSet = true;



        if (data.nome) {
            query += ` nome = ?`;
            values.push(data.nome);
            isFirstSet = false;
        }

        if (data.preco) {
            if(!isFirstSet) {
                query += ',';
            }
            query += ` preco = ?`;
            values.push(data.preco);
            isFirstSet = false;
        }

        if (data.estoque) {
            if(!isFirstSet) {
                query += ',';
            }
            query += ` estoque = ?`;
            values.push(data.estoque);
        }

        query += ` WHERE id = ?`;
        values.push(data.id)

        try {
            const res = await new Promise ((resolve, reject) => {
                connection.query(query, values, (err, result) =>{
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })

            if(res.affectedRows == 0){
                throw new Error ('Produto não encontrado');
            }

            console.log("Produto alterado com sucesso!");

        } catch (err){
            console.log(err);
            throw err;
        }


    }
}


module.exports = dbService;