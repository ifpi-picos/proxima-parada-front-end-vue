import axios from "axios";

export const http = axios.create({
  baseURL: "https://proxima-parada.onrender.com/api/",
  
  //baseURL: "http://localhost:3000/api/",
});