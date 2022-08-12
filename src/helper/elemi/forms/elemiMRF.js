import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/elemi/material-request-form/";

const createElemiMRF = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiMRF = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiMRF = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiMRF = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiMRF,
  getAllElemiMRF,
  updateElemiMRF,
  deleteElemiMRF,
};
