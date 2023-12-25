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
import Swal from "sweetalert2";



const Navbarsus = ({ changeMessage }) => {

    const [logged, setLogged] = useState(false);
    const [loggedUserData, setLoggedUserData] = useState('');

    const handleLogOut = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        setLoggedUserData('')
        setLogged(false)
    }


    useEffect(() => {
        if (window.sessionStorage.getItem('user') || window.localStorage.getItem('user')) {
            if (window.sessionStorage.getItem('user')) {
                setLogged(true);
                setLoggedUserData(JSON.parse((window.sessionStorage.getItem('user'))));

            } else if (window.localStorage.getItem('user')) {
                setLogged(true);
                setLoggedUserData(JSON.parse((window.localStorage.getItem('user'))));

            }
            else {
                setLogged(false);
            }
        }
    }, [setLogged]);



    const navegar = useNavigate()

    function llamarCartelMalvado() {
        Swal.fire({
            title: 'Ups...',
            text: 'Para acceder a crear una encuesta debe iniciar sesión',
            timer: 5000
        })
    }

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

                    <div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" onClick={() => navegar('/')}>Inicio</Nav.Link>
                                {loggedUserData.userRole == "admin" && logged ? (<div><Nav.Link href="#adm" onClick={() => navegar('/adm')} disabled={!logged}>ADM</Nav.Link></div>) : ""}
                                <Nav.Link href="#crearEncuesta" onClick={() => logged ? navegar('/crearEncuesta') : llamarCartelMalvado()} >Crear encuesta</Nav.Link>
                                <Nav.Link href="#aboutus" onClick={() => navegar('/conocenos')}>Conocenos</Nav.Link>
                                <Nav.Link href="#categoria" onClick={() => navegar('/categoria')}>Categoria</Nav.Link>


                                {logged ? (<div>
                                    <NavDropdown title={<span>{loggedUserData.user}<img alt="loggedIn" src={profile} width="28" height="28" /></span>} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={() => navegar('/error')}>
                                            Configuración
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogOut}>Cerrar Sesion</NavDropdown.Item>
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