import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";

export default class TotalPayment extends Component {
  submitTotalPayment = (total) => {
    const order = {
      total_price: total,
      menu: this.props.carts,
    };

    axios.post(API_URL + "orders", order).then((res) => {
      this.props.history.push("/success");
    });
  };

  render() {
    const total = this.props.carts.reduce(function (result, item) {
      return result + item.total_price;
    }, 0);

    return (
      <>
        {/* Website */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }}>
              <div className="total pl-3 pt-3 pb-2 pr-3 shadow">
                <h6>
                  <strong> Total Payment :</strong>
                  <strong className="float-right mr-1">
                    Rp. {numberWithCommas(total)}
                  </strong>
                </h6>

                <Button
                  variant="info"
                  block
                  className="mt-2 mb-1"
                  onClick={() => this.submitTotalPayment(total)}
                >
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <strong className="ml-2">Pay Now</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }}>
              <div className="total pl-3 pt-3 pb-2 pr-3 shadow">
                <h6>
                  <strong> Total Payment :</strong>
                  <strong className="float-right mr-1">
                    Rp. {numberWithCommas(total)}
                  </strong>
                </h6>

                <Button
                  variant="info"
                  block
                  className="mt-2 mb-1"
                  onClick={() => this.submitTotalPayment(total)}
                >
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <strong className="ml-2">Pay Now</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
