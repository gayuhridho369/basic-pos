import { Button, Image } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "carts")
      .then((res) => {
        const carts = res.data;
        carts.map(function (item) {
          return axios.delete(API_URL + "carts/" + item.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.png" width="300" />
        <h2>Success Message</h2>
        <p>Order will be serve, please wait...</p>
        <Button variant="info" as={Link} to="/">
          Back
        </Button>
      </div>
    );
  }
}
