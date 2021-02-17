import React from "react";

export default function ButtonComponent(props) {
  return <button {...props}>{props.nombre} </button>;
}
