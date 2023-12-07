import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


function Posts() {
    const [posts, setPosts] = useState([])
    const navegar = useNavigate()
    const [show, setShow] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState({ email:"" ,id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "", anonimo:"" })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))

        let sessionUser = {userRole: ''};
        let localUser = {userRole: ''};

        if (window.sessionStorage.getItem('user')) {
            sessionUser = JSON.parse(window.sessionStorage.getItem('user'))
        }
        if (window.localStorage.getItem('user')) {
            localUser = JSON.parse(window.localStorage.getItem('user'))
        }



        if (sessionUser.userRole == 'admin' || localUser.userRole == 'admin') {
            axios.get("http://localhost:5000/posts")
                .then((res) => {
                    console.log(res);
                    setPosts(res.data);
                })
                .catch((err) => console.log(err))
            console.log(postToUpdate.categoria, 'categoria')
        } else {
            navegar('/home')
        }
    }, [postToUpdate]);


    const deletePost = (id) => {

        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        window.location.reload();
    };

    const updatePost = (id) => {
        setPostToUpdate(posts.find((post) => post._id === id))
        handleShow();
    };


    const saveUpdatedPost = () => {
        console.log(postToUpdate)
        console.log(postToUpdate._id)
        axios.put(`http://localhost:5000/posts/${postToUpdate._id}`, postToUpdate)
            .then(res => {
                alert('salio bien');
                window.location.reload();
                handleClose();
                setPostToUpdate({ email:"", id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "", anonimo:"" })
            })
            .catch(err => {
                alert('salio mal');
                console.log(err)
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

                {posts.length > 0 ? (posts.map((post) => {
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
                                <Button onClick={() => deletePost(post._id)} style={{ width: "100%" }}>Borrar</Button></div>
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