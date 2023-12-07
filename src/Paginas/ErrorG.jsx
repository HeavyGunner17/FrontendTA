import React from "react";
import error404 from "../assets/error404.jpg"
import { useNavigate } from "react-router-dom";

function error() {
    const navegar = useNavigate()

    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={error404} alt="Error 404"
                    style={{ width: 900, height: 900 }} />
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" class="btn btn-warning" style={{ width: " 70%" }} onClick={() => {
                    navegar(-1)
                }}>Volver atras</button>
            </div>
        </div>
    )
};

export default error;