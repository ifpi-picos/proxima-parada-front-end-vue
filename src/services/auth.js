import { http } from "./config";

export default {
  signin: (userAuth) => {
    return http.post("auth", userAuth);
  },
};
