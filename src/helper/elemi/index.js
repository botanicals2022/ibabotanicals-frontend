// import elemi from "./elemi";
// import elemiMaterial from "./elemiMaterial";
import elemiLaboratory from "./elemiLaboratory";
import extractedElemi from "./extractedElemi";
import elemiInventory from "./elemiInventory";

import elemiProcess from "./forms/elemiProcess";
import elemiQCP from "./forms/elemiQCP";
import elemiMRF from "./forms/elemiMRF";
import elemiTFP from "./forms/elemiTFP";
import elemiTFL from "./forms/elemiTFL";

import elemiReceiveOil from "./oils/receive";
import elemiProcessOil from "./oils/process";
import elemiFinalOil from "./oils/final";

export default {
  // ...elemi,
  // ...elemiMaterial,
  ...elemiLaboratory,
  ...extractedElemi,
  ...elemiInventory,

  // forms
  ...elemiProcess,
  ...elemiQCP,
  ...elemiTFP,
  ...elemiMRF,
  ...elemiTFL,

  // oil
  ...elemiReceiveOil,
  ...elemiProcessOil,
  ...elemiFinalOil,
};
