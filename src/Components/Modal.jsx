import React, { useState } from "react";
import axios from "axios";
// import Modal from "react-bootstrap/modal"


const ModalSus = () => {

        const closeModal = () => {
            setModalIsOpen(false);
        };

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')

    function agregarUsuario() {
        var usuario = {
            nombre: nombre,
            email: email,
            contraseña: contraseña,
        }

        axios.post('/api/usuario/agregarusuario', usuario)
            .then(res => {
                alert(res.data)
            })
            .then(err => {
                console.log((err))
            })

    }
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Deseas suscribirte?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Completa los requisitos:</p>

                        <form>
                            <label htmlFor="fname">Nombre:</label>
                            <input type="text" id="fname" name="fname" value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <label htmlFor="pwd">Contraseña:</label>
                            <input type="password" id="pwd" name="pwd" value={contraseña} onChange={(e) => { setContraseña(e.target.value) }} />
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Cerrar</button>
                        <button type="button" className="btn btn-primary">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSus;