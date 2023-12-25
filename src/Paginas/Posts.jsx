import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Swal from 'sweetalert2'

function Posts() {
    const [posts, setPosts] = useState([]);
    const navegar = useNavigate()
    const [show, setShow] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState({ email: "", id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "", anonimo: "" })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        axios.get("https://truthanswer-backend.onrender.com/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

        let sessionUser = '';
        let localUser = '';

        if (window.sessionStorage.getItem('user')) {
            sessionUser = JSON.parse(window.sessionStorage.getItem('user'))
        }
        if (window.localStorage.getItem('user')) {
            localUser = JSON.parse(window.localStorage.getItem('user'))
        }
        if (sessionUser.userRole == 'admin' || localUser.userRole == 'admin') {
            axios.get("https://truthanswer-backend.onrender.com/posts")
                .then((res) => {
                    setPosts(res.data);
                })
                .catch((err) => console.log(err))
        } else {
            Swal.fire({
                title: 'Error',
                text: 'No se ha iniciado sesión',
                icon: 'warning',
            })
            navegar('/home')
        }
    }, [postToUpdate]);


    async function deletePost(id, index) {
        await axios.delete(`https://truthanswer-backend.onrender.com/delete/${id}`)
            .then(res => {
                Swal.fire({
                    title: 'Enhorabuena',
                    text: 'El proceso se ha realizado satisfactoriamente',
                    icon: 'success',
                })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Algo ha salido mal',
                    text: err,
                    icon: 'warning',
                })
            });
      setTimeout(() => {
        window.location.reload()
      }, 2000); 
    };

    const updatePost = (id) => {
        setPostToUpdate(posts.find((post) => post._id === id))
        handleShow();
    };


    const saveUpdatedPost = () => {
        axios.put(`https://truthanswer-backend.onrender.com/posts/${postToUpdate._id}`, postToUpdate)
            .then(res => {
                Swal.fire({
                    title: 'Enhorabuena',
                    text: 'El proceso se ha realizado satisfactoriamente',
                    icon: 'success',
                })
                window.location.reload();
                handleClose();
                setPostToUpdate({ email: "", id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "", anonimo: "" })
            })
            .catch(err => {
                Swal.fire({
                    title: 'Algo ha salido mal',
                    text: "La operación no se ha podido realizar",
                    icon: 'warning',
                })
            });
    };

    const handleChange = (e) => {
        const { name, estado, categoria, value } = e.target;
        setPostToUpdate(prev => {
            return ({
                ...prev,
                [name]: value,
                [estado]: value,
                [categoria]: value,
            })
        })
    };



    return (
        <div>
            <Navbar />
            <Container>
                <h1 className="text-center mb-3">Lista de Encuestas</h1>

                {posts.length > 0 ? (posts.map((post, index) => {
                    return (
                        <div key={post._id}
                            style={{
                                marginBottom: "1rem",
                                border: "solid lightgray 1px",
                                borderRadius: "8px"
                            }}
                        >
                            <div className="d-flex justify-content-between">
                                <h2 style={{ marginLeft: "10px" }}>{post.nombre}</h2>
                                <div style={{ marginRight: "10px" }}>
                                    <p>Estado: {post.estado}</p>
                                    <p>Categoría: {post.categoria}</p>
                                    <p>Email: {post.email}</p></div>
                            </div>
                            <h3 style={{ marginLeft: "10px" }}>Preguntas</h3>
                            {(post.preguntas.map((post, index) => {
                                return (
                                    <div key={index}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            margin: "1rem"
                                        }}>
                                        <p>{post.pregunta}</p>
                                        {post.respuestas.map((resp, index) =>
                                            <ul key={index}>
                                                <li style={{ marginRight: "0.5rem" }}>{resp}</li>
                                            </ul>
                                        )}

                                    </div>
                                )
                            }))}
                            <div className="d-flex">
                                <Button onClick={() => updatePost(post._id)} style={{ width: "100%", marginRight: "1rem" }}>Actualizar</Button>
                                <Button onClick={() => deletePost(post._id, index)} style={{ width: "100%" }}>Borrar</Button></div>
                        </div>
                    )
                })) : (<h3>No hay datos.</h3>)}


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modificar Encuesta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Control placeholder="nombre"
                                name="nombre"
                                value={postToUpdate.nombre ? postToUpdate.nombre : ""}
                                style={{ marginBottom: "1rem" }}
                                onChange={handleChange} />

                            <Form.Select style={{ marginBottom: '1rem' }}
                                name="estado"
                                value={postToUpdate.estado ? postToUpdate.estado : ""}
                                onChange={handleChange}>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </Form.Select>

                            <Form.Select style={{ marginBottom: '1rem' }}
                                name="categoria"
                                value={postToUpdate.categoria ? postToUpdate.categoria : ""}
                                onChange={handleChange}>
                                <option value="Educación">Educación</option>
                                <option value="Politica">Politica</option>
                                <option value="Tecnologia">Tecnologia</option>
                            </Form.Select>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={saveUpdatedPost}>
                            Guardar cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <Footer />
        </div>
    )
}



export default Posts;