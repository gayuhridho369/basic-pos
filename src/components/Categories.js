import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHamburger,
  faCocktail,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ name }) => {
  if (name == "Foods")
    return <FontAwesomeIcon icon={faHamburger} className="mr-2" />;
  if (name == "Drinks")
    return <FontAwesomeIcon icon={faCocktail} className="mr-2" />;
  if (name == "Snacks")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  // return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
};

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categorySelected } = this.props;
    return (
      <Col md={2} className="mt-2">
        <h4>
          <strong>Categories</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.name)}
                className={
                  categorySelected === category.name && "category-actived"
                }
                style={{ cursor: "pointer" }}
              >
                <h6>
                  <Icon name={category.name} /> {category.name}
                </h6>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
