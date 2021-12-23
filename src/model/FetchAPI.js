import axios from 'axios';

const axiosInstance = axios.create({ baseURL: "https://ubademy-ms-api-gateway2.herokuapp.com" });

const REQUEST_TIMEOUT = 10000;

axiosInstance.interceptors.request.use(
  async config => {
    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return config;
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export const fetchFromURL = async (url, params = {}, timeOutTime = REQUEST_TIMEOUT) => {
  return axiosInstance.get(url, {
    params: params,
    timeout: timeOutTime
  })
  .then(response => response)
  .catch(e => handleError(e, url, params));
}

export const postDataToURL = async (url, params = {}, strBody = "", timeOutTime = REQUEST_TIMEOUT) => {
  return axiosInstance.post(buildFullPath(url, params), strBody, {
    timeout: timeOutTime
  })
  .then(response => response)
  .catch(e => handleError(e, url, params));
}

export const putDataToURL = async (url, params = {}, content = {}, timeOutTime = REQUEST_TIMEOUT) => {
  return axiosInstance.put(buildFullPath(url, params), content, {
    timeout: timeOutTime
  })
  .then(response => response)
  .catch(e => handleError(e, url, params));
}

export const deleteDataFromURL = async (url, params = {}, content = {}, timeOutTime = REQUEST_TIMEOUT) => {
  return axiosInstance.delete(buildFullPath(url, params), { data: content }, {
    timeout: timeOutTime
  })
  .then(response => response)
  .catch(e => handleError(e, url, params));
}

const buildFullPath = (url, params) => {
  let urlParams = [];
  Object.keys(params).map(k => {
    urlParams.push(`${k}=${encodeURIComponent(params[k])}`);
  });

  return `${url}?${urlParams.join('&')}`;
}

const handleError = (error, url, params) => {
  console.log(`Error requesting ${buildFullPath(url, params)}`);
  console.log(error);
  throw error;
}
