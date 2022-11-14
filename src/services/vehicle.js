import { http } from "./config";

export default {
  createNewVehicle: (carData) => {
    return http.post("/vehicles", carData);
  },
  uploadImageCar: (id, file) => {
    console.log("testando o url: " + "/vehicles/avatar/" + id);
    console.log("testando o file: ", file);
    return http.patch("/vehicles/avatar/" + id, file);
  },
};
