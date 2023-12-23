import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button, Container } from "react-bootstrap"
import axios from "axios"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Swal from 'sweetalert2'


function Administracion() {

    const navegar = useNavigate();
    const ref = useRef();
    const refPreg = useRef();
    const refNombre = useRef();
    const refCat = useRef();

    const refAn = useRef();

    const [preguntas, setPreguntas] = useState([]);
    const [loggedMail, setLoggedMail] = useState();


    useEffect(() => {




        let sessionUser = '';
        let localUser = '';

        if (window.sessionStorage.getItem('user')) {
            sessionUser = JSON.parse(window.sessionStorage.getItem('user'))
        }
        if (window.localStorage.getItem('user')) {
            localUser = JSON.parse(window.localStorage.getItem('user'))
        }


        if (sessionUser.userRole == 'admin' || sessionUser.userRole == 'usuario' || localUser.userRole == 'admin' || localUser.userRole == 'usuario') {
            if (window.sessionStorage.getItem('user')) {
                setLoggedMail(JSON.parse(window.sessionStorage.getItem('user')))
            }
            else if (window.localStorage.getItem('user')) {
                setLoggedMail(JSON.parse(window.localStorage.getItem('user')))
            }
        } else {
            navegar('/home')
        }
    }, [])





    let preguntasArray = []


    function agregarRespuesta() {
        const respuesta = ref.current;
        preguntasArray.push(respuesta.value.toString());
        ref.current.value = "";
    }



    function agregarPregunta() {
        let element = refPreg.current
        const prevPregunta = preguntas
        prevPregunta.push({ pregunta: element.value, respuestas: preguntasArray })

        setPreguntas(prevPregunta)

        preguntasArray = []
        refPreg.current.value = ""

    }

    //funcion que crea post y manda a la base de datos
    function createPost(e) {

        if (window.sessionStorage.getItem('user') || window.localStorage.getItem('user')) {
            let preguntasState = preguntas
            let newFormValue = {
                email: loggedMail.userEmail,
                nombre: refNombre.current.value,
                estado: 'activo',
                categoria: refCat.current.value,
                preguntas: preguntasState,
                anonimo: refAn.current.checked
            }
            e.preventDefault();
            axios
                .post("https://truthanswer-backend.onrender.com/adm", newFormValue)
                .then((res) => {
                    setPreguntas([])
                    preguntasArray = []
              
                })
                Swal.fire({
                    title: 'Enhorabuena',
                text: 'El proceso se ha realizado satisfactoriamente',
                icon: 'success',
                })
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se ha iniciado sesión',
                icon: 'warning',
            })
            navegar('/login')
        }

    };


    return (
        <Container>
            <Navbar />
            <h2>Crear Encuesta</h2>
            <Form>
                <Form.Group>


                    <Form.Control name="nombre" placeholder="Título de la encuesta" style={{ marginBottom: '1rem' }} ref={refNombre} />

                    <Form.Select style={{ marginBottom: '1rem' }} ref={refCat}>
                        <option value="Educación">Educación</option>
                        <option value="Politica">Politica</option>
                        <option value="Tecnologia">Tecnologia</option>
                    </Form.Select>

                    <div style={{ display: "flex" }} >
                        <Form.Control name="preguntas"
                            placeholder="Preguntas" style={{ marginBottom: '1rem' }} ref={refPreg} />
                        <Button style={{ height: 38, fontWeight: "bold" }}
                            variant="primary"
                            onClick={() => agregarPregunta()}>Agregar Pregunta
                        </Button>
                    </div>



                    <div style={{ display: "flex" }}>
                        <Form.Control name="respuestas"
                            placeholder="Respuestas" style={{ marginBottom: '1rem' }}
                            ref={ref} />
                        <Button style={{ width: 38, height: 38, fontWeight: "bold" }}
                            variant="primary"
                            onClick={() => agregarRespuesta()}>+
                        </Button>
                    </div>


                </Form.Group>
                <div className="d-flex flex-column align-items-end">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Encuesta Anonima"
                        style={{ marginBottom: "15px" }}
                        ref={refAn}
                    />
                    <Button onClick={createPost}>Enviar cuestionario</Button>
                </div>
            </Form>
            <Footer /> </Container>
    )
};

export default Administracion;