import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';


function Categoria() {



    const [selectCategoria, setSelectCategoria] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    function createKey(id) {
        return (new Date().getTime() + id);
    }
    function handleCategoryChange(event) {
        setSelectCategoria(event.target.value);
    }

    function startUp() {
        if (filteredPosts.length != 0) {
            let arrays = [], size = 3;
            for (let i = 0; i < filteredPosts.length; i += size) {
                arrays.push(filteredPosts.slice(i, i + size));
            }
            setPaginatedPosts(arrays);
        } else {
            console.log('else')
        }
    }

    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                setPosts(res.data);
                setFilteredPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        startUp()
    }, [filteredPosts])


    function filtroCategoria(filtro) {
        console.log(filtro)
        console.log(filtro)
        if (filtro) {
            console.log('entrando if')
            console.log('entrando if')
            let array = posts.filter(post => post.categoria == filtro)
            console.log(array, 'array')
            console.log(array, 'array')
            setFilteredPosts(array)
        } else {
            console.log('entrando else')
            console.log('entrando else')
            setFilteredPosts(posts)
        }
    }

    function sendVotes(postId) {
        console.log(postId)
        // axios.put(`http://localhost:5000/posts/${postToUpdate._id}`, postToUpdate)
    }


    function handlerPaginas(index) {
        setCurrentPage(index)
        console.log(currentPage)
    }

    return (
        <div>
            <Navbar />
            <Container>
                <div className="filter-container">
                    <h2 style={{ marginLeft: "10px" }}>Categorias</h2>
                    <div>
                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                            style={{ marginLeft: "10px" }}
                        >
                            <option value="">Todas</option>
                            <option value="Politica">Politica</option>
                            <option value="Educación">Educación</option>
                            <option value="Tecnologia">Tecnologia</option>
                        </select>
                        <Button variant="warning"
                            onClick={() => filtroCategoria(selectCategoria)}
                            style={{ marginLeft: "10px" }} size="sm">Filtrar categoria</Button>
                    </div>
                </div>
             
                <div>
                    <h2 className="text-center mb-3">Lista de Encuestas</h2>
                    {paginatedPosts[currentPage] ? (paginatedPosts[currentPage].map((post, index) => {
                        return (
                            <div key={post._id}>
                                <Accordion>
                                    <Accordion.Item eventKey={post._id}>
                                        <Accordion.Header>{post.nombre}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="d-flex justify-content-end">
                                                <p>Categoría de encuesta: {post.categoria}</p>
                                            </div>
                                            <div>
                                                {post.preguntas.map((pregunta) => {
                                                    return (
                                                        <div key={createKey(pregunta.pregunta)}>
                                                            <h2 >
                                                                {pregunta.pregunta}
                                                            </h2>
                                                            <ul>
                                                                {pregunta.respuestas.map((respuesta) => {
                                                                    return (
                                                                        <div key={createKey(respuesta)}>
                                                                            <input type="radio" name={pregunta.pregunta} />
                                                                            <label style={{ marginLeft: "10px" }}>{respuesta}</label>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    )
                                                })}

                                                <Button variant="primary" onClick={() => sendVotes(post._id)} style={{ width: "100%" }}>Enviar votos</Button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>)
                    })) : (<h3>No hay datos.</h3>)}


                </div>


                <div className="d-flex justify-content-end mt-4">
                    {paginatedPosts.map((post, index) => {
                        return (
                            <Button variant="primary" key={index}
                                onClick={() => handlerPaginas(index)}
                                style={{ marginRight: '5px' }}>
                                {index + 1}
                            </Button>
                        )
                    })}
                </div>
            </Container >


            <Footer />
        </div >
    )
};
export default Categoria;

