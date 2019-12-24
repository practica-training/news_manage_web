import Vue from 'vue'
import Vuex from 'vuex'
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId:localStorage.getItem("userId")?localStorage.getItem("userId"):"",//用户Id
        userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):"",//用户信息
        cmsConfig: "",                           //网站配置
        cmsColumns: [],                          //网站栏目
        cmsCarouselList: null,                   //首页轮播图
        cmsSelectColumnId: "",                   //当前选中的栏目的父节点
        cmsNewsDynamicList: null,                //首页新闻动态列表
        cmsNoticeList: null,                     //首页通告公示列表
        cmsTeachingDynamicList: null,            //首页教学动态列表
        cmsCommunistList: null,                  //首页党建思政列表
        cmsStudentActiveList:null,               //首页学生活动列表
        cmsScienceList:null,                     //首页科研动态列表
    },
    mutations: {
        setUserId(state,data){//保存用户ID
            state.userId = data;
        },
        setUserInfo(state,data){//保存用户信息
            state.userInfo = data;
        },
        initCmsConfig(state, data) {             //初始化网站配置
            state.cmsConfig = data;
        },
        initCmsColumns(state, data) {            //初始化网站栏目
            state.cmsColumns = data;
        },
        initCmsCarouselList(state, data) {       //初始化轮播图列表
            state.cmsCarouselList = data;
        },
        setCmsSelectColumnId(state, data) {      //设置当前选中的栏目的父节点cid
            state.cmsSelectColumnId = data;
        },
        initCmsNewsDynamicList(state, data) {    //初始化新闻动态列表
            state.cmsNewsDynamicList = data;
        },
        initCmsNoticeList(state, data) {         //初始化通告公示列表
            state.cmsNoticeList = data;
        },
        initCmsTeachingDynamicList(state, data) {//初始化教学动态列表
            state.cmsTeachingDynamicList = data;
        },
        initCmsCommunistList(state, data) {      //初始化党建思政列表
            state.cmsCommunistList = data;
        },
        initCmsStudentActiveList(state,data){    //初始化学生动态列表
            state.cmsStudentActiveList = data;
        },
        initCmsScienceList(state,data){          //初始化科研动态列表
            state.cmsScienceList = data;
        }
    },
    actions: {}
})
