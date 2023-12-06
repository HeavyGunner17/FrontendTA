import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';

function Categoria() {

    const [selectCategoria, setSelectCategoria] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);



    function createKey(id) {
        return (new Date().getTime() + id);
    }


    function handleCategoryChange(event) {
        setSelectCategoria(event.target.value);
    }


    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                setPosts(res.data);
                setFilteredPosts(res.data);
                console.log(posts);
            })
            .catch((err) => console.log(err))
    }, []);


    function filtroCategoria(filtro) {
        console.log(filtro)
        if (filtro) {
            console.log('entrando if')
            let array = posts.filter(post => post.categoria == filtro)
            console.log(array, 'array')
            setFilteredPosts(array)
        } else {
            console.log('entrando else')
            setFilteredPosts(posts)
        }
    }

    function sendVotes(postId) {
        console.log(postId)
        axios.put(`http://localhost:5000/posts/${postToUpdate._id}`, postToUpdate)
    }


    //Pagination
    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [postsEnc, setAllPostsEnc] = useState([]);
    const [pageCount, setPageCount] = useState(0)

    const getPostData = (data) => {
        return (
            data.map(post => <div className="container" key={post.id}>
                <p>User ID: {post.id}</p>
                <p>Title: {post.title}</p>
            </div>)
        )

    }

    const getAllPosts = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        const data = res.data;
        const slice = data.slice(offset - 1, offset - 1 + postsPerPage)

        // For displaying Data
        const postData = getPostData(slice)

        // Using Hooks to set value
        setAllPostsEnc(postData)
        setPageCount(Math.ceil(data.length / postsPerPage))
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        getAllPosts()
    }, [offset])


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
                    {filteredPosts.length > 0 ? (filteredPosts.map((post, index) => {
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

                    <div className="main-app">

                        {/* Display all the posts */}
                        {posts}

                        {/* Using React Paginate */}
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>


                </div>
            </Container >


            <Footer />
        </div >
    )
};
export default Categoria;
