// import store from "../../store/store";
import axios from "axios";
// import Swal from "sweetalert2";
// axios.defaults.baseURL = 'http://159.65.2.57:81/api';
// axios.defaults.baseURL = 'http://118.27.10.116:81/api';
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.baseURL =
// window.location.protocol + "//" + window.location.hostname + ":8000/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `token ${token}`;
    }
    return config;
  },

  async (error) => {
    return Promise.reject(error);
    //
  }
);

//  function refreshAccessToken(){
//   console.log("refresh token function");
//   // const token = localStorage.getItem("token");
//   // axios.post('refresh-token/',{
//   //   headers: {
//   //     Authorization: `token ${token}`,
//   //   },
//   // })
// }
// Response interceptor for API calls
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },

//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       localStorage.getItem("token") &&
//       error.response.data.detail &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const res = await axios.post("refresh-token/", {
//         token: localStorage.getItem("token"),
//       });

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         window.location.reload();
//       }
//       return axios(originalRequest);
//     }
//     //  else if (
//     //   error.response.status === 404 &&
//     //   error.response.data == "TOKEN_NOT_EXIST" &&
//     //   localStorage.getItem("token")
//     // ) {
//     //   // localStorage.removeItem("token");
//     //   // localStorage.clear();
//     //   window.location.href = "/dashboard";
//     //   //  await this.$router.push("/");
//     // }
//     else if (
//       error.response.status === 404 &&
//       error.response.data == "TOKEN_NOT_EXIST"
//     ) {
//       localStorage.removeItem("token");
//       localStorage.clear();
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
