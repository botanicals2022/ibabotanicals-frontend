import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/elemi-fuel/";

const createElemiFuel = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiFuel = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiFuel = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiFuel = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiFuel,
  getAllElemiFuel,
  updateElemiFuel,
  deleteElemiFuel,
};
