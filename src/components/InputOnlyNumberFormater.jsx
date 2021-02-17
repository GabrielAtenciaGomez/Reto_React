import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";

//funcion que valida numeros con miles y decimales true si el numero tiene un formato aceptado
function validarExprecion(numero) {
  let regex = new RegExp("^[0-9]+([.]*[0-9]{3})*([,][0-9]+)?$");
  if (regex.test(numero + "")) {
    return true;
  } else return false;
}

//esta funcion formatea el numero ingresado
function formatearNumero(numero, cif = 3, dec = 2) {
  numero = numero.toString();
  if (numero[numero.length - 1] === "," || numero[numero.length - 1] === ".") {
    return numero;
  }
  numero = numero.replaceAll(".", "");
  numero = numero.split(","); //se separa el numero en dos partes los decimales de los miles

  let separados;
  if (numero[0].length > cif) {
    let uno = numero[0].length % cif;
    if (uno === 0) {
      separados = [];
    } else {
      separados = [numero[0].substring(0, uno)];
    }
    let posiciones = parseInt(numero[0].length / cif);

    for (let i = 0; i < posiciones; i++) {
      let pos = i * cif + uno;

      separados.push(numero[0].substring(pos, pos + 3));
    }
  } else {
    separados = [numero[0]];
  }
  let resultado;
  if (numero[1] === "") {
    numero[1] = numero[numero.length - 1];
  }
  if (numero[1]) {
    resultado = separados.join(".") + "," + numero[1];
  } else {
    resultado = separados.join(".");
  }
  return resultado;
}

export default function InputOnlyNumberFormater(props) {
  const [ctrl, setCtrl] = useState(false); // hook que guarda el estado de cuando es precionada la tecla ctrl
  const [error, setError] = useState(false); // hook para guardar si hay un error en el numero
  const [label, setLabel] = useState(props.name); //hook para cambiar el estado del label del componente

  //funcion que es ejecutada cuando ocurre un cambio en el valor del componente, es la encargada de informar
  //si el numero esta bien o no por medio del cambio de estado de hook error
  const handleChanges = (e) => {
    let dato = e.target.value;
    dato = formatearNumero(dato);
    //console.log(e.target.selectionStart);
    if (validarExprecion(dato)) {
      setError(false);
      setLabel(props.name);
      //console.log(formatearNumero(dato));
    } else {
      setError(true);
      setLabel("Error");
    }
    e.target.value = dato;
  };

  //este evento ocurre cuando se intenta pegar el texto en el componente
  // es la encargada de validar si lo que se va a pegar tiene el formato adecuado
  const handlePaste = (e) => {
    let datoPegar = e.clipboardData.getData("Text");
    if (!validarExprecion(datoPegar)) {
      e.preventDefault();
    }
  };

  //esta funcion se ejecuta cuando es precionada alguna tecla
  //permite solo la ejecution de las teclas numericas, punto, coma, flechas, borradador
  const handleDown = (e) => {
    if (e.keyCode === 17) {
      setCtrl(true);
    } else if (/[VvXxCc]/.test(e.key) && ctrl) {
      setCtrl(true);
    } else if (
      !/[0-9.,]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }
  };

  //esta funcion se ejecuta una vez es soltada una tecla, se utiliza para validar que ya se ha dejado de precionar el ctrl
  const handleUp = (e) => {
    if (e.keyCode === 17) setCtrl(false);
  };

  return (
    <TextField
      id={props.id}
      label={label}
      error={error}
      name={props.htmlFor}
      autoComplete="off"
      required
      onChange={(e) => handleChanges(e)}
      onPaste={handlePaste}
      onKeyDown={handleDown}
      onKeyUp={handleUp}
    ></TextField>
  );
}
