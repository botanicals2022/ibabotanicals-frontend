import { post, get, patch, remove } from "./http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/contact";

const createContact = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllContact = () => {
  return get(`${baseEndpoint}`);
};
const getSingleContact = (id) => {
  return get(`${baseEndpoint}/${id}`);
};
const updateContact = (data, id) => {
  return patch(`${baseEndpoint}/${id}`, data);
};
const deleteContact = (id) => {
  return remove(`${baseEndpoint}/${id}`);
};

export default {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
