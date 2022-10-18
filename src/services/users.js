import { http } from "./config";

export default {
  create: (userData) => {
    return http.post("", userData);
  },
};