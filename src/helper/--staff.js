import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "./http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/";

const createStaff = (data) => {
  return post(`${baseEndpoint}staff`, data);
};
const getAllStaff = () => {
  return get(`${baseEndpoint}staff/`);
};
const getSingleStaff = (id) => {
  return get(`${baseEndpoint}staff/${id}`);
};
const updateStaff = (data, id) => {
  return patch(`${baseEndpoint}staff/${id}`, data);
};
const deleteStaff = (id) => {
  return remove(`${baseEndpoint}staff/${id}`);
};

export default {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff,
};
