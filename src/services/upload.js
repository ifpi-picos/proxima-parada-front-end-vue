import { http } from "./config";

export default {
  uploadImage: (file) => {
    return http.post("/upload", file);
  },
};
