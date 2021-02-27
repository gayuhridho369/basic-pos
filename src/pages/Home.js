import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Result, Categories, MenuComponent } from "../components/Index";

import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Foods",
      carts: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.name=" + this.state.categorySelected)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListCart();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.carts !== prevState.carts) {
  //     axios
  //       .get(API_URL + "carts")
  //       .then((res) => {
  //         const carts = res.data;
  //         this.setState({ carts });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  getListCart = () => {
    axios
      .get(API_URL + "carts")
      .then((res) => {
        console.log("asu");
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.name=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "carts?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            amount: 1,
            total_price: value.price,
            product: value,
          };
          axios
            .post(API_URL + "carts", cart)
            .then((res) => {
              this.getListCart();
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Product " + cart.product.name + " has added to cart",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            amount: res.data[0].amount + 1,
            total_price: res.data[0].total_price + value.price,
            product: value,
          };
          axios
            .put(API_URL + "carts/" + res.data[0].id, cart)
            .then((res) => {
              this.getListCart();
              Swal.fire({
                icon: "success",
                title: "Add",
                text: "Product " + cart.product.name + " has added to cart",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categorySelected, carts } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Categories
              changeCategory={this.changeCategory}
              categorySelected={categorySelected}
            />
            <Col md={7} className="mt-2">
              <h4>
                <strong>Products</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <MenuComponent
                      key={menu.id}
                      menu={menu}
                      addToCart={this.addToCart}
                    />
                  ))}
              </Row>
            </Col>
            <Result
              carts={carts}
              {...this.props}
              getListCart={this.getListCart}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
