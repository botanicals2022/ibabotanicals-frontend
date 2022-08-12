import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/raw-material/";

const createRawMaterial = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createRawMaterialPurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllRawMaterial = () => {
  return get(`${baseEndpoint}`);
};
const updateRawMaterial = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateRawMaterialPurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteRawMaterial = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createRawMaterial,
  createRawMaterialPurchaseItem,
  getAllRawMaterial,
  updateRawMaterial,
  updateRawMaterialPurchaseItem,
  deleteRawMaterial,
};
