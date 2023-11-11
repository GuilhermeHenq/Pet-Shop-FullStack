import { Navbar, Container, Nav} from 'react-bootstrap'
import Logo from '../../public/PetShop.svg';
import NavDropdown  from 'react-bootstrap/NavDropdown';


function Header() {
  return (
    <>
      <Navbar bg='dark navbar-dark bg-primary' expand='lg' fixed='top'>
        <Container>
          <Navbar.Brand className='' href="/home">
            <img src={Logo} alt="Logo" width={"30%"} height={"30%"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav>
              <Nav.Link href="/"> Página inicial</Nav.Link>

              <NavDropdown title="Cadastros" id = "basic-nav-dropdown">
                  <NavDropdown.Item href = "/produtos"> Produtos</NavDropdown.Item>
                  <NavDropdown.Item href = "/servicos"> Serviços </NavDropdown.Item>
                  <NavDropdown.Item href = "/clientes"> Clientes </NavDropdown.Item>
                  <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Header
