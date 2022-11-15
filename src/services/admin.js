import { http } from "./config";

export default {
  getAdminData: () => {
    return http.get("/users");
  },
  getAllUsers: () => {
    return http.get("/admin/users");
  },

  getAllStatusRequest: () => {
    return http.get("/admin/statusRequest");
  },

  updateStatusRequest: (data) => {
    return http.put("/admin/statusRequest/" + data.id, data);
  },
};
