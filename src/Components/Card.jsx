import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";



function Cardsus(props) {


    return (
        <div>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imagen} />
                <Card.Body>
                    <Card.Title>{props.titulo}</Card.Title>
                    <Card.Text>
                        {props.texto}
                    </Card.Text>
                    <Button variant="primary">{props.textboton}</Button>
                </Card.Body>
            </Card>
        </div>
    )
};


export default Cardsus;