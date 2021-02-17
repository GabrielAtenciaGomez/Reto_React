import React, { useState } from "react";
import InputOnlyNumberFormater from "./InputOnlyNumberFormater";
import Select from "./SelectComponent";
import Btn from "./ButtonComponent";
import { sedData } from "../services/AxiosService";
import { getDatos } from "../services/UseLocalStorage";
import "../styles/Form.css";

export default function FormComponent(props) {
  const [selectData, setSelectData] = useState("");
  const [formKey, setKeyForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let datos = getDatos("datos");
    let valor = document.getElementById("valor").value;
    let trm = document.getElementById("trm").value;

    let formData = new FormData();
    formData.append("consecutivo", datos.length + 1);
    formData.append("valor", valor);
    formData.append("select", selectData);
    formData.append("trm", trm);
    const values = Object.fromEntries(formData.entries());

    sedData(values).then(
      () => {
        props.actualizar(getDatos("datos"));
      },
      () => {
        console.log("Falls");
      }
    );

    resetFormulario();
  };

  const getSelectData = (dato) => {
    setSelectData(dato);
  };

  const resetFormulario = () => {
    setKeyForm(!formKey);
  };

  return (
    <div className="reto-box">
      <h2>Reto React</h2>
      <form id="formulario" onSubmit={handleSubmit} key={formKey}>
        <div className="valor">
          <InputOnlyNumberFormater
            id="valor"
            htmlFor="valor"
            name="Valor"
          ></InputOnlyNumberFormater>
        </div>
        <div className="select">
          <Select
            name="opcion"
            id="select"
            getselectdata={getSelectData}
          ></Select>
        </div>
        <div className="trm">
          <InputOnlyNumberFormater
            id="trm"
            htmlFor="TRM"
            name="TRM"
          ></InputOnlyNumberFormater>
        </div>
        <Btn className="bt1" nombre="Limpiar" onClick={resetFormulario}></Btn>
        <Btn className="bt2" nombre="Guardar"></Btn>
      </form>
    </div>
  );
}
