import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Table } from "react-bootstrap";
import Header from '../Components/header';
import Api from '../Api.jsx'
import { BsTrashFill } from 'react-icons/bs';



const produtos = () => {

    useEffect(() => {
        const getprodutos = async () => {
            const responseprodutos = await Api.get('/buscarprodutos');
            setprodutos(responseprodutos.data);
        }

        getprodutos();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);



    const [produtos, setprodutos] = useState([]);

    const [newProdutoName, setNewProdutoName] = useState('')
    const [newProdutoPreco, setNewProdutoPreco] = useState('')
    const [newProdutoEstoque, setNewProdutoEstoque] = useState('')

    const [EditData, setEditData] = useState({})


    const handleModal = () => {
        setShowModal(true);
    }

    const handleModalEdit = () => {
        setShowModalEdit(true);
    }

    const handleClose = () => {
        setShowModal(false);
        setNewProdutoName('')
        setNewProdutoPreco('')
        setNewProdutoEstoque('')
    }

    const handleCloseEdit = () => {
        setEditData({});
        setShowModalEdit(false);
    }


    const handleDeleteproduct = async (id) => {

        try {
            const response = await Api.delete(`deletarproduto/${id}`)

            if (response.status === 200) {
                const updatedprodutos = produtos.filter(produto => produto.id != id)

                setprodutos(updatedprodutos)
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleEditproduct = async (id) => {
        handleModalEdit()
        console.log("Produto:", EditData)
    }




    const handleSave = async (e) => {
        e.preventDefault();

        if (newProdutoName == null || newProdutoName == undefined || newProdutoName == '') {
            alert("O nome não pode ser vazio!");
            return;
        }
        const newProduct = {
            nome: newProdutoName,
            preco: newProdutoPreco,
            estoque: newProdutoEstoque
        };

        const res = await Api.post('/novoproduto', JSON.stringify(newProduct), {
            headers: { 'Content-Type': 'application/json' }
        })



        setprodutos([...produtos, {
            id: res.data.insertId, nome: newProdutoName, preco: newProdutoPreco, estoque: newProdutoEstoque
        }])

        handleClose();

        setNewProdutoName('')
        setNewProdutoPreco('')
        setNewProdutoEstoque('')
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        if (newProdutoName == null || newProdutoName == undefined || newProdutoName == '') {
            alert("O nome não pode ser vazio!");
            return;
        }
        const EditedProduct = {}
        EditedProduct.id = EditData.id;

        if (newProdutoName != '') {
            EditedProduct.nome = newProdutoName;

        }
        if (newProdutoPreco != '') {
            EditedProduct.nome = newProdutoPreco;

        }
        if (newProdutoEstoque != '') {
            EditedProduct.nome = newProdutoEstoque;

        }

        const res = await Api.put('/editarproduto', JSON.stringify(EditedProduct), {
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(res)

        setprodutos((produtos) => {
            return produtos.map((produto) => {
                if (produto.id === EditData.id) {
                    return {
                        ...produto,
                        nome: newProdutoName,
                        preco: newProdutoPreco,
                        estoque: newProdutoEstoque

                    }
                }
                return produto;
            });
        });

        handleClose();

        setNewProdutoName('')
        setNewProdutoPreco('')
        setNewProdutoEstoque('')
    }


    return (
        <>
            <Container style={{ marginTop: '80px' }}>
                <Header />
                <h1>Lista de produtos</h1>
                <Button variant="primary" onClick={handleModal}>Cadastrar novo produto</Button>

                <Modal show={showModal} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de novo produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleSave}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label> Nome </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Digite o nome do produto"
                                    onChange={(e) => setNewProdutoName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicPreco'>
                                <Form.Label> Preço </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Digite o preço do produto"
                                    onChange={(e) => setNewProdutoPreco(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicEstoque'>
                                <Form.Label> Estoque </Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder="Digite o estoque inicial do produto"
                                    onChange={(e) => setNewProdutoEstoque(e.target.value)}
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                                Salvar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>


                <Modal show={showModalEdit} onHide={handleCloseEdit} >
                    <Modal.Header closeButton>
                        <Modal.Title>Edição do produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleEdit}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label> Nome </Form.Label>
                                <Form.Control
                                    type='text'
                                    onChange={(e) => setNewProdutoName(e.target.value)}
                                    defaultValue={EditData.nome}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicPreco'>
                                <Form.Label> Preço </Form.Label>
                                <Form.Control
                                    type='text'
                                    onChange={(e) => setNewProdutoPreco(e.target.value)}
                                    defaultValue={EditData.preco}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicEstoque'>
                                <Form.Label> Estoque </Form.Label>
                                <Form.Control
                                    type='number'
                                    onChange={(e) => setNewProdutoEstoque(e.target.value)}
                                    defaultValue={EditData.estoque}
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                                Salvar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nome}</td>
                                <td>{product.preco}</td>
                                <td>{product.estoque}</td>
                                <td>
                                    <Button onClick={() => { handleDeleteproduct(product.id) }}>
                                        <BsTrashFill />
                                    </Button>
                                    <Button onClick={() => { setEditData(product); handleEditproduct(product.id); setNewProdutoName(product.nome); setNewProdutoPreco(product.preco); setNewProdutoEstoque(product.estoque) }}>
                                        <BsTrashFill />
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>


        </>
    )

}

export default produtos;