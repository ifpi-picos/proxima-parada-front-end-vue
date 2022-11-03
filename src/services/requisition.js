import { http } from "./config";

export default {
  createNewRequisition: (id_user) => {
    return http.post("/requisitions", id_user);
  },
  getAllRequisitions:()=>{
    return http.get("/requisitions");
  }
};
