import { http } from "./config";

export default {
  getUserData: (userData) => {
    return http.get("/users/" + userData.id);
  },

  updateUserData: (userData) => {
    return http.put("/users/" + userData.id, userData);
  },

  uploadImageUser: (file) => {
    return http.patch("/users/avatar", file);
  },

  createNewVehicle: (carData) => {
    return http.post("/vehicles", carData);
  },

  uploadImageCar: (id, file) => {
    return http.patch("/vehicles/avatar/" + id, file);
  },

  createNewStatusRequest: (id_user) => {
    return http.post("/statusRequest/" + id_user);
  },

  createNewPost: (postData) => {
    return http.post("/publications", postData);
  },

  getAllPosts: () => {
    return http.get("/publications");
  },
};
