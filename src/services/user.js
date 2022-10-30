import { http } from "./config";

export default {
  getUserData: () => {
    return http.get("/users");
  },
};
