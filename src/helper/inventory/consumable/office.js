import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/consumable/office/";

const createOfficeConsumable = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createOfficeConsumablePurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllOfficeConsumable = () => {
  return get(`${baseEndpoint}`);
};
const updateOfficeConsumable = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateOfficeConsumablePurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteOfficeConsumable = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createOfficeConsumable,
  createOfficeConsumablePurchaseItem,
  getAllOfficeConsumable,
  updateOfficeConsumable,
  updateOfficeConsumablePurchaseItem,
  deleteOfficeConsumable,
};
