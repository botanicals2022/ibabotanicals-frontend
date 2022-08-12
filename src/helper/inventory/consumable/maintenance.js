import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/consumable/maintenance/";

const createMaintenanceConsumable = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createMaintenanceConsumablePurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllMaintenanceConsumable = () => {
  return get(`${baseEndpoint}`);
};
const updateMaintenanceConsumable = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateMaintenanceConsumablePurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteMaintenanceConsumable = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createMaintenanceConsumable,
  createMaintenanceConsumablePurchaseItem,
  getAllMaintenanceConsumable,
  updateMaintenanceConsumable,
  updateMaintenanceConsumablePurchaseItem,
  deleteMaintenanceConsumable,
};
