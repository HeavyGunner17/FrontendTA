import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button, Container } from "react-bootstrap"
import axios from "axios"
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


function Administracion() {

    const navegar = useNavigate();
    const ref = useRef();
    const refPreg = useRef();
    const refEstado = useRef();
    const refNombre = useRef();
    const refCat = useRef();

    // const [post, setPost] = useState({
    //     nombre: String,
    //     estado: String,
    //     categoria: String,
    //     preguntas: Array
    // });
    const [preguntas, setPreguntas] = useState([]);




    let preguntasArray = []


    function agregarRespuesta() {
        const respuesta = ref.current
        preguntasArray.push(respuesta.value.toString())
        ref.current.value = ""
        console.log(preguntasArray)
    }



    function agregarPregunta() {
        let element = refPreg.current
        const prevPregunta = preguntas
        prevPregunta.push({ pregunta: element.value, respuestas: preguntasArray })

        setPreguntas(prevPregunta)
        console.log(preguntas)
        preguntasArray = []
        refPreg.current.value = ""
    }

    //funcion que crea post y manda a la base de datos
    function createPost(e) {
        let preguntasState = preguntas

        let newFormValue = {
            nombre: refNombre.current.value,
            estado: refEstado.current.value,
            categoria: refCat.current.value,
            preguntas: preguntasState
        }
        e.preventDefault();
        console.log(newFormValue)
        axios
            .post("http://localhost:5000/adm", newFormValue)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };


    return (
        <Container>
            <Navbar />
            <h2>Crear Encuesta</h2>
            <Form>
                <Form.Group>
                    <Form.Control name="nombre" placeholder="Nombre" style={{ marginBottom: '1rem' }} ref={refNombre} />
                    <Form.Select style={{ marginBottom: '1rem' }} ref={refEstado}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
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

                    <Form.Select style={{ marginBottom: '1rem' }} ref={refCat}>
                        <option value="Educación">Educación</option>
                        <option value="Politica">Politica</option>
                        <option value="Tecnologia">Tecnologia</option>
                    </Form.Select>
                </Form.Group>
                <Button onClick={createPost}>Guardar formulario</Button>
            </Form>
            <Footer/>
        </Container>
    )   
};

export default Administracion;