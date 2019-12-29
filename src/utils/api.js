import axios from 'axios';
import store from '../store'

//let BaseUrl = "http://10.60.9.86:8888";
let BaseUrl = "http://zzhong.wang:8888";
//let BaseUrl = "http://10.62.120.80:8888";

// 创建axios实例
const Request = axios.create({
    timeout: 100000, // 请求超时时间10s
    withCredentials: true
});

// 添加request拦截器
Request.interceptors.request.use(config => {
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
        return Promise.reject(error);
    }
);

let request = function (url, method, data, headers = {}) {
    return Request({
        url: url,
        method: method,
        headers: headers,
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
        formData.append("userName", userName);
        formData.append("userPassword", userPassword);
        return request(BaseUrl + "/manage/user/userLogin", "POST", formData);
    },

    /**
     * 获取用户信息
     * @returns {AxiosPromise}
     */
    getUserInfo: (userId = "") => {
        let id = userId ? userId : store.state.userId;
        return request(BaseUrl + "/manage/user/id/" + id, "GET", {});
    },

    /**
     * 检测用户名是否重复
     * @param userName
     * @returns {AxiosPromise}
     */
    checkUserName: (userName) => {
        return request(BaseUrl + "/manage/user/userNameAlong?userName=" + userName, "GET", {});
    },

    /**
     * 检测昵称是否重复
     */
    checkUserNickname: (userNickname) => {
        return request(BaseUrl + "/manage/user/nickNameAlong?userNickname=" + userNickname, "GET", {});
    },


    /**
     * 检测手机号是否重复
     * @param userPhone
     * @returns {AxiosPromise}
     */
    checkUserPhone: (userPhone) => {
        return request(BaseUrl + "/manage/user/phoneAlong/" + userPhone, "GET", {});
    },

    /**
     * 上传头像、实名认证图片
     * @param file
     * @returns {AxiosPromise}
     */
    uploadAvatar(file) {
        let formData = new FormData(); //创建form对象
        formData.append('file', file);//通过append向form对象添加数据
        return request(BaseUrl + "/upload/image", "POST", formData, {'Content-Type': 'multipart/form-data'});
    },

    /**
     * 更新实名认证信息
     * @param verifiedInfo
     * @returns {AxiosPromise}
     */
    updateVerifiedInfo(verifiedInfo) {
        let formData = new FormData(); //创建form对象
        formData.append('realName', verifiedInfo.realName);//通过append向form对象添加数据
        formData.append('idCard', verifiedInfo.idCard);//通过append向form对象添加数据
        formData.append('photo', verifiedInfo.photo);//通过append向form对象添加数据
        formData.append('userid', store.state.userId);//通过append向form对象添加数据
        return request(BaseUrl + "/manage/userVerified", "POST", verifiedInfo);
    },

    /**
     * 获得实名认证信息
     * @returns {AxiosPromise}
     */
    getVerifiedInfo() {
        return request(BaseUrl + "/manage/userVerified/userid/" + store.state.userId, "GET", {});
    },

    /**
     * 用户注册
     * @param userName
     * @param userPassword
     * @returns {AxiosPromise}
     */
    userRegister: (userName, userPassword) => {
        let formData = new FormData(); //创建form对象
        formData.append('userName', userName);
        formData.append('userPassword', userPassword);
        return request(BaseUrl + "/manage/user/userRegist", "POST", formData);
    },

    /**
     * 修改用户资料
     * @param userInfo
     */
    updateUserInfo: (userInfo) => {
        let formData = new FormData(); //创建form对象
        formData.append('userAvatar', userInfo.userAvatar);
        formData.append('userNickname', userInfo.userNickname);
        formData.append('userPassword', userInfo.userPassword);
        formData.append('userPhone', userInfo.userPhone);
        formData.append('userSex', userInfo.userSex);
        return request(BaseUrl + "/manage/user/id/" + userInfo.id, "PUT", userInfo);
    },

    /**
     * 获得用户消息列表
     */
    getUserMessages() {
        return request(BaseUrl + "/manage/message/getUserMessage/id/" + store.state.userId, "GET", {});
    },

    /**
     * 获得指定id的消息
     * @param id
     * @returns {AxiosPromise}
     */
    getMessageInfo(id) {
        return request(BaseUrl + "/manage/message/getMessage/id/" + id, "GET", {});
    },

    /**
     * 发送消息、反馈
     * @returns {AxiosPromise}
     */
    sendMessage(content, toId = "") {
        return request(BaseUrl + "/manage/message", "POST", {
            formID: store.state.userId,
            content: content,
            isRead: 0,
            toId: toId
        });
    },

    /**
     * 获得新闻所有类型
     * @returns {AxiosPromise}
     */
    getNewsTypes() {
        return request(BaseUrl + "/manage/news/kind", "GET", {});
    },

    /**
     * 获得指定类型的新闻列表
     * @param typeId
     * @param page
     * @returns {AxiosPromise}
     */
    getNewsByTypeId(typeId, page) {
        let url = "/manage/news/kind/{id}/{page}";
        url = url.replace("{id}", typeId);
        url = url.replace("{page}", page);
        return request(BaseUrl + url, "GET", {});
    },

    /**
     * 根据新闻id获取新闻详情
     * @param newsId
     * @returns {AxiosPromise}
     */
    getNewsByNewsId(newsId){
        let url = "/manage/news/id/{id}";
        url = url.replace("{id}", newsId);
        return request(BaseUrl + url, "GET", {});
    },

    /**
     * 根据新闻Id获取新闻的评论
     * @param newsid
     * @param page
     * @returns {AxiosPromise}
     */
    getCommentsByNewsId(newsId, page) {
        let url = "/manage/news/comment/{newsid}/{page}";
        url = url.replace("{newsid}", newsId);
        url = url.replace("{page}", page);
        return request(BaseUrl + url, "GET", {});
    },

    test: () => {
        return request(BaseUrl + "/manage/user/findPublicList", "GET", {});
    }
}
