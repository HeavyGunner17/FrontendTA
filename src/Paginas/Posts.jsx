import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';




function Posts() {
    const [posts, setPosts] = useState([])
    const navegar = useNavigate()
    const [show, setShow] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({ nombre: "", estado: "", preguntas: "", respuestas: "", categoria: "" })


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

    const updatePost = (id, nombre, estado, preguntas, respuestas, categoria) => {
        setUpdatedPost((prev) => {
            return {
                ...prev,
                id: id,
                nombre: nombre,
                estado: estado,
                preguntas: preguntas,
                respuestas: respuestas,
                categoria: categoria,
            };
        });
        handleShow();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPost(prev => {
            return ({
                ...prev,
                [name]: value
            })
        })
    };


    const saveUpdatedPost = () => {
        console.log(updatedPost)
        axios.put(`http://localhost:5000/update/${updatedPost.id._id}`, updatedPost)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        handleClose();
        window.location.reload();
    };



    return (
        <div>
            <h1>Posts</h1>
            {posts ? (
                <>
                    {posts.map((post) => {
                        return (
                            <div
                                key={post._id}
                                style={{
                                    marginBottom: "1rem",
                                    border: "solid lightgray 1px",
                                    borderRadius: "8px",
                                }}>
                                <h4>{post.nombre}</h4>
                                <p style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: "1rem",
                                }}>{post.estado}</p>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: "1rem",
                                }}>
                                    <p>{post.preguntas}</p>
                                    <p>{post.respuestas}</p>
                                    <p>{post.categoria}</p>
                                </div>
                                
                                    <Button onClick={() => updatePost(post)} style={{ width: "100%", marginRight: "1rem" }}>Actualizar</Button>
                                    <Button onClick={() => deletePost(post._id)} style={{ width: "100%" }}>Borrar</Button>

                                
                            </div>
                        );
                    })};
                </>
            ) : (
                ""
            )}
            <Button onClick={() => navegar(-1)} style={{ width: "100%", marginBottom: "1rem" }}>Volver atras</Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Encuesta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control placeholder="nombre"
                            name="nombre"
                            value={updatedPost.nombre ? updatedPost.nombre : ""}
                            style={{ marginBottom: "1rem" }}
                            onChange={handleChange} />
                        <Form.Control placeholder="estado"
                            name="estado"
                            value={updatedPost.estado ? updatedPost.estado : ""}
                            onChange={handleChange} />
                        <Form.Control placeholder="preguntas"
                            name="preguntas"
                            value={updatedPost.preguntas ? updatedPost.preguntas : ""}
                            onChange={handleChange} />
                        <Form.Control placeholder="respuestas"
                            name="respuestas"
                            value={updatedPost.respuestas ? updatedPost.respuestas : ""}
                            onChange={handleChange} />
                        <Form.Control placeholder="categoria"
                            name="categoria"
                            value={updatedPost.categoria ? updatedPost.categoria : ""}
                            onChange={handleChange} />
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
        </div>
    )
}



export default Posts;