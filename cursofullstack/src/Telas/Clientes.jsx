import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Table } from "react-bootstrap";
import Header from '../Components/header';
import Api from '../Api.jsx'
import { BsTrashFill } from 'react-icons/bs';



const Clientes = () => {

    useEffect(() => {
        const getClientes = async () => {
            const responseClientes = await Api.get('/buscarClientes');
            setClientes(responseClientes.data);
        }

        getClientes();
    }, [])

    const [showModal, setShowModal] = useState(false);
    const [clientes, setClientes] = useState([]);

    const [newClienteName, setNewClientName] = useState('')
    const [newClienteEmail, setNewClientEmail] = useState('')

    const handleModal = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleDeleteClient = async (id) => {

        try{
            const response = await Api.delete(`deletarCliente/${id}`)
            
            if(response.status === 200){
                const updatedClientes = clientes.filter(cliente => cliente.id != id)

                setClientes(updatedClientes)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if(newClienteName == null  || newClienteName == undefined || newClienteName == '') {
            alert("O nome não pode ser vazio!");
            return;
        }
        const newClient = {
            nome: newClienteName,
            email: newClienteEmail
        };
 
        const res = await Api.post('/NovoCliente', JSON.stringify(newClient), {
            headers: { 'Content-Type': 'application/json' }
        })


 
        setClientes([...clientes, {id: res.data.insertId, nome: newClienteName, email: newClienteEmail}])

        handleClose();

        setNewClientEmail('')
        setNewClientName('')
    }


    return (
        <>
            <Container style = {{marginTop: '80px'}}>
                <Header/>
                <h1>Lista de clientes</h1>
                <Button variant="primary" onClick={handleModal}>Cadastrar novo cliente</Button>

                <Modal show={showModal} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de novo cliente</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleSave}>
                            <Form.Group controlId='formBasicName'>
                                <Form.Label> Nome </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Digite o nome do cliente"
                                    onChange={(e) => setNewClientName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label> Email </Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder="Digite o email do cliente"
                                    onChange={(e) => setNewClientEmail(e.target.value)}
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
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.nome}</td>
                                <td>{client.email}</td>
                                <td>
                                <Button onClick={() => { handleDeleteClient(client.id) }}>
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

export default Clientes;