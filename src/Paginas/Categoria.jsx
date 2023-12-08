import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Link, useLocation } from "react-router-dom";
import error from "./ErrorG";


function Categoria() {



    const location = useLocation();


    const [selectCategoria, setSelectCategoria] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    const [redirectedCategory, setRedirectedCategory] = useState();
    const [redirectedCategoryBool, setRedirectedCategoryBool] = useState(false);

    function createKey(id) {
        return (new Date().getTime() + id);
    }
    function handleCategoryChange(event) {
        setSelectCategoria(event.target.value);
    }

    function startUp() {
        if (redirectedCategory && !redirectedCategoryBool) {
            filtroCategoria(redirectedCategory);
            setRedirectedCategoryBool(true)
        } else {
            setRedirectedCategory('')
            setRedirectedCategoryBool(false)
        }
        if (filteredPosts.length != 0) {
            let arrays = [], size = 3;
            for (let i = 0; i < filteredPosts.length; i += size) {
                arrays.push(filteredPosts.slice(i, i + size));
            }
            setPaginatedPosts(arrays);
        } else {
        }
    }

    function filtroCategoria(filtro) {
        if (filtro) {
            let array = posts.filter(post => post.categoria == filtro)
            setFilteredPosts(array);
        } else {
            setFilteredPosts(posts);
        }
    }

    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                setPosts(res.data);
                setFilteredPosts(res.data);
                if (location.state !== null) {
                    setRedirectedCategory(location.state.category);
                }
            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        startUp()
    }, [filteredPosts, redirectedCategory])

    useEffect(() => {
        startUp()
    }, [])

    function handlerPaginas(index) {
        setCurrentPage(index)
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
                                                <Link to={'/error'}>
                                                    <Button variant="primary" style={{ width: "100%" }} > Enviar votos </Button></Link>
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

