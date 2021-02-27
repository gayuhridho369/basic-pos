import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import ModalCart from "./ModalCart";
import TotalPayment from "./TotalPayment";

import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      amount: 0,
      note: "",
      totalPrice: 0,
    };
  }

  handleShow = (menuCart) => {
    this.setState({
      showModal: true,
      cartDetail: menuCart,
      amount: menuCart.amount,
      note: menuCart.note,
      totalPrice: menuCart.total_price,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  add = () => {
    this.setState({
      amount: this.state.amount + 1,
      totalPrice: this.state.cartDetail.product.price * (this.state.amount + 1),
    });
  };

  less = () => {
    if (this.state.amount !== 1) {
      this.setState({
        amount: this.state.amount - 1,
        totalPrice:
          this.state.cartDetail.product.price * (this.state.amount - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      amount: this.state.amount,
      total_price: this.state.totalPrice,
      product: this.state.cartDetail.product,
      note: this.state.note,
    };
    axios
      .put(API_URL + "carts/" + this.state.cartDetail.id, data)
      .then((res) => {
        this.props.getListCart();
        Swal.fire({
          icon: "success",
          title: "Update",
          text: "Product " + data.product.name + " has updated to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteOrder = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "carts/" + id)
      .then((res) => {
        this.props.getListCart();
        Swal.fire({
          icon: "error",
          title: "Delete",
          text:
            "Product " +
            this.state.cartDetail.product.name +
            " has deleted to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { carts } = this.props;
    return (
      <Col md={3} className="mt-2">
        <h4>
          <strong>Result</strong>
        </h4>
        <hr />
        {carts.length !== 0 && (
          <Card className="overflow-auto shadow result">
            <ListGroup variant="flush">
              {carts.map((menuCart) => (
                <ListGroup.Item
                  key={menuCart.id}
                  onClick={() => this.handleShow(menuCart)}
                  style={{ cursor: "pointer" }}
                >
                  <Row>
                    <Col xs="2">
                      <h6>
                        <Badge pill variant="info">
                          {menuCart.amount}
                        </Badge>
                      </h6>
                    </Col>
                    <Col>
                      <h6>{menuCart.product.name}</h6>
                      <p>Rp. {numberWithCommas(menuCart.product.price)}</p>
                    </Col>
                    <Col>
                      <h6>
                        <strong className="float-right">
                          Rp. {numberWithCommas(menuCart.total_price)}
                        </strong>
                      </h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalCart
                handleClose={this.handleClose}
                {...this.state}
                add={this.add}
                less={this.less}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                deleteOrder={this.deleteOrder}
              />
            </ListGroup>
          </Card>
        )}
        <TotalPayment carts={carts} {...this.props} />
      </Col>
    );
  }
}
