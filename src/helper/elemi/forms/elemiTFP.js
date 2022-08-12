import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/elemi/transmittal-production/";

const createElemiTFP = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiTFP = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiTFP = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiTFP = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiTFP,
  getAllElemiTFP,
  updateElemiTFP,
  deleteElemiTFP,
};
