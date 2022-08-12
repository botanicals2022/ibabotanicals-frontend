import { post, get, patch, remove } from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/elemi/quality-control-parameter/";

const createElemiQCP = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiQCP = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiQCP = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiQCP = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiQCP,
  getAllElemiQCP,
  updateElemiQCP,
  deleteElemiQCP,
};
