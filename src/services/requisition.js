import { http } from "./config";

export default {
  createNewRequisition: (reqsitionData) => {
    return http.post("/requisitions", reqsitionData);
  },
  getAllRequisitions:()=>{
    return http.get("/requisitions");
  }
};
