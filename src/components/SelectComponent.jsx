import { React, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function SelectComponent(props) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
    props.getselectdata(event.target.value);
  };

  function items(i) {
    let item = [];
    let datos = new Map();

    for (let index = 1; index <= i; index++) {
      item.push(<MenuItem value={index}> prueba-{index}</MenuItem>);
      datos.set(index, "prueba-" + index);
    }
    window.localStorage.setItem(
      "select",
      JSON.stringify(Object.fromEntries(datos))
    );
    return item;
  }

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-helper-label">Selecciona</InputLabel>
      <Select
        {...props}
        value={id}
        onChange={handleChange}
        required
        autoComplete="off"
      >
        <MenuItem value="">
          <em>Ninguno</em>
        </MenuItem>
        {items(5)}
      </Select>
    </FormControl>
  );
}
