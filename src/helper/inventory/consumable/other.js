import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/consumable/other/";

const createOtherConsumable = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createOtherConsumablePurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllOtherConsumable = () => {
  return get(`${baseEndpoint}`);
};
const updateOtherConsumable = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateOtherConsumablePurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteOtherConsumable = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createOtherConsumable,
  createOtherConsumablePurchaseItem,
  getAllOtherConsumable,
  updateOtherConsumable,
  updateOtherConsumablePurchaseItem,
  deleteOtherConsumable,
};
