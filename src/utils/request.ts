import store from "../store/index";
import axios from 'axios';
import { Message, MessageBox, Notification } from "element-ui";


//1. 创建axios对象
const requests = axios.create();

//2. 请求拦截器
requests.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error);
});

//3. 响应拦截器
requests.interceptors.response.use(response => {
    //判断code码
    return response.data;
}, error => {
    return Promise.reject(error);
});

export default requests;


