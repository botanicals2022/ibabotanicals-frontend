import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/purchase-item/";

const createPurchaseItem = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllPurchaseItem = () => {
  return get(`${baseEndpoint}`);
};
const updatePurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deletePurchaseItem = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createPurchaseItem,
  getAllPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
};
