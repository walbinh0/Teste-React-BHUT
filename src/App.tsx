import React, { useState, useEffect } from "react";
import api from "./Service/api";
import { Table } from "reactstrap";
import ModalAddCar from "./ModalAddCar";
import ModalDeleteCar from "./ModalDeleteCar";
import ModalEditCar from "./ModalEditCar";

import GlobalStyles from "./styles/GlobalStyles";

import { ButtonBox } from "./styles";

interface Cars {
  _id: string;
  title: string;
  brand: string;
  age: number;
  price: string;
}
function App() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function qualquerNome() {
      const response = await api.get("cars");

      console.log(response.data);
      setLista(response.data);
    }
    qualquerNome();
  }, []);

  return (
    <div>
      <ModalAddCar completeList={lista} changeList={setLista} />
      <Table hover>
        <thead>
          <th>Nome</th>
          <th>Marca</th>
          <th>Ano</th>
          <th>Preço</th>
          <th className="text-right">Ações</th>
        </thead>
        <tbody>
          {lista.map((list: Cars) => (
            <tr key={list._id}>
              <th>{list.title}</th>
              <th>{list.brand}</th>
              <th>{list.age}</th>
              <th>{list.price}</th>
              <th className="text-right">
                <ButtonBox>
                  <ModalDeleteCar
                    itemCar={list}
                    changeList={setLista}
                    completeList={lista}
                  />
                  <ModalEditCar
                    itemCar={list}
                    changeList={setLista}
                    completeList={lista}
                  />
                </ButtonBox>
              </th>
            </tr>
          ))}
          <th></th>
        </tbody>
      </Table>

      <GlobalStyles />
    </div>
  );
}

export default App;
