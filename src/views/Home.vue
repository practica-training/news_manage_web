<template>
    <!--  主页-->
    <el-row :gutter="0" class="cms-home">
        <!--      轮播组件和新闻组件-->
        <el-col class="cms-home-box cms-bottom-distance" :span="24">
            <!--          轮播组件-->
            <el-col :md="14" :sm="24" :xs="24" style="height: 100%;">
                <cms-carousel :img-host="cmsHost" :carousel-list="cmsCarouselList" :img-url="cmsCarouselImgUrl"
                              :img-decision="cmsCarouselImgDecision" :img-route="cmsCarouselImgRoute"
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

            <el-col class="cms-padding-distance" :md="6" :sm="22" :xs="22">
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
        <!--      相关链接-->
        <el-col class="cms-home-box cms-bottom-distance" :span="24">
            <el-col :md="23" :sm="22" :xs="22">
                <el-card  style="background-color: #f0f0f0;">
                    <div slot="header" class="cms-connect-link-title cms-not-copy">相关链接<i class="el-icon-s-promotion"></i></div>
<!--                    教学管理系统-->
                    <cms-select-list :list-data="otherLinkList[1].data" :list-title="otherLinkList[1].title"></cms-select-list>
<!--                    <cms-drawer-list :list-data="otherLinkList" :list-title="otherLinkListTitle"></cms-drawer-list>-->
<!--                    其他第三方链接-->
                    <template v-for="(item,index) in schoolLinkList">
                        <cms-select-list :key="index" :list-data="item.data" :list-title="item.title"></cms-select-list>
                    </template>
                </el-card>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import CmsCarousel from "../components/CmsCarousel";          //轮播组件
    import CmsNoticeList from "../components/CmsNoticeList";      //通告公示组件
    import store from "../store";
    import CmsSelectList from "../components/CmsSelectList";
    import CmsTapsList from "../components/CmsTapsList";         //教学动态和党建思政组件

    export default {
        name: 'home',
        store,
        components: {
            CmsTapsList,
            CmsSelectList,
            CmsCarousel,
            CmsNoticeList,
        },
        data() {
            return {
                cmsHost: "",                       //域名根地址
                cmsArticleRoute: "/article",       //查看文章跳转的路由
                cmsCarouselHeight: "",

                cmsCarouselList: [],               //轮播组件显示的图片列表
                cmsCarouselImgUrl: "imageUrl",     //图片链接的字段名
                cmsCarouselImgDecision: "alterStr",//图片描述的字段名
                cmsCarouselImgRoute: "linkStr",    //图片跳转的链接字段

                newsList: [],                      //学院动态列表
                newsTitle: "学院要闻",              //学院动态组件标题
                newsUrl: "/else?1",               //学院动态'更多'的跳转地址

                noticeList: [],                    //通告公示列表
                noticeTitle: "学院通知",           //通告公示列表标题
                noticeUrl: "/else?2",              //通告公示'更多'的跳转地址

                dynamicList: [],                   //教学动态列表
                dynamicTitle: "教学动态",           //教学动态列表标题
                dynamicUrl: "/list?17",            //教学动态'更多'的跳转地址

                scienceList:[],                    //科研动态列表
                scienceTitle:"科研动态",            //科研动态标题
                scienceUrl:"/list?25",             //科研动态'更多'的跳转地址

                communistList: [],                 //党建思政列表
                communistTitle: "党建思政",         //党建思政标题
                communistUrl: "/list?11",          //党建思政'更多'的跳转地址

                studentActiveList:[],              //学生活动列表
                studentActiveTitle: "学生活动",     //学生活动标题
                studentActiveUrl: "/list?34",      //学生活动列表'更多'的跳转地址

                otherLinkList: [],                   //第三方的列表（学习资源和管理平台）
                otherLinkListTitle: "学习资源与管理平台",//第三方列表的标题

                schoolLinkList:[],                     //校内机构列表
            }
        },
        methods: {
            initCmsCarouselList() {               //初始化轮播图
                if (store.state.cmsCarouselList) {//如果已经有轮播的列表了,就不请求了
                    this.cmsCarouselList = store.state.cmsCarouselList;
                } else {//否则获取一次
                    this.$Get(this.$cmsInterface.DgutGetCarouselList.url).then((response) => {
                        this.cmsCarouselList = response.data;
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsCarouselList", response.data);
                    })
                }
            },
            initCmsNewsDynamicList(num) {               //初始化学院动态
                if (num != 0) {
                    if (store.state.cmsNewsDynamicList) {//如果已经有学院动态列表了,就不请求了
                        this.newsList = store.state.cmsNewsDynamicList.slice(0, num);
                    } else {//否则获取一次
                        this.$Get(this.$cmsInterface.DgutGetNewsList.url).then((response) => {
                            this.newsList = response.data.content.slice(0, num);
                            //获取以后保存进全局变量,减少请求
                            store.commit("initCmsNewsDynamicList", response.data.content);
                        })
                    }
                }
            },
            initCmsNoticeList() {               //初始化通告公示
                if (store.state.cmsNoticeList) {//如果已经有通告公示了,就不请求了
                    this.noticeList = store.state.cmsNoticeList;
                } else {//否则获取一次
                    this.$Get(this.$cmsInterface.DgutGetNoticeList.url).then((response) => {
                        this.noticeList = response.data.content.slice(0, 5);
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsNoticeList", this.noticeList);
                    })
                }
            },
            initCmsTeachingDynamicList() {               //初始化教学动态
                if (store.state.cmsTeachingDynamicList) {//如果已经有教学列表了,就不请求了
                    this.dynamicList = store.state.cmsTeachingDynamicList;
                } else {//否则获取一次
                    //获取教学动态url
                    let dynamic = this.$cmsInterface.DgutGetNewsListByColumns.url.replace("$columns", "17");
                    this.$Get(dynamic).then((response) => {
                        this.dynamicList = response.data.content;
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsTeachingDynamicList", this.dynamicList);
                    })
                }
            },
            initCmsScienceList(){
                if (store.state.cmsScienceList) {//如果已经有科研列表了,就不请求了
                    this.scienceList = store.state.cmsScienceList;
                } else {//否则获取一次
                    //获取科学研究动态url
                    let communist = this.$cmsInterface.DgutGetNewsListByColumns.url.replace("$columns", "25");
                    this.$Get(communist).then((response) => {
                        this.scienceList = response.data.content;
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsScienceList", response.data.content);
                    })
                }
            },
            initCmsCommunistList() {
                if (store.state.cmsCommunistList) {//如果已经有党建思政列表了,就不请求了
                    this.communistList = store.state.cmsCommunistList;
                } else {//否则获取一次
                    //获取党建思政url
                    let communist = this.$cmsInterface.DgutGetNewsListByColumns.url.replace("$columns", "11");
                    this.$Get(communist).then((response) => {
                        this.communistList = response.data.content;
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsCommunistList", response.data.content);
                    })
                }
            },
            initCmsStudentActiveList(){
                if (store.state.cmsStudentActiveList) {//如果已经有学生活动列表了,就不请求了
                    this.studentActiveList = store.state.cmsStudentActiveList;
                } else {//否则获取一次
                    //获取学生活动url
                    let communist = this.$cmsInterface.DgutGetNewsListByColumns.url.replace("$columns", "34");
                    this.$Get(communist).then((response) => {
                        this.studentActiveList = response.data.content;
                        //获取以后保存进全局变量,减少请求
                        store.commit("initCmsStudentActiveList", response.data.content);
                    })
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
            this.cmsHost = this.$cmsInterface.DgutCMSHost;        //初始化根域名
            this.initCmsCarouselList();                           //初始化轮播图
            this.initCmsNewsDynamicList(0);                       //初始化学院要闻列表
            this.initCmsNoticeList();                             //初始化学院通知列表
            this.initCmsTeachingDynamicList();                    //初始化教学动态列表
            this.initCmsCommunistList();                          //初始化党建思政列表
            this.initCmsScienceList();                            //初始化科研动态列表
            this.initCmsStudentActiveList();                      //初始化学生活动列表
            this.otherLinkList = this.$cmsInterface.OtherLinkList;//初始化第三方列表（学习资源和管理平台）
            this.schoolLinkList=this.$cmsInterface.SchoolLinkList;//初始化学校机构列表
        }
    }
</script>

<style scoped>
    .cms-home {
        padding-top: 1rem;
    }

    @media screen and (max-width: 1200px){
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
