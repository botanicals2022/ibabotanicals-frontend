import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "./http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/user";

const createUser = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllUser = () => {
  return get(`${baseEndpoint}`);
};
const getSingleUser = (id) => {
  return get(`${baseEndpoint}/${id}`);
};
const updateUser = (data, id) => {
  return patch(`${baseEndpoint}/${id}`, data);
};
// for admin only
const deleteUser = (id) => {
  return remove(`${baseEndpoint}/${id}`);
};

export default {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
