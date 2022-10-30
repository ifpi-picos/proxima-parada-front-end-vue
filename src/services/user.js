import { http } from "./config";

export default {
  getUserData: () => {
    return http.get("/users");
  },
  updateUserData: (userData) => {
    return http.put("/users", userData);
  },

  newCar: (carData) => {
    return http.put("/users///hjvuyvvy", carData);
  },
};
