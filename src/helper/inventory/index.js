import consumable from "./consumable/index";
import fuelIndex from "./fuel/index";
// import generalInventory from "./generalInventory";
import purchaseItem from "./purchaseItem";
import rawMaterial from "./rawMaterial";

export default {
  ...consumable,
  ...fuelIndex,
  // ...generalInventory,
  ...purchaseItem,
  ...rawMaterial,
};
