import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/";
const apiUrl = endpoint || "";

// common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const publicRequest = axios.create({
  baseURL: apiUrl,
});

const privateRequest = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor
privateRequest.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token || "";
    }

    return config;
  },
  (err) => {
    console.log(err);
    Promise.reject(err);
  }
);

// Add a response interceptor
privateRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(error?.response);
    if (error?.response?.status === 401 || error?.response?.status === "401") {
      // localStorage.removeItem('token')
    }

    return Promise.reject(error);
  }
);

export { privateRequest, publicRequest };
