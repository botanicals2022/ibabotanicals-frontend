import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/inventory/general/";

const createGeneralInventory = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllGeneralInventory = () => {
  return get(`${baseEndpoint}`);
};
const updateGeneralInventory = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteGeneralInventory = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createGeneralInventory,
  getAllGeneralInventory,
  updateGeneralInventory,
  deleteGeneralInventory,
};
