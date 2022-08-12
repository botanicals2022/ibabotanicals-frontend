import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../http.services";

const baseEndpoint = process.env.REACT_APP_API_URL + "api/elemi/extracted/";

const createExtractedElemi = (data) => {
  return post(`${baseEndpoint}`, data);
};
const getAllExtractedElemi = () => {
  return get(`${baseEndpoint}`);
};
const updateExtractedElemi = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const deleteExtractedElemi = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createExtractedElemi,
  getAllExtractedElemi,
  updateExtractedElemi,
  deleteExtractedElemi,
};
