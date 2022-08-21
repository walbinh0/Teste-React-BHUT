import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { InputType } from "reactstrap/lib/Input";

import api from "../Service/api";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface Props extends FieldRenderProps<string> {
  label: string;
}
function FieldInput({ label, input, meta, ...rest }: Props) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...input} {...rest} type={input.type as InputType} />
      {meta.error && meta.touched && (
        <span style={{ color: "#9e3131" }}>{meta.error}</span>
      )}
    </FormGroup>
  );
}
const required = (value?: string) => (value ? undefined : "Campo obrigatório");

interface Car {
  _id: string;
  title: string;
  brand: string;
  age: number;
  price: string;
}
export default function ModalEditCar({
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

  return (
    <div style={{ marginLeft: 5 }}>
      <Button outline color="primary" onClick={toggle}>
        <FaEdit />
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          style={{ background: "#007bff", color: "#fff" }}
          toggle={toggle}
        >
          Adicionar novo veículo
        </ModalHeader>
        <Form
          onSubmit={async (values) => {
            const response = await api.put(`cars/${itemCar._id}`, values);

            changeList([
              ...completeList.map((item) => {
                if (item._id === itemCar._id) {
                  return values;
                } else {
                  return item;
                }
              }),
            ]);
            setModal(!modal);
          }}
          initialValues={itemCar}
          render={({ handleSubmit }) => (
            <>
              <ModalBody>
                <Row form>
                  <Col md={6}>
                    <Field
                      type="text"
                      name="title"
                      label="Nome do veículo"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="text"
                      name="brand"
                      label="Marca"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <Field
                      type="number"
                      name="age"
                      label="Ano"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="number"
                      name="price"
                      label="Preço"
                      component={FieldInput}
                      validate={required}
                    />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancelar
                </Button>{" "}
                <Button color="success" onClick={handleSubmit}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        />
      </Modal>
    </div>
  );
}
