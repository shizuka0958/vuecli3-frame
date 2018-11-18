import axios from 'axios'
import qs from 'qs'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:12321/';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    // 错误的传参
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((response) => {
    if (!response.data.success) {
        // 如果需要拦截登陆验证，可在这拦截
        return Promise.reject(response);
    }
    return response;
}, (error) => {
    //网络异常
    return Promise.reject(error);
});

export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params:params})
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    , post(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}