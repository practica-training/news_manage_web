<template>
    <!--  主页-->
    <el-row :gutter="0" class="cms-home">
        <!--      轮播组件和新闻组件-->
        <el-col class="cms-home-box cms-bottom-distance" :span="24">
            <!--          轮播组件-->
            <el-col :md="14" :sm="24" :xs="24" style="height: 100%;">
                <cms-carousel :img-host="cmsHost" :carousel-list="cmsCarouselList"
                              :carousel-route="cmsArticleRoute" ref="CmsCarousel"
                              @getCarouselHeight="getCarouselHeight"></cms-carousel>
            </el-col>
            <!--          新闻组件-->
            <el-col class="cms-padding-distance cms-news-component" :md="8" :sm="22" :xs="22" style="height: 100%;">
                <cms-notice-list :notice-list="newsList" :notice-title="newsTitle"
                                 :notice-url="newsUrl" :time-right="false"></cms-notice-list>
<!--                <cms-news-list :list-data="newsList" :list-title="newsTitle" :list-url="newsUrl"></cms-news-list>-->
            </el-col>
        </el-col>

        <!--       学院通知、教学动态、党建引领-->
        <el-col :span="24" class="cms-home-box cms-bottom-distance">
            <!--            移动端显示的学院通知-->
            <el-col class="cms-padding-distance hidden-md-and-up" :md="8" :sm="22" :xs="22">
                <cms-notice-list :notice-list="noticeList" :notice-title="noticeTitle"
                                 :notice-url="noticeUrl" :time-right="false"></cms-notice-list>
            </el-col>


            <!--            教学动态、党建思政-->
            <el-col class="cms-padding-distance" :md="7" :sm="22" :xs="22">
                <cms-taps-list :list-title1="dynamicTitle" :list-data1="dynamicList" :list-url1="dynamicUrl"
                               :list-title2="scienceTitle" :list-data2="scienceList" :list-url2="scienceUrl"
                               :one-show-in-line="1"></cms-taps-list>
            </el-col>

            <el-col class="cms-padding-distance" :md="7" :sm="22" :xs="22">
                <!--                科研动态-->
                <cms-taps-list :list-title1="communistTitle" :list-data1="communistList" :list-url1="communistUrl"
                               :list-title2="studentActiveTitle" :list-data2="studentActiveList" :list-url2="studentActiveUrl"
                               :one-show-in-line="1"></cms-taps-list>
            </el-col>

            <!--            PC端显示的学院通知-->
            <el-col class="cms-padding-distance hidden-sm-and-down" :md="8" :sm="22" :xs="22">
                <cms-notice-list :notice-list="noticeList" :notice-title="noticeTitle"
                                 :notice-url="noticeUrl" :time-right="false"></cms-notice-list>
            </el-col>

        </el-col>
    </el-row>
</template>

<script>
    import CmsCarousel from "../components/CmsCarousel";          //轮播组件
    import CmsNoticeList from "../components/CmsNoticeList";      //通告公示组件
    import store from "../store";
    import CmsTapsList from "../components/CmsTapsList";         //教学动态和党建思政组件

    export default {
        name: 'home',
        store,
        components: {
            CmsTapsList,
            CmsCarousel,
            CmsNoticeList,
        },
        data() {
            return {
                cmsHost: this.$API.BaseUrl,                       //域名根地址
                cmsArticleRoute: "/article",       //查看文章跳转的路由
                cmsCarouselHeight: "",

                cmsCarouselList: [],               //轮播组件显示的图片列表

                newsList: [],
                newsTitle: "财经新闻",
                newsUrl: "/list?id=8abef8d06f59e83e016f59e85bb70000&name=财经",

                noticeList: [],
                noticeTitle: "教育新闻",
                noticeUrl: "/list?id=8abef8d06f59e83e016f59e85db80004&name=教育",

                dynamicList: [],
                dynamicTitle: "科技新闻",
                dynamicUrl: "/list?id=8abef8d06f59e83e016f59e85c6e0001&name=科技",

                scienceList:[],
                scienceTitle:"娱乐新闻",
                scienceUrl:"/list?id=8abef8d06f59e83e016f59e85f060007&name=娱乐",

                communistList: [],
                communistTitle: "军事新闻",
                communistUrl: "/list?id=8abef8d06f59e83e016f59e85e960006&name=军事",

                studentActiveList:[],
                studentActiveTitle: "时尚新闻",
                studentActiveUrl: "/list?id=8abef8d06f59e83e016f59e85f740008&name=时尚",
            }
        },
        methods: {
            initCmsCarouselList() {               //初始化轮播图
                if (store.state.cmsCarouselList) {//如果已经有轮播的列表了,就不请求了
                    this.cmsCarouselList = store.state.cmsCarouselList;
                } else {//否则获取一次
                    this.$API.getNewsCarouselList().then(res => {
                        if (res.data.success) {
                            this.cmsCarouselList = res.data.queryResult.list;//列表数据
                            window.console.log(this.cmsCarouselList)
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsCarouselList", this.cmsCarouselList);
                        }
                    })
                }
            },
            initCmsNewsDynamicList(num) {               //初始化财经新闻
                if (num != 0) {
                    if (store.state.cmsNewsDynamicList) {//如果已经有财经新闻列表了,就不请求了
                        this.newsList = store.state.cmsNewsDynamicList.slice(0, num);
                    } else {//否则获取一次
                        this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85bb70000", 1).then(res => {
                            if (res.data.success) {
                                this.newsList = res.data.queryResult.list;//列表数据
                                //获取以后保存进全局变量,减少请求
                                store.commit("initCmsNewsDynamicList", this.newsList);
                            }
                        });
                    }
                }
            },
            initCmsNoticeList() {               //初始化教育新闻
                if (store.state.cmsNoticeList) {
                    this.noticeList = store.state.cmsNoticeList;
                } else {//否则获取一次
                    this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85db80004", 1).then(res => {
                        if (res.data.success) {
                            this.noticeList = res.data.queryResult.list;//列表数据
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsNoticeList", this.noticeList);
                        }
                    });
                }
            },
            initCmsTeachingDynamicList() {               //初始化科技新闻
                if (store.state.cmsTeachingDynamicList) {
                    this.dynamicList = store.state.cmsTeachingDynamicList;
                } else {//否则获取一次
                    this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85c6e0001", 1).then(res => {
                        if (res.data.success) {
                            this.dynamicList = res.data.queryResult.list;//列表数据
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsTeachingDynamicList", this.dynamicList);
                        }
                    });
                }
            },
            initCmsScienceList(){//娱乐新闻
                if (store.state.cmsScienceList) {
                    this.scienceList = store.state.cmsScienceList;
                } else {//否则获取一次
                    this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85f060007", 1).then(res => {
                        if (res.data.success) {
                            this.scienceList = res.data.queryResult.list;//列表数据
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsScienceList", this.scienceList);
                        }
                    });
                }
            },
            initCmsCommunistList() {//军事新闻
                if (store.state.cmsCommunistList) {
                    this.communistList = store.state.cmsCommunistList;
                } else {//否则获取一次
                    this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85e960006", 1).then(res => {
                        if (res.data.success) {
                            this.communistList = res.data.queryResult.list;//列表数据
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsCommunistList", this.communistList);
                        }
                    });
                }
            },
            initCmsStudentActiveList(){//时尚新闻 8abef8d06f59e83e016f59e85f740008
                if (store.state.cmsStudentActiveList) {//如果已经有学生活动列表了,就不请求了
                    this.studentActiveList = store.state.cmsStudentActiveList;
                } else {//否则获取一次
                    this.$API.getNewsByTypeId("8abef8d06f59e83e016f59e85f740008", 1).then(res => {
                        if (res.data.success) {
                            this.studentActiveList =  res.data.queryResult.list;//列表数据
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsStudentActiveList", this.studentActiveList);
                        }
                    });
                }
            },
            getCarouselHeight(data) {//得到轮播图的高度,子组件返回
                let num = parseInt(data / 90);
                if (num < 4) {
                    num = 4;
                }
                this.initCmsNewsDynamicList(num);
            }
        },
        created() {
            this.initCmsCarouselList();                           //初始化轮播图
            this.initCmsNewsDynamicList(0);                  //初始化学院要闻列表
            this.initCmsNoticeList();                             //初始化学院通知列表
            this.initCmsTeachingDynamicList();                    //初始化教学动态列表
            this.initCmsCommunistList();                          //初始化党建思政列表
            this.initCmsScienceList();                            //初始化科研动态列表
            this.initCmsStudentActiveList();                      //初始化学生活动列表
        }
    }
</script>

<style scoped>
    .cms-home {
        padding-top: 1rem;
    }

    @media screen and (max-width: 991px){
        .cms-home{
            padding-top: 0;
        }
    }

    .cms-home-box {
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
    }

    .cms-news-component {
        padding-top: 1rem !important;
    }

    .cms-bottom-distance {
        margin-bottom: 1rem;
    }

    .cms-padding-distance {
        padding: 1rem 0;
    }

    .cms-connect-link-title{
        font-size: 1rem;
        font-weight: bold;
        color: #3184C3;
    }
</style>
