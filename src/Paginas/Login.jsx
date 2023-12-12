import React, { useState } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import facebook from "../assets/facebook.ico"
import twitter from "../assets/twitter.ico"
import google from "../assets/google.ico"
import github from "../assets/github.ico"
import { Link } from 'react-router-dom';


function Login() {

    let rememberMe = false

    const rememberMeHandler = () => {
        rememberMe = !rememberMe
        console.log(rememberMe)
    }

    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };



    async function handleLogin(e, user) {
        e.preventDefault()
        let dataUser = email
        let dataPassword = password;
        const data = {
            email: dataUser,
            password: dataPassword
        }

        try {
            await axios.post(`http://localhost:5000/users/${user}`, data).then(res => {
                if (res.data.ok) {
                    console.log(res.data)
                    if (rememberMe) {
                        window.localStorage.setItem('user', JSON.stringify(res.data));
                    } else {
                        window.sessionStorage.setItem('user', JSON.stringify(res.data));
                    }
                    navegar('/Home')
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'warning',
            })
        }
    }



    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setContraseña] = useState('');
    const navegar = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/users', { nombre, username, email, password })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar />
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                <MDBTabs pills justify className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Log in
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Registro
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>
                        <form onSubmit={(event) => handleLogin(event, email)}>
                            <div className="text-center mb-3">
                                <p>Inicia sesion con:</p>

                                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <Link to={'/error'}>
                                            <img src={facebook} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <Link to={'/error'}>
                                            <img src={twitter} alt="" style={{ width: 30, height: 30 }} /> </Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <Link to={'/error'}>
                                        <img src={google} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <Link to={'/error'}>
                                        <img src={github} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>
                                </div>

                                <p className="text-center mt-3">o:</p>
                            </div>

                            <label htmlFor="form1">Email</label>
                            <MDBInput wrapperClass='mb-4' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="form2">Contraseña</label>
                            <MDBInput wrapperClass='mb-4' id='form2' type='password' required onChange={(e) => setContraseña(e.target.value)} />

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault1' label='Recordar contraseña' onChange={(e) => rememberMeHandler()} />
                                <a href="!#">Olvidaste tu contraseña?</a>
                            </div>
                            <div>
                                <MDBBtn className="mb-4 w-100" style={{ maxHeight: "40px" }}>Iniciar sesión</MDBBtn>
                            </div>
                            <p className="text-center">No eres miembro? <a href="#!">Registrate</a></p>
                        </form>
                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-3">
                                <p>Registrate con:</p>

                                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <Link to={'/error'}>
                                        <img src={facebook} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <Link to={'/error'}>
                                        <img src={twitter} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <Link to={'/error'}>
                                        <img src={google} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                    <Link to={'/error'}>
                                        <img src={github} alt="" style={{ width: 30, height: 30 }} /></Link>
                                    </MDBBtn>
                                </div>

                                <p className="text-center mt-3">o:</p>
                            </div>

                            <label htmlFor="form6">Nombre</label>
                            <MDBInput wrapperClass='mb-4' id='form6' type='text' required onChange={(e) => setNombre(e.target.value)} />
                            <label htmlFor="form5">Nombre de usuario</label>
                            <MDBInput wrapperClass='mb-4' id='form5' type='text' required onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="form3">Correo electrónico</label>
                            <MDBInput wrapperClass='mb-4' id='form3' type='email' required onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="form4">Contraseña</label>
                            <MDBInput wrapperClass='mb-4' id='form4' type='password' required onChange={(e) => setContraseña(e.target.value)} />

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Leí y estoy deacuerdo con los terminos y condiciones' required />
                            </div>

                            <MDBBtn className="mb-4 w-100" style={{ maxHeight: "40px" }} >Registrate</MDBBtn>

                        </form>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer >
        </div>
    )
};

export default Login;