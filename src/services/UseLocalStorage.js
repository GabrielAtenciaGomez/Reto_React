export function actualizar(key, valor) {
  const item = window.localStorage.getItem(key);
  let resultado = [];

  if (item === null) {
    console.log(valor);
    let datos = [];
    datos.push(valor);
    resultado = `${valor}`;
    window.localStorage.setItem(key, datos);
  } else {
    let datosAlmacenados = window.localStorage.getItem(key);
    datosAlmacenados += `,${valor}`;
    window.localStorage.setItem(key, datosAlmacenados);
    resultado = `[${datosAlmacenados}]`;
  }
  return resultado;
}

export function getDatos(key) {
  let resultado = window.localStorage.getItem(key);

  if (resultado) {
    let datosSelect = new Map(
      Object.entries(JSON.parse(window.localStorage.getItem("select")))
    );
    resultado = JSON.parse(`[${resultado}]`);
    for (let i = 0; i < resultado.length; i++) {
      resultado[i]["select"] = datosSelect.get(resultado[i]["select"]);
    }

    return resultado;
  } else {
    return JSON.parse("[]");
  }
}
