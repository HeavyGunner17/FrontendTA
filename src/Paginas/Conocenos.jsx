import React from "react";
import edificio from "../assets/edificio.png"
import estadisticas from "../assets/estadisticas.png"
import exito from "../assets/exito.png"
import innovacion from "../assets/innovacion.png"
import lealtad from "../assets/lealtad.png"
import seguridadInformatica from "../assets/seguridadInformatica.png"
import ana from "../assets/ana.jpg"
import "./Conocenos.css"
import Navbar from "../Components/Navbar";
import { Container } from "react-bootstrap";


function Conocenos() {

    return (

        <div>

            <Navbar />
            <Container className="back">
                <div style={{ display: "flex", justifyContent: "center", marginTop: 50, textDecoration: "underline"}}>

                    <h2>Nuestras creencias guían nuestros compromisos</h2>
                </div>
                <div>
                    <p>En nuestro análisis de materialidad, encuestamos a nuestros empleados, clientes, ejecutivos, entre otras personas, para determinar qué causas son más importantes para nosotros como empresa. A continuación se detallan los problemas relevantes para nuestros colaboradores clave.</p>
                </div>
                <div className="d-flex justify-content-around" style={{ marginTop: 20 }}>
                    <div>
                        <img src={seguridadInformatica} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Sólida seguridad y privacidad de los datos​</h3>
                        <p>Proteger la información de identificación personal de nuestros clientes y empleados, así como nuestras redes y datos en un entorno tecnológico en constante evolución</p>

                        <img src={edificio} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Empresa ética y responsable</h3>
                        <p>Conducir nuestro negocio de forma ética, lo cual incluye el desarrollo responsable de tecnología (aprendizaje automático e inteligencia artificial) e invertir en nuestra gobernanza de impacto social y en la participación comunitaria</p>

                        <img src={innovacion} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Innovación de productos accesible e inclusiva</h3>
                        <p>Abordar la experiencia del cliente con plena consciencia y desarrollar investigaciones imparciales para que nuestras innovaciones de productos respalden una amplia gama de perspectivas, habilidades y antecedentes</p>
                    </div>

                    <div>
                        <img src={exito} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Bienestar y crecimiento de los empleados</h3>
                        <p>Considerar la experiencia de los empleados y su crecimiento profesional, las recompensas totales, la equidad salarial, la salud mental y la retención</p>

                        <img src={lealtad} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Diversidad, equidad e inclusión</h3>
                        <p>Atraer, hacer crecer y retener una fuerza laboral diversa, al mismo tiempo que creamos una cultura inclusiva e invertimos en nuestra iniciativa de diversidad de proveedores</p>

                        <img src={estadisticas} alt="" style={{ width: 50, height: 50, alignSelf: "center" }} />
                        <h3>Gestión de energía y emisiones</h3>
                        <p>Evaluar nuestra huella total de gases de efecto invernadero (GEI) a nivel corporativo y medir, rastrear y reducir nuestras emisiones de forma responsable</p>
                    </div>

                </div>
                <div className="d-flex flex-column align-items-center text-center ">
                    <h2 className="mt-5 text-decoration-underline">Conóce nuestro equipo:</h2>
                    <div className="mt-4 miembro">
                        <img src={ana} alt="" style={{ width: 300, height: 350, borderRadius: 150 }} />
                        <h3 >Ana Sofia Malocu</h3>
                        <h4>CEO & Web Developer</h4>
                        <p>Desarrolladora del front y backend de la pagina.</p>
                    </div>
                </div>
            </Container>
        </div >
    )

};

export default Conocenos;