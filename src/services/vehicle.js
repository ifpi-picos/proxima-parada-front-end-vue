import { http } from "./config";

export default {
  createNewVehicle: (carData) => {
    return http.post("/vehicles", carData);
  },
  getVehicleByIdUser: (idUser) => {
    return http.get("/vehicles/id-user/" + idUser);
  },
};
