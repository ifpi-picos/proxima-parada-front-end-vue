import { http } from "./config";

export default {
  uploadImage: (file) => {
    return http.patch("/users/avatar", file);
  },
};
