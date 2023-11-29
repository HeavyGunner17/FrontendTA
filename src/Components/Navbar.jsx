import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import TA2 from "../assets/TA2.png"
import "./Navbar.css"
import profile from "../assets/profile.png"



const Navbarsus = ({ changeMessage }) => {

    const [logged, setLogged] = useState(false);
    const [loggedUserData, setLoggedUserData] = useState('');

    const handleLogOut = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        // window.location.reload();
    }

    useEffect(() => {
        if (window.sessionStorage.getItem('user') || window.localStorage.getItem('user')) {
            if (window.sessionStorage.getItem('user')) {
                setLogged(true);
                setLoggedUserData(JSON.parse((window.sessionStorage.getItem('user'))));
                console.log('condicion 1')
            } else {
                setLogged(true);
                setLoggedUserData(JSON.parse((window.localStorage.getItem('user'))));
                console.log('condicion 2')
            }
        }
        console.log(loggedUserData)
    }, []);



    const navegar = useNavigate()


    return (
        <div>


            <Navbar expand="lg" className="bg-body-tertiary d-flex">
                <Container>

                    <div
                        onClick={() => navegar('/')}>
                        <img alt="Logo" src={TA2} width="40" height="40"
                            className="d-inline-block align-top"
                            style={{ display: "flex", justifyContent: "space-between" }}
                        />
                        <Navbar.Brand className="title">
                            Truth Answer
                        </Navbar.Brand>
                    </div>

                    <div>              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" onClick={() => navegar('/')}>Inicio</Nav.Link>
                                <Nav.Link href="#adm" onClick={() => navegar('/adm')}>ADM</Nav.Link>
                                <Nav.Link href="#crearEncuesta" onClick={() => navegar('/crearEncuesta')}>Crear encuesta</Nav.Link>
                                <Nav.Link href="#aboutus" onClick={() => navegar('/conocenos')}>Conocenos</Nav.Link>
                                <NavDropdown title="Categorias" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.2">
                                        Politica
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Educación</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.4">
                                        Tecnologia
                                    </NavDropdown.Item>
                                </NavDropdown>


                                {logged ? (<div>
                                    <NavDropdown title={<span>{loggedUserData.user}<img alt="loggedIn" src={profile} width="28" height="28" /></span>} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.2">
                                            Configuración
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3" onClick={() => handleLogOut}>Cerrar Sesion</NavDropdown.Item>
                                    </NavDropdown>
                                </div>) :
                                    (<Nav.Link ><Button variant="warning" className="botonRegSub" onClick={() => navegar('/login')}>Iniciar sesion</Button>
                                    </Nav.Link>)}



                            </Nav>
                        </Navbar.Collapse></div>

                </Container>
            </Navbar>


        </div >);
};
export default Navbarsus;