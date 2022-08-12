import axios from "axios";

function post(apiUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function get(apiUrl) {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function put(apiUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(apiUrl, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function patch(apiUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .patch(apiUrl, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function patchformdata(apiUrl, data) {
  return new Promise((resolve, reject) => {
    axios
      .patch(apiUrl, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function remove(apiUrl) {
  return new Promise((resolve, reject) => {
    axios
      .delete(apiUrl)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const loadToken = () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
};
loadToken();

export { get, patch, patchformdata, put, post, remove };
