import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/elemi/transmittal-laboratory/";

const createElemiTFL = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiTFL = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiTFL = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiTFL = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiTFL,
  getAllElemiTFL,
  updateElemiTFL,
  deleteElemiTFL,
};
