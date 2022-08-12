import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/material/";

const createElemiMaterial = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiMaterial = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiMaterial = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiMaterial = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiMaterial,
  getAllElemiMaterial,
  updateElemiMaterial,
  deleteElemiMaterial,
};
