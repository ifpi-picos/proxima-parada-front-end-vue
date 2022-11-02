import { http } from "./config";

export default {
  
  getUserData: (userData) => {
    return http.get("/users/" + userData.id);
  },
  updateUserData: (userData) => {
    return http.put("/users/" + userData.id, userData);
  },
  newCar: (carData) => {
    return http.put("/users///hjvuyvvy", carData);
  },
};
