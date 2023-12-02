import React, { useEffect, useMemo, useState } from "react";
import { useState } from "react";
import Item from "../Components/Items";



function Categoria() {
    let defaultCategorias = [
        { category: "Politica" },
        { category: "Educación" },
        { category: "Tecnologia" }]

    const [categoriaList, setCategoriaList] = useState([]);
    const [selectCategoria, setSelectCategoria] = useState("");

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



    return (
        <div>
            <h1>Categorias</h1>
            <div className="filter-container">
                <div>Filtro de categorias </div>
                <div>
                    <select
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todas</option>
                        <option value="Politica">Politica</option>
                        <option value="Educación">Educación</option>
                        <option value="Tecnologia">Tecnologia</option>
                    </select>
                </div>
            </div>
            <div className="polticaList">
                {filteredList.map((element, index) => (
                    <Item {...element} key={index} />
                ))}
            </div>
        </div>
    )
};


// import React, { useEffect, useMemo, useState } from "react";
// import Item from "./components/Item";
// import "./styles.css";

// //Filter list by category in React JS
// export default function App() {
//   // Default Value
//   var defaultSports = [
//     { name: "Table Tennis", category: "Indoor" },
//     { name: "Football", category: "Outdoor" },
//     { name: "Swimming", category: "Aquatics" },
//     { name: "Chess", category: "Indoor" },
//     { name: "BaseBall", category: "Outdoor" }
//   ];
//   const [sportList, setSportList] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState();

//   // Add default value on page load
//   useEffect(() => {
//     setSportList(defaultSports);
//   }, []);

//   // Function to get filtered list
//   function getFilteredList() {
//     // Avoid filter when selectedCategory is null
//     if (!selectedCategory) {
//       return sportList;
//     }
//     return sportList.filter((item) => item.category === selectedCategory);
//   }

//   // Avoid duplicate function calls with useMemo
//   var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

//   function handleCategoryChange(event) {
//     setSelectedCategory(event.target.value);
//   }

//   return (
//     <div className="app">
//       <div className="filter-container">
//         <div>Filter by Category:</div>
//         <div>
//           <select
//             name="category-list"
//             id="category-list"
//             onChange={handleCategoryChange}
//           >
//             <option value="">All</option>
//             <option value="Outdoor">Outdoor</option>
//             <option value="Indoor">Indoor</option>
//             <option value="Aquatics">Aquatics</option>
//           </select>
//         </div>
//       </div>
//       <div className="sport-list">
//         {filteredList.map((element, index) => (
//           <Item {...element} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// }


  

export default Categoria;