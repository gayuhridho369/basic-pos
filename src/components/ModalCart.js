import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ModalCart = ({
  showModal,
  handleClose,
  cartDetail,
  amount,
  note,
  add,
  less,
  changeHandler,
  handleSubmit,
  totalPrice,
  deleteOrder,
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.product.name}{" "}
            <strong>(Rp. {numberWithCommas(cartDetail.product.price)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Price: </Form.Label>
              <p>
                <strong>Rp. {numberWithCommas(totalPrice)}</strong>
              </p>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Count : </Form.Label>
              <br />
              <Button
                variant="info"
                size="sm"
                className="mr-2"
                onClick={() => less()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{amount}</strong>
              <Button
                variant="info"
                size="sm"
                className="ml-2"
                onClick={() => add()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Note : </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="note"
                placeholder="Contoh : pedas, manis, nasi setengah..."
                value={note}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant="info" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteOrder(cartDetail.id)}>
            <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete Order
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nothing</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nothing</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCart;
