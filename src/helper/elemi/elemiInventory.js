import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/inventory/";

const createElemiInventory = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiInventory = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiInventory = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiInventory = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiInventory,
  getAllElemiInventory,
  updateElemiInventory,
  deleteElemiInventory,
};
