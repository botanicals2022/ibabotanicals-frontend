import {
  post,
  get,
  patch,
  // patchformdata,
  // put,
  remove,
} from "../../http.services";

const baseEndpoint =
  process.env.REACT_APP_API_URL + "api/inventory/consumable/laboratory/";

const createLaboratoryConsumable = (data) => {
  return post(`${baseEndpoint}`, data);
};
const createLaboratoryConsumablePurchaseItem = (data) => {
  return post(`${baseEndpoint}purchase-item/`, data);
};
const getAllLaboratoryConsumable = () => {
  return get(`${baseEndpoint}`);
};
const updateLaboratoryConsumable = (data, id) => {
  return patch(`${baseEndpoint}${id}`, data);
};
const updateLaboratoryConsumablePurchaseItem = (data, id) => {
  return patch(`${baseEndpoint}${id}/purchase-item/`, data);
};
const deleteLaboratoryConsumable = (id) => {
  return remove(`${baseEndpoint}${id}`);
};

export default {
  createLaboratoryConsumable,
  createLaboratoryConsumablePurchaseItem,
  getAllLaboratoryConsumable,
  updateLaboratoryConsumable,
  updateLaboratoryConsumablePurchaseItem,
  deleteLaboratoryConsumable,
};
