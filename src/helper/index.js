import user from "./user";
// import staff from "./--staff";
import contact from "./contact";
import elemi from "./elemi/index";
import inventory from "./inventory/index";
import ticket from "./ticket";

const RouterApi = {
  ...user,
  ...contact,
  ...elemi,
  ...inventory,
  ...ticket,
};

export default RouterApi;
