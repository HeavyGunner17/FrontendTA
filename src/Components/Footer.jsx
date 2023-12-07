import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import TA3 from '../assets/TA3.png'
import email from '../assets/email.png'
import phone from '../assets/phone.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Footer() {

  const navegar = useNavigate();

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <img src={TA3} alt="Logo de la empresa" style={{ width: 270, height: 170 }} />
              <p>
                Somos una compañia en busca de la excelencia y la perfección.
                Ayudamos a cada empresa en cada encuesta para saber el puntos de vistas y formas de pensar de cada persona.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Crea tu encuesta</h6>
              <p>

                <Link to={'/error'}>
                  Politica
                </Link>
              </p>
              <p>
                <Link to={'/error'}>
                  Educacion
                </Link>
              </p>
              <p>
                <Link to={'/error'}>
                  Tecnologia
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contactanos</h6>

              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <img src={email} style={{ width: 20, height: 20, marginRight: 3 }} />
                info@TruthAnswer.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />
                <img src={phone} style={{ width: 20, height: 20, marginRight: 3 }} />
                + 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright
        <link className='text-reset fw-bold' href="../Pagina/Home.jsx" />
      </div>
    </MDBFooter>
  );
}

export default Footer