import { http } from "./config";

export default {
  signin: (userAuth) => {
    return http.post("/sessions", userAuth);
  },

  signup: (userData) => {
    return http.post("/users", userData);
  },

  logout: () => {
    return http.post("/sessions/logout");
  },

  resume: () => {
    return http.post("/sessions/resume");
  },
};
