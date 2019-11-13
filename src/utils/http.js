import axios from 'axios';
import {Message} from "element-ui";

// 创建axios实例
const cmsHttp = axios.create({
    //timeout: 30000 // 请求超时时间
})

// 添加request拦截器
cmsHttp.interceptors.request.use(config => {
    return config
}, error => {
    Promise.reject(error)
})

// 添加respone拦截器
cmsHttp.interceptors.response.use(
    response => {
        if(response.status == 200){//请求成功
            return response.data;
        }else{
            Message({
                showClose: true,
                message: "发生错误( " + response.status + " )",
                type: 'warning'
            });
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export function Get(url, params = {}) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return cmsHttp({
        url: url,
        method: 'get',
        headers: {
        },
        params
    })
}


//封装post请求
export function Post(url, data = {}) {
    //默认配置
    let sendObject={
        url: url,
        method: 'post',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data:data
    };
    sendObject.data=JSON.stringify(data);
    return cmsHttp(sendObject)
}

//封装put方法 (resfulAPI常用)
export function Put(url,data = {}){
    return cmsHttp({
        url: url,
        method: 'put',
        headers: {
            'Content-Type':'application/json;charset=UTF-8'
        },
        data:JSON.stringify(data)
    })
}
//删除方法(resfulAPI常用)
export function Deletes(url){
    return cmsHttp({
        url: url,
        method: 'delete',
        headers: {}
    })
}

//不要忘记export
export {
    cmsHttp
}