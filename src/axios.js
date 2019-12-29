import axios from 'axios'
// import router from './router';
// import store from './store';

// create an axios instance
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // timeout: 15000
});

// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//   let token = store.state.auth.token;
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${ token }`;
//   }
//   return config;
// }, (error =>  Promise.reject(error)));

// // Add a response interceptor
// instance.interceptors.response.use((response) => {
//   return response;
// }, ((error) => {
//   if (error.response.status === 401) {
//     store.dispatch('auth/logOut');
//     router.push('/login');
//   }
//   return Promise.reject(error)
// }));

export default instance