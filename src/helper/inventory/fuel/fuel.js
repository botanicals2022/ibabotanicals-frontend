import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/inventory/fuel/";

const createFuel = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createFuelPurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllFuel = () => {
  return get(`${baseEndpoint}`);
};
const updateFuel = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateFuelPurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteFuel = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createFuel,
  createFuelPurchaseItem,
  getAllFuel,
  updateFuel,
  updateFuelPurchaseItem,
  deleteFuel,
};
