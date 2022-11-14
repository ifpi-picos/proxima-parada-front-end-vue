import { http } from "./config";

export default {
  getUserData: (userData) => {
    return http.get("/users/" + userData.id);
  },
  updateUserData: (userData) => {
    return http.put("/users/" + userData.id, userData);
  },
  uploadImage: (file) => {
    return http.patch("/users/avatar", file);
  },
};
