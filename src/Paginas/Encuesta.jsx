import React from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useState, useRef } from "react"
import axios from "axios"



function Administracion() {

    const navegar = useNavigate()
    const ref = useRef()
    const [post, setPost] = useState({
        nombre: '',
        estado: '',
        preguntas: [],
        respuestas: [],
        categoria: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    //funcion que crea post y manda a la base de datos
    const createPost = (e) => {
        e.preventDefault();
        setPost(prevState => ({
            post: {
                ...prevState.post,
                preguntas: array
            }
        })
        )
        axios
            .post("http://localhost:5000/adm", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    const array = []


    function agregarPregunta() {
        const element = ref.current
        array.push(element.value.toString())
    }


    return (
        <div>
            <h2>Crear Encuesta</h2>

            <Form>
                <Form.Group>
                    <Form.Control name="nombre" value={post.nombre} placeholder="Nombre" style={{ marginBottom: '1rem' }} onChange={handleChange} />
                    <Form.Select style={{ marginBottom: '1rem' }} onChange={handleChange}>  <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option> </Form.Select>
                    <div style={{ display: "flex" }}>

                        <Form.Control name="preguntas"
                            placeholder="Preguntas" style={{ marginBottom: '1rem' }}
                            ref={ref} />

                        <Button style={{ width: 38, height: 38, fontWeight: "bold" }}
                            variant="primary"
                            onClick={() => agregarPregunta()}>+ </Button>

                    </div>
                    <Form.Control name="respuestas" value={post.respuestas} placeholder="Respuestas" style={{ marginBottom: '1rem' }} onChange={handleChange} />
                    <Form.Control name="categoria" value={post.categoria} placeholder="Categoria" style={{ marginBottom: '1rem' }} onChange={handleChange} />
                </Form.Group>
                <Button onClick={createPost}>Crear Encuesta</Button>
            </Form>


        </div>
    )
};

export default Administracion;