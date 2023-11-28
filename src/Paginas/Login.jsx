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
// import Parse from 'parse/dist/parse.min.js'
// import { Button, Divider, Input } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import facebook from "../assets/facebook.ico"
import twitter from "../assets/twitter.ico"
import google from "../assets/google.ico"
import github from "../assets/github.ico"


function Login() {

    const ClickHandler = () => {
        changeMessage("Goodbye!");
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

        await axios.post(`http://localhost:5000/users/${user}`, data).then(res => {
            console.log(res.data)
            localStorage.setItem('userToken', res.data.token)
        })
    }

    // LogOut

    const handleLogOut = () => {
        localStorage.removeItem("User")
        window.location.reload();
    }
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setContraseña] = useState('');
    const navegar = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('asd')
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

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>
                        <form onSubmit={(event) => handleLogin(event, email)}>
                            <div className="text-center mb-3">
                                <p>Sign in with:</p>

                                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={facebook} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={twitter} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={google} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={github} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>
                                </div>

                                <p className="text-center mt-3">or:</p>
                            </div>

                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required onChange={(e) => setContraseña(e.target.value)} />

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault1' label='Remember me' />
                                <a href="!#">Forgot password?</a>
                            </div>

                            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                            <p className="text-center">Not a member? <a href="#!">Register</a></p>
                        </form>
                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-3">
                                <p>Sign un with:</p>

                                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={facebook} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={twitter} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={google} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>

                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                        <img src={github} alt="" style={{ width: 30, height: 30 }} />
                                    </MDBBtn>
                                </div>

                                <p className="text-center mt-3">or:</p>
                            </div>

                            <MDBInput wrapperClass='mb-4' label='Name' id='form6' type='text' required onChange={(e) => setNombre(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Username' id='form5' type='text' required onChange={(e) => setUsername(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' required onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' required onChange={(e) => setContraseña(e.target.value)} />

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' required />
                            </div>

                            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                            <h1>User is logged in</h1>
                            <button onClickCapture={handleLogOut}>
                                logout user
                            </button>
                        </form>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer >
        </div>
    )
};

export default Login;