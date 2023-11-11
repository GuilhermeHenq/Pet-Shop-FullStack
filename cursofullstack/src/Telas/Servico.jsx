import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Table } from "react-bootstrap";
import Header from '../Components/header';
import Api from '../Api.jsx'
import { BsTrashFill } from 'react-icons/bs';



const servicos = () => {

    useEffect(() => {
        const getservicos = async () => {
            const responseservicos = await Api.get('/buscarservicos');
            setservicos(responseservicos.data);
        }

        getservicos();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [servicos, setservicos] = useState([]);

    const [newServicoName, setNewServicoName] = useState('')
    const [newServicoPreco, setNewServicoPreco] = useState('')

    const handleModal = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleDeleteService = async (id) => {

        try{
            const response = await Api.delete(`deletarservico/${id}`)
            
            if(response.status === 200){
                const updatedservicos = servicos.filter(Servico => Servico.id != id)

                setservicos(updatedservicos)
            }
        } catch (err) {
            console.log(err);
        }
        console.log(handleDeleteService)
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if(newServicoName == null  || newServicoName == undefined || newServicoName == '') {
            alert("O nome não pode ser vazio!");
            return;
        }
        const newService = {
            nome: newServicoName,
            preco: newServicoPreco,

        };
 
        const res = await Api.put('/editarproduto', JSON.stringify(EditedProduct), {
            headers: { 'Content-Type': 'application/json' }
        });
        


 
        setservicos([...servicos, {
            id: res.data.insertId, nome: newServicoName, preco: newServicoPreco
        }])

        handleClose();

        setNewServicoName('')
        setNewServicoPreco('')
    }


    return (
        <>
            <Container style = {{marginTop: '80px'}}>
                <Header/>
                <h1>Lista de servicos</h1>
                <Button variant="primary" onClick={handleModal}>Cadastrar novo Servico</Button>

                <Modal show={showModal} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de novo Servico</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleSave}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label> Nome </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Digite o nome do Servico"
                                    onChange={(e) => setNewServicoName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicPreco'>
                                <Form.Label> Preço </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Digite o preço do Servico"
                                    onChange={(e) => setNewServicoPreco(e.target.value)}
                                />
                            </Form.Group>



                            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                                Save
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((Service) => (
                            <tr key={Service.id}>
                                <td>{Service.id}</td>
                                <td>{Service.nome}</td>
                                <td>{Service.preco}</td>
                                <td>
                                <Button onClick={() => { handleDeleteService(Service.id) }}>
                                    <BsTrashFill/>
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

export default servicos;