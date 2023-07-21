import axios from "axios";

const token = localStorage.getItem("token");
const options = {
  baseURL: "http://localhost:3000",
};

if (token) {
  options.headers = { Authorization: `Bearer ${token}` };
}
const instance = axios.create({ ...options });

export default instance;

// export default () => {
//   const token = localStorage.getItem("token");
//   const options = {};
//   options.baseURL = 'http://localhost:3000';
//   options.timeout = 1000;

//   if (token) {
//     options.headers = { Authorization: `Bearer ${token}` };
//   }

//   const axiosInstance = axios.create(options);
//   return axiosInstance;
// };

