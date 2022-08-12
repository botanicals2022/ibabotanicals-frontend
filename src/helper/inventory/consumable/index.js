import laboratory from "./laboratory";
import maintenance from "./maintenance";
import office from "./office";
import other from "./other";

export default {
  ...laboratory,
  ...maintenance,
  ...office,
  ...other,
};
