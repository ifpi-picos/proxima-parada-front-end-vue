import { http } from "./config";

export default {
  createNewStatusRequest: (id_user) => {
    return http.post("/statusRequest/" + id_user);
  },
  getAllStatusRequest: () => {
    return http.get("/statusRequest");
  },
};
