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
    const [postToUpdate, setPostToUpdate] = useState({ id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "" })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                console.log(res);
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, []);


    const deletePost = (id) => {

        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        window.location.reload();
    };

    const updatePost = (id) => {
        setPostToUpdate(posts.find((post) => post._id === id))
        console.log(posts.find((post) => post._id === id), 'post')
        handleShow();
    };


    const saveUpdatedPost = () => {
        console.log(postToUpdate)
        console.log(postToUpdate._id)
        axios.put(`http://localhost:5000/posts/${postToUpdate._id}`, postToUpdate)
            .then(res => {
                alert('salio biens')
                window.location.reload();
                handleClose();
                setPostToUpdate({ id: "", nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "" })
            })
            .catch(err => {
                alert('salio mal')
                console.log(err)
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostToUpdate(prev => {
            return ({
                ...prev,
                [name]: value
            })
        })
        console.log('soy una funcion troll')
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
                            <h4>{post.nombre}</h4>
                            <p>{post.estado}</p>
                            <p>{post.categoria}</p>
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
                                            <label key={index}>
                                                <input type="radio" name={post.pregunta} style={{ marginRight: "0.5rem" }} value={resp} />{resp}
                                            </label>
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
                                value={postToUpdate.estado ? postToUpdate.estado : ""}
                                onChange={handleChange}>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </Form.Select>
                            {/* <Form.Control placeholder="preguntas"
                                name="preguntas"
                                value={postToUpdate.preguntas ? postToUpdate.preguntas : ""}
                                style={{ marginBottom: "1rem" }}
                                onChange={handleChange} />
                            <Form.Control placeholder="respuestas"
                                name="respuestas"
                                value={postToUpdate.respuestas ? postToUpdate.respuestas : ""}
                                style={{ marginBottom: "1rem" }}
                                onChange={handleChange} /> */}
                            <Form.Select style={{ marginBottom: '1rem' }}
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