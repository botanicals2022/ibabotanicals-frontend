import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/oil/process/";

const createElemiProcessOil = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiProcessOil = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiProcessOil = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiProcessOil = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiProcessOil,
  getAllElemiProcessOil,
  updateElemiProcessOil,
  deleteElemiProcessOil,
};
