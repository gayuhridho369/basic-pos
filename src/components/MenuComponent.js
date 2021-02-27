import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { numberWithCommas } from "../utils/utils"

const MenuComponent = ({ menu, addToCart }) => {
    return (
        <Col md={4} xs={6} className="mb-3">
            <Card className="shadow" onClick={() => addToCart(menu)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={"assets/images/" + menu.category.name.toLowerCase() + "/" + menu.image} height="150vw" width="100%" />
                <Card.Body>
                    <Card.Title> <strong> {menu.name} </strong> <br /> ({menu.code})</Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(menu.price)}
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MenuComponent
