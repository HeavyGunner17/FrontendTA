import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Button from 'react-bootstrap/Button';


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
        if(filtro){
        let array =  posts.filter(post => post.categoria == filtro)
        setFilteredPosts(array)
}else{
    setFilteredPosts(posts)
}
       

    }



    return (
        <div>
            <Navbar />

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
                    style={{marginLeft:"10px"}} size="sm">Filtrar categoria</Button>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Categoria;