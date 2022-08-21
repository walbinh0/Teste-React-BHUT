import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import api from "../Service/api";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface Car {
  _id: string;
  title: string;
  brand: string;
  age: number;
  price: string;
}
export default function ModalDeleteCar({
  itemCar,
  changeList,
  completeList,
}: {
  itemCar: Car;
  changeList: any;
  completeList: Car[];
}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  async function deleteItem() {
    const response = await api.delete(`cars/${itemCar._id}`);
    const deleted = completeList.findIndex((item) => item._id === itemCar._id);
    changeList(completeList.filter((item) => item._id !== itemCar._id));
    setModal(false);
  }
  return (
    <div>
      <Button outline color="danger" onClick={toggle}>
        <FaTrash />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          style={{ background: "#dc3545", color: "#fff" }}
          toggle={toggle}
        >
          Deletar veículo?
        </ModalHeader>
        <ModalBody>
          O veículo <b>{itemCar.title}</b> permanentemente da lista.
          <br />
          Tem certeza que deseja excluir o veículo?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancelar
          </Button>{" "}
          <Button color="success" onClick={deleteItem}>
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
