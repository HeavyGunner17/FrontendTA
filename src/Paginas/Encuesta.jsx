import React from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button, Container } from "react-bootstrap"
import { useState, useRef } from "react"
import axios from "axios"



function Administracion() {

    const navegar = useNavigate();
    const ref = useRef();
    const refPreg = useRef();
    const [post, setPost] = useState({
        nombre: '',
        estado: '',
        preguntas: [],
        categoria: '',
    });
    const [preguntas, setPreguntas] = useState([]);



    //funcion que crea post y manda a la base de datos
    const createPost = (e) => {
        let preguntasState = preguntas
        e.preventDefault();
        setPost(prevState => ({
            post: {
                ...prevState.post,
                preguntas: preguntasState
            }
        })
        )
        // axios
        //     .post("http://localhost:5000/adm", post)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
    console.log(post)}; 
    let preguntasArray = []


    function agregarRespuesta() {
        const respuesta = ref.current
        preguntasArray.push(respuesta.value.toString())
        // ref.current.value = ""
        console.log(preguntasArray)
    }

    function agregarPregunta() {
        let element = refPreg.current
        const prevPregunta = preguntas
        prevPregunta.push({ pregunta: element.value, respuestas: preguntasArray })

        setPreguntas(prevPregunta)
        console.log(preguntas)
        preguntasArray = []
        // refPreg.current.value = ""
    }


    return (
        <Container>
            <h2>Crear Encuesta</h2>

            <Form>
                <Form.Group>
                    <Form.Control name="nombre" value={post.nombre} placeholder="Nombre" style={{ marginBottom: '1rem' }} />
                    <Form.Select style={{ marginBottom: '1rem' }}>  <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option> </Form.Select>
                    <div style={{ display: "flex" }} >

                        <Form.Control name="preguntas"
                            placeholder="Preguntas" style={{ marginBottom: '1rem' }} ref={refPreg} />

                        <Button style={{ height: 38, fontWeight: "bold" }}
                            variant="primary"
                            onClick={() => agregarPregunta()}>Agregar Pregunta </Button>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Form.Control name="respuestas"
                            placeholder="Respuestas" style={{ marginBottom: '1rem' }}
                            ref={ref} />

                        <Button style={{ width: 38, height: 38, fontWeight: "bold" }}
                            variant="primary"
                            onClick={() => agregarRespuesta()}>+ </Button>
                    </div>
                    <Form.Control name="categoria" value={post.categoria} placeholder="Categoria" style={{ marginBottom: '1rem' }} />
                </Form.Group>
                <Button onClick={createPost}>Crear Encuesta</Button>
            </Form>


        </Container>
    )
};

export default Administracion;