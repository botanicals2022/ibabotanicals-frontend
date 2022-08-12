import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/oil/final/";

const createElemiFinalOil = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiFinalOil = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiFinalOil = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiFinalOil = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiFinalOil,
  getAllElemiFinalOil,
  updateElemiFinalOil,
  deleteElemiFinalOil,
};
