import Axios from "axios";
import { actualizar } from "./UseLocalStorage";

const baseUrl = "https://httpbin.org/post";

export async function sedData(data) {
  return Axios.post(baseUrl, data)
    .then((response) => {
      actualizar("datos", response.data.data);
    })
    .catch((error) => {
      //console.log(error);
    });
}
