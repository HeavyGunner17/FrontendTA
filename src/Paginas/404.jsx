import React from "react";
import { useNavigate } from "react-router-dom";


function error () {
 const navegar = navigate()


    return (
        <div>
            <div className="grid h-screen px-4 bg-white place-content-center">
  <div className="text-center">
    <h1 className="font-black text-gray-200 text-9xl">404</h1>

    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Ups!
    </p>

    <p className="mt-4 text-gray-500">Contenido no encontrado...</p>

    <Button onClick={() => navegar("/Home")} style={{ width: "100%", marginBottom: "1rem" }}>Volver al Incio</Button>
  </div>
</div>
        </div>
    )
};


export default 404;