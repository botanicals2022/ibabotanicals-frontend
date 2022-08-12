import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi";

const createElemi = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemi = () => {
  return get(`${baseEndpoint}`);
};
const updateElemi = (data, id) => {
  return patch(`${baseEndpoint}/${id}`, data);
};
const deleteElemi = (id) => {
  return remove(`${baseEndpoint}/${id}`);
};

export default {
  createElemi,
  getAllElemi,
  updateElemi,
  deleteElemi,
};
