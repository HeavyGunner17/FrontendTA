import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";

function Categoria() {
    let defaultCategorias = [
        { category: "Politica" },
        { category: "Educación" },
        { category: "Tecnologia" }]

    const [categoriaList, setCategoriaList] = useState([]);
    const [selectCategoria, setSelectCategoria] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        setCategoriaList(defaultCategorias);
    }, []);

    function getFilteredList() {
        if (!selectCategoria) {
            return categoriaList;
        }
        return categoriaList.filter((item) => item.categoria === selectCategoria);
    }

    let filteredList = useMemo(getFilteredList, [selectCategoria, categoriaList]);

    function handleCategoryChange(event) {
        setSelectCategoria(event.target.value);
    }


    useEffect(() => {
        axios.get("http://localhost:5000/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => console.log(err))
    }, [filteredPosts]);


    function filtroCategoria(filtro) {
        if (filtro) {
            let array = posts.filter(post => post.categoria == filtro)
            setFilteredPosts(array)
        } else {
            setFilteredPosts(posts)
        }

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
                    {posts.length > 0 ? (posts.map((post) => {
                        return (
                            <div key={post._id}
                                style={{
                                    marginBottom: "1rem",
                                    border: "solid lightgray 1px",
                                    borderRadius: "8px"
                                }}
                            >
                                <div style={{
                                    margin: "1rem",
                                    border: "solid lightgray 1px",
                                    borderRadius: "8px"
                                }}>
                                    <h4>{post.nombre}</h4>
                                    <p>{post.estado}</p>
                                    <p>{post.categoria}</p>
                                </div>
                                <div className="d-flex">
                        <Button style={{ width: "10%", marginRight: "1rem" }}>Ver</Button>
                        </div>
                            </div>
                        )
                    })) : (<h3>No hay datos.</h3>)}
                    
                    
        </div>
            </Container >
        <Footer />
        </div >
    )
};
export default Categoria;


{/* <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      {post.nombre} {post.estado}
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">{post.preguntas} {post.respuestas}</div>
    </div>
  </div>
</div> */}
   