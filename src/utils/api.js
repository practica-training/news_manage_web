import axios from 'axios';
import store from '../store'

//let BaseUrl = "http://192.168.1.125:8888";
//let BaseUrl = "http://192.168.1.101:8888";
//let BaseUrl = "http://10.60.9.86:8888";
//let BaseUrl = "http://10.62.120.80:8888";
let BaseUrl = "http://zzhong.wang:8888";

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
        return request(BaseUrl + "/manage/userVerified/userid/" + store.state.userId, "POST", {
            user:store.state.userInfo,
            realName:verifiedInfo.realName,
            idCard:verifiedInfo.idCard,
            photo:verifiedInfo.photo
        });
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
        return request(BaseUrl + "/manage/message/getUserMessage/" + store.state.userId, "GET", {});
    },

    /**
     * 删除消息
     * @param id
     * @returns {AxiosPromise}
     */
    deleteMessage(id){
        return request(BaseUrl + "/manage/message/id/" + id, "DELETE", {});
    },

    /**
     * 修改消息（主要改为已读）
     * @param id
     */
    readMessage(message){
        message.toid = store.state.userId;
        message.user = store.state.userInfo;
        window.console.log(message);
        return request(BaseUrl + "/manage/message/id/" + message.id, "PUT", message);
    },

    /**
     * 获得指定id的消息
     * @param id
     * @returns {AxiosPromise}
     */
    getMessageInfo(id) {
        return request(BaseUrl + "/manage/message/getMessage/" + id, "GET", {});
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
     * 通过新闻标题获得新闻
     * @param newsTitle
     * @param page
     * @returns {AxiosPromise}
     */
    searchNewsByNewsTitle(newsTitle,page){
        let url = "/manage/news/name?newsTitle=" + newsTitle + "&page="+page;
        return request(BaseUrl + url, "GET", {});
    },

    /**
     * 获得新闻轮播图
     * @returns {AxiosPromise}
     */
    getNewsCarouselList(){
        return request(BaseUrl + "/manage/news/findNewsCarouselList", "GET", {});
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
     * 获得用户指定状态的新闻
     * @param page
     * @param newsState
     * @returns {AxiosPromise}
     */
    getNewsByState(page = 1,newsState = 0){
        return request(BaseUrl + "/manage/news?userid=" + store.state.userId  + "&newsState=" + newsState + "&page=" + page, "GET", {});
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
     *  添加新闻
     * @param newsTitle
     * @param newsAvatar
     * @param content
     * @returns {AxiosPromise}
     */
    addNews(newsTitle,newsAvatar,newsTypes,content){
        return request(BaseUrl + "/manage/news", "POST", {
            user:store.state.userInfo,
            newsTitle:newsTitle,
            newsAvatar:newsAvatar,
            newsTypeSet:newsTypes,
            content:content,
            newsState:0
        });
    },

    /**
     * 更新新闻
     * @param newsId
     * @param newsTitle
     * @param newsAvatar
     * @param content
     * @returns {AxiosPromise}
     */
    updateNews(newsId,newsTitle,newsAvatar,newsTypes,content,newsState = 0){
        return request(BaseUrl + "/manage/news/id/" + newsId, "PUT", {
            user:store.state.userInfo,
            newsTitle:newsTitle,
            newsAvatar:newsAvatar,
            content:content,
            newsTypeSet:newsTypes,
            newsState:newsState
        });
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

    /**
     * 获得当前用户发的评论
     * @param page
     */
    getCommentsByCurrUser(page){
        let url = "/manage/comment/userId/{userId}/{page}";
        url = url.replace("{userId}", store.state.userId);
        url = url.replace("{page}", page);
        return request(BaseUrl + url, "GET", {});
    },

    /**
     * 获得发给当前用户的评论
     * @param page
     * @returns {AxiosPromise}
     */
    getCommentsToCurrUser(page){
        let url = "/manage/comment/replyUserId/{replyUserId}/{page}";
        url = url.replace("{replyUserId}", store.state.userId);
        url = url.replace("{page}", page);
        return request(BaseUrl + url, "GET", {});
    },

    /**
     * 通过id删除评论
     * @param id
     * @returns {AxiosPromise}
     */
    deleteComment(id) {
        return request(BaseUrl + "/manage/comment/id/" + id, "DELETE", {});
    },

    /**
     * 发布评论
     * @param newsId
     * @param userId
     * @param commentContent
     * @param replyUserId
     * @returns {AxiosPromise}
     */
    submitComment(newsId,commentContent,replyUserId=""){
        let data;
        window.console.log(replyUserId)
        if(replyUserId){
            data = {
                news:{
                    id:newsId
                },
                user:{
                    id:store.state.userId,
                },
                commentContent:commentContent,
                replyUser:{
                    id:replyUserId
                }
            }
        }else{
            data = {
                news:{
                    id:newsId
                },
                user:{
                    id:store.state.userId,
                },
                commentContent:commentContent
            }
        }
        return request(BaseUrl + "/manage/comment", "POST", data);
    },

    /**
     * 申请成为新闻发布者
     * @param reason
     * @returns {AxiosPromise}
     */
    applicateNewsPublisher(reason){
        return request(BaseUrl + "/manage/UserApplyToNewsMaker", "POST", {
            user:{
                id:store.state.userId
            },
            reason:reason
        });
    },

    /**
     * 举报用户
     * @param userId
     * @param reason
     * @returns {AxiosPromise}
     */
    reportUser(userId,reason){
        return request(BaseUrl + "/manage/userReport", "POST", {
            userId:store.state.userId,
            reportedId:userId,
            reportReason:reason
        });
    },

    /**
     * 举报新闻
     * @param userId
     * @param reason
     * @returns {AxiosPromise}
     */
    reportNews(news,reason){
        return request(BaseUrl + "/manage/newsReport", "POST", {
            user:store.state.userInfo,
            news:{
                id:news.newsId
            },
            reportReason:reason
        });
    },

    test: () => {
        return request(BaseUrl + "/manage/user/findPublicList", "GET", {});
    }
}
