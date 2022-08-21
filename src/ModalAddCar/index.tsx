import React, { useState } from "react";
import { Form, Field, FieldRenderProps } from "react-final-form";
import { InputType } from "reactstrap/lib/Input";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

import api from "../Service/api";

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
export default function ModalAddCar({
  completeList,
  changeList,
}: {
  completeList: Car[];
  changeList: any;
}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        + Cadastrar Veículo
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          style={{ background: "#28a745", color: "#fff" }}
          toggle={toggle}
        >
          Adicionar novo veículo
        </ModalHeader>
        <Form
          onSubmit={async (values) => {
            const response = await api.post("cars", values);
            changeList([...completeList, response.data]);
            setModal(!modal);
          }}
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
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        />
      </Modal>
    </div>
  );
}
