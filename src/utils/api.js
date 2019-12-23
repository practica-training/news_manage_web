import axios from 'axios';
import store from '../store'

let BaseUrl = "http://10.60.9.86:8888";

// 创建axios实例
const Request = axios.create({
    timeout: 30000, // 请求超时时间
    withCredentials: true
});

// 添加request拦截器
Request.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'x-www-form-urlencoded',
    };
    // if (store.state.token) {//如果存在token
    //     config.headers.Token = store.state.token;
    // }
    return config
}, error => {
    return Promise.reject(error);
});

// 添加response拦截器
Request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        window.console.log("发生错误");
        return Promise.reject(error)
    }
);

let request = function (url, method, data) {
    return Request({
        url: url,
        method: method,
        headers: {},
        data: data,
    })
};

export default {
    BaseUrl,
    /**
     * 用户登录
     * @param userName
     * @param userPassword
     * @returns {AxiosPromise}
     */
    userLogin: (userName, userPassword) => {
        let formData = new FormData();
        formData.append("userName",userName);
        formData.append("userPassword",userPassword);
        return request(BaseUrl + "/manage/user/userLogin", "POST", formData);
    },

    getUserInfo: () => {
        window.console.log(store.state.userId);
        return request(BaseUrl + "/manage/user/id/" + store.state.userId, "GET", {});
    },
    //
    //
    // /**
    //  * 检测用户名是否重复
    //  */
    // userCheckUserName: (userName) => {
    //     return request(BaseUrl + "/user/register?userName=" + userName, "POST", {});
    // },
    //
    // /**
    //  * 检测手机是否重复
    //  */
    // userCheckUserPhone: (userPhone) => {
    //     return request(BaseUrl + "/user/register?userPhone=" + userPhone, "POST", {});
    // },
    //
    // /**
    //  * 用户注册
    //  * @param userName
    //  * @param userPassword
    //  * @returns {AxiosPromise}
    //  */
    // userRegister: (userName, userPassword) => {
    //     return request(BaseUrl + "/user", "POST", {
    //         userName: userName,
    //         userPassword: userPassword
    //     });
    // },
    //
    // /**
    //  * 修改用户资料
    //  * @param userInfo
    //  */
    // updateUserInfo:(userInfo) =>{
    //     let data = {
    //         userNickName : userInfo.userNickName,
    //         userPhone:userInfo.userPhone,
    //     };
    //     return request(BaseUrl + "/user", "PATCH",data);
    // }
    test:() =>{
        return request(BaseUrl+"/manage/user/findPublicList", "GET",{});
    }
}
