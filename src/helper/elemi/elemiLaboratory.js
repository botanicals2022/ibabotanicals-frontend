import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/laboratory/";

const createElemiLaboratory = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllElemiLaboratory = () => {
  return get(`${baseEndpoint}`);
};
const updateElemiLaboratory = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteElemiLaboratory = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createElemiLaboratory,
  getAllElemiLaboratory,
  updateElemiLaboratory,
  deleteElemiLaboratory,
};
