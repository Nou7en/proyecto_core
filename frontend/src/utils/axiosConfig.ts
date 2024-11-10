import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Cambia esto por la URL de tu backend en producción
});

export default instance;
