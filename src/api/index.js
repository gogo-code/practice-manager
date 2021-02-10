import axios from 'axios'

// 请求超时时间
axios.defaults.timeout = 10000;
// post的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 配置请求拦截器
axios.interceptors.request.use((config)=>{
    return config;
}, (error)=>{
    return Promise.error(error);
});

// 配置响应拦截器
axios.interceptors.response.use((response)=>{
    // 过滤
    if(response.status === 200){
        return Promise.resolve(response.data);
    }else {
        return Promise.reject(response.data);
    }

}, (error)=>{
    console.log(error);
});

export  default function ajax(url = '', params = {}, type = 'GET') {
    // 0. 变量
     let promise;

    // 1. 返回promise
    return new Promise((resolve, reject)=>{
         // 1.1 判断请求的类型
        if(type.toUpperCase() === 'GET'){ // get请求
            promise = axios({
                url,
                params
            })
        }else if(type.toUpperCase() === 'POST'){ // post请求
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }

        //  1.2 处理结果并返回
        promise.then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    });
}