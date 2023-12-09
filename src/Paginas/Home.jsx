import { React, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button, Container } from "react-bootstrap";
import lupa from "../assets/lupa.png";
import global from "../assets/global.png";
import amiguitos from "../assets/amiguitos.png";
import estrellitas from "../assets/estrellitas.svg";
import estadisticas from "../assets/estadisticas.svg";
import imagen2 from "../assets/imagen2.svg";
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel';
import educacion from "../assets/educacion.jpg";
import tecnologia2 from "../assets/tecnologia2.jpg"
import gobierno from "../assets/gobierno.jpg";
import { Link, useNavigate } from "react-router-dom";
import trabajo from "../assets/trabajo.png";
import Footer from "../Components/Footer";



const Home = () => {

    const navegar = useNavigate()

    const [message, setMessage] = useState(false);

    const changeMessage = (newMessage) => {
        setMessage(newMessage);
    }

    const toComponentB = (category) => {
        navegar('/categoria', { state: { category: category } });
    }

    return (
        <div>

            <Navbar />
            <Container>
                <Carousel style={{
                    marginTop: 30
                }}>

                    <Carousel.Item>
                        <img
                            className="d-block "
                            src={educacion}
                            alt="Educación"
                            width={"100%"}
                            height={500}
                            onClick={() => toComponentB('Educación')}
                            onKeyDown={console.log('si anda')}
                        />
                        <Carousel.Caption style={{ color: "white", fontWeight: 500, backgroundColor: "rgb(20, 20, 20,  0.5 )", textShadow: " -0.3px 0.3px 0 #000, 0.3px 0.3px 0 #000, 0.3px -0.3px 0 #000, -0.3px -0.3px 0 #000" }}>
                            <h5 style={{ fontSize: 20 }}>Educación</h5>
                            <p style={{ fontSize: 20 }}> Ofrece mejores experiencias en cada etapa del aprendizaje.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={gobierno}
                            alt="encuestas gubernamentales"
                            onClick={() => toComponentB('Politica')}
                            width={"100%"}
                            height={500}
                        />
                        <Carousel.Caption style={{ color: "white", fontWeight: 500, backgroundColor: "rgb(20, 20, 20,  0.5 )", textShadow: " -0.3px 0.3px 0 #000, 0.3px 0.3px 0 #000, 0.3px -0.3px 0 #000, -0.3px -0.3px 0 #000" }}>
                            <h5 style={{ fontSize: 20 }}>Politica</h5>
                            <p style={{ fontSize: 20 }}>Mejora los servicios gubernamentales.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block"
                            src={tecnologia2}
                            alt="Tecnologia"
                            onClick={() => toComponentB('Tecnologia')}
                            width={"100%"}
                            height={500}
                        />
                        <Carousel.Caption style={{ color: "white", fontWeight: 500, backgroundColor: "rgb(20, 20, 20,  0.5 )", textShadow: " -0.3px 0.3px 0 #000, 0.3px 0.3px 0 #000, 0.3px -0.3px 0 #000, -0.3px -0.3px 0 #000" }}>
                            <h5 style={{ fontSize: 20 }}>Tecnología</h5>
                            <p style={{ fontSize: 20 }}>Construye mejores relaciones con los clientes, diseña productos exitosos e impulsa el crecimiento.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>



                <div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                        <h1>Líder de la industria por más de 10 años a nivel mundial</h1>
                    </div>

                    <div className="d-flex justify-content-around flex-wrap" style={{ marginTop: 20 }}>
                        <div className="d-flex align-items-center mb-3 flex-column text-center" style={{ maxWidth: 300 }}>
                            <img src={lupa} alt="lupita" style={{ width: 60, height: 60, alignSelf: "center" }} />
                            <h3 className="info">Más de 25 millones de preguntas cada día</h3>
                            <p className="text"> La IA se combina con casi 10 años de aprendizaje para revisar y calificar automáticamente millones de preguntas y obtener encuestas y formularios más precisos e inteligentes.</p>
                        </div>
                        <div className="d-flex align-items-center mb-3 flex-column text-center" style={{ maxWidth: 300 }}>
                            <img src={global} alt="global" style={{ width: 60, height: 60, alignSelf: "center" }} />
                            <h3 className="info">Elegida por más de 345 000 organizaciones en todo el mundo</h3>
                            <p className="text">Una plataforma de encuestas fácil de usar que requiere una capacitación mínima por parte de los usuarios y que permite a las empresas de todo el mundo recopilar los datos que necesitan rápidamente.</p>
                        </div>
                        <div className="d-flex align-items-center mb-3 flex-column text-center" style={{ maxWidth: 300 }}>
                            <img src={amiguitos} alt="compas" style={{ width: 60, height: 60, alignSelf: "center" }} />
                            <h3 className="info">Más de 17 millones de usuarios activos</h3>
                            <p className="text">Millones de usuarios activos que provienen de organizaciones de diferentes tamaños, industrias y etapas de desarrollo empresarial utilizan Truth Answer.</p>
                        </div>
                    </div>


                </div>

                <div className="pino">
                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                        <div className="text-center text-md-start">
                            <h2 >Crea encuestas y formularios online gratis en solo unos minutos</h2>
                            <p> Con uno de los softwares líderes en el mundo para creación de formularios y encuestas, pregunta, escucha y actúa rápido en función de las percepciones que obtengas.</p>
                            <div className="d-flex justify-content-center justify-content-md-start">
                                <Button variant="danger" className="mx-2" onClick={() => navegar('/crearEncuesta')}>Comienza Ahora</Button>
                                <Button variant="warning" onClick={() => navegar('/conocenos')}>Conocenos</Button>
                            </div>
                        </div>
                        <img src={trabajo} style={{ width: "50%" }} />
                    </div>
                </div>

                <div className="my-5">

                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                        <div className="text-center text-md-start">
                            <h2>Obtén acceso a cientos de preguntas escritas por expertos</h2>
                            <p>Aprovecha las plantillas y los cientos de preguntas escritas por expertos que puedes agregar a tus encuestas en segundos. Haz las preguntas correctas, minimiza los sesgos y obtén las respuestas que necesitas rápidamente.</p>
                        </div>
                        <img src={estrellitas} alt="review" style={{ width: "50%" }} />
                    </div>

                    <div className="d-flex align-items-center justify-content-center flex-column-reverse flex-md-row mt-4">
                        <img src={imagen2} alt="info" style={{ width: "50%" }} />
                        <div className="text-center text-md-end">
                            <h2>Recopila información y opiniones desde casi cualquier lugar</h2>
                            <p>Recopila respuestas mediante enlaces web y correos electrónicos, o inserta encuestas y formularios en tu sitio web para conocer lo que realmente quiere la gente. Aprovecha nuestro panel mundial para recopilar percepciones valiosas sobre el mercado.</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                        <div className="text-center text-md-start">
                            <h2>Descubre percepciones que te permitan actuar rápido</h2>
                            <p>Analiza respuestas a gran escala con los sencillos informes que crea la plataforma, o haz y personaliza paneles de control avanzados que puedes compartir con tu equipo. También puedes exportar y analizar los datos en tu software favorito.</p>
                        </div>
                        <img src={estadisticas} alt="estadisticas" style={{ width: "50%" }} />
                    </div>

                </div>



            </Container>
            <Footer />
        </div >

    )
}

export default Home;