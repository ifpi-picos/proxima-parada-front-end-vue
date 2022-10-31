import { http } from "./config";

export default {
  getAdminData: () => {
    return http.get("/users");
  },
  getAllUsers: () => {
    return http.get("/adminUsers");
  },
};
