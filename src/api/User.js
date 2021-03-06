import Api from "./Api";
import Cookie from "js-cookie";

export default {
  async auth() {
    if (!Cookie.get("user_id")) {
      await Api.get("/auth").then(response => {
        Cookie.set("user_id", response.data);
        return response.data;
      });
    }
    return { data: Cookie.get("user_id") };
  }
};
