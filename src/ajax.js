import axios from 'axios';
import Cookies from 'js-cookie';
const ajax = axios.create({
    baseURL: '/apis/',
    timeout: 120000,
    withCredentials: true,
    headers: {
        token: encodeURIComponent(Cookies.get('GM_TOKEN') || ''),
        appId: '0407296056293301',
    },
});
export default ajax;
// ajax.interceptors.request.use(function (config) {
//     config.cancelToken = new CancelToken((c) => {
//         removePending(config, true);
//         const method = config.method.toLowerCase();
//         pending.push({
//             flag: `${config.url}&${method}&${(method === 'post' || method === 'put') ? JSON.stringify(config.data) : JSON.stringify(config.params)}`,
//             cancel: c
//         });
//     });
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
