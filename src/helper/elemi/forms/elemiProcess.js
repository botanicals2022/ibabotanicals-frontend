import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/process/";

const createElemiProcess = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiProcess = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiProcess = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiProcess = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiProcess,
  getAllElemiProcess,
  updateElemiProcess,
  deleteElemiProcess,
};
