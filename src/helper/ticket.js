import { post, get, patch, remove } from "./http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/support/ticket";

const createTicket = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllTicket = () => {
  return get(`${baseEndpoint}`);
};
const getSingleTicket = (id) => {
  return get(`${baseEndpoint}/${id}`);
};
const updateTicket = (data, id) => {
  return patch(`${baseEndpoint}/${id}`, data);
};
const deleteTicket = (id) => {
  return remove(`${baseEndpoint}/${id}`);
};

export default {
  createTicket,
  getAllTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
};
