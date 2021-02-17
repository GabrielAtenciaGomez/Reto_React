import "./App.css";
import Form from "./components/FormComponent";
import TableComponent from "./components/TableComponent";
import React, { useState } from "react";
import { getDatos } from "./services/UseLocalStorage";

function App() {
  let datosAlmacenados = getDatos("datos");
  const [datos, setDatos] = useState(datosAlmacenados);
  return (
    <div className="App">
      <Form actualizar={setDatos}></Form>
      <TableComponent datos={datos}></TableComponent>
    </div>
  );
}

export default App;
