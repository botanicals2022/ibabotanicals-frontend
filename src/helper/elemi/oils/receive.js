import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/oil/receive/";

const createElemiReceiveOil = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiReceiveOil = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiReceiveOil = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiReceiveOil = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiReceiveOil,
  getAllElemiReceiveOil,
  updateElemiReceiveOil,
  deleteElemiReceiveOil,
};
