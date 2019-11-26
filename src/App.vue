<template>
    <div id="app" v-cloak>
        <div class="cms-header-bg" style="padding: 0">
            <cms-header :cms-config="cmsConfig" :cms-search-router-to="cmsSearchRouterTo"></cms-header>
            <cms-navigation-bar-plus class="hidden-sm-and-down" :cms-columns="cmsColumns" :cms-config="cmsConfig"
                                     :cms-columns-router-to="cmsColumnsRouterTo"
                                     :cms-search-router-to="cmsSearchRouterTo"
                                     :cms-article-router-to="cmsArticleRouterTo"></cms-navigation-bar-plus>

            <cms-navigation-bar class="hidden-md-and-up" :cms-columns="cmsColumns" :cms-config="cmsConfig"
                                :cms-columns-router-to="cmsColumnsRouterTo"
                                :cms-search-router-to="cmsSearchRouterTo"
                                :cms-article-router-to="cmsArticleRouterTo"></cms-navigation-bar>
        </div>
        <router-view/>
        <!--        回到顶部组件-->
        <el-backtop :right="30"></el-backtop>
        <cms-footer :cms-config="cmsConfig" :has-scroll="hasScroll" :is-show="footerShow"></cms-footer>
    </div>
</template>

<script>
    import {Backtop} from 'element-ui'                            //回到顶部组件
    import CmsHeader from './components/CmsHeader'
    import CmsNavigationBar from './components/CmsNavigationBar.vue'
    import CmsFooter from './components/CmsFooter.vue'
    import store from './store'
    import CmsSideBox from "./components/CmsSideBox";
    import CmsNavigationBarPlus from "./components/CmsNavigationBarPlus";

    export default {
        name: 'home',
        store,
        data() {
            return {
                cmsConfig: {},                  //网站配置
                cmsColumns: [],                 //网站导航栏栏目
                cmsColumnsRouterTo: "/list",    //栏目跳转位置
                cmsArticleRouterTo: "/article", //文章跳转位置
                cmsSearchRouterTo: "/search",   //搜索跳转位置
                hasScroll: false,                //判断是否有滚动条
                footerShow: false,               //判断是否显示底部
            }
        },
        watch: {
            '$route'(newVal) {//路由发生变化就重新检测一次有没有滚动条
                if (newVal.name != "home") {//如果不是主页不显示footer
                    this.footerShow = false;
                } else {
                    this.footerShow = true;
                    this.$nextTick(function () {
                        this.hasScroll = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
                    })
                }
            }
        },
        components: {
            CmsNavigationBarPlus,
            [Backtop.name]: Backtop,
            CmsSideBox,
            CmsHeader,
            CmsNavigationBar,
            CmsFooter
        },
        methods: {
            initCmsConfig() {//初始化网站配置
                this.$Get(this.$cmsInterface.DgutGetWebsiteConfig.url).then(res => {
                    this.cmsConfig = res.data;
                    store.commit("initCmsConfig", res.data);
                })
            },
            initCmsColumns() {//初始化网站栏目
                this.$Get(this.$cmsInterface.DgutGetAllColumns.url).then(res => {
                    this.cmsColumns = res.data.slice(1);//从第一个开始
                    store.commit("initCmsColumns", res.data);
                })
            }
        },
        created() {
            this.initCmsConfig();
            this.initCmsColumns();
        },
        mounted() {
            if (this.$route.name != 'home') {
                this.footerShow = false;
            } else {
                this.footerShow = true;
                this.$nextTick(function () {
                    this.hasScroll = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
                })
            }
            // eslint-disable-next-line no-console
            console.log("%c东莞理工学院网络空间安全学院欢迎您\n%c\n%c扫描二维码关注学院公众号\n\n\n%c【如果发现什么bug或者有什么体验上的建议,欢迎联系1114822617@qq.com】", "font-family:'华文楷体';font-size:1.5rem;color: #155799;transform: scale(0.8,1.3);\n" +
                "        -ms-transform: scale(0.8,1.3);\n" +
                "        -webkit-transform: scale(0.8,1.3);\n" +
                "        -moz-transform: scale(0.8,1.3);\n" +
                "        -o-transform: scale(0.8,1.3);text-indent:2em;", "padding:6rem;background-image: url('https://mp.weixin.qq.com/mp/qrcode?scene=10000004&size=102&__biz=MjM5MzQ3MzA1NQ==&mid=2651302514&idx=1&sn=428c1918272bd4809ef957fd0c26b55e&send_time=');background-size:100% 100%;", "font-size:1rem;color:#666666;", "font-size:0.9rem;color: #999999;");
        }
    }

</script>

<style>
    @import "static/css/cms_index.css";

    [v-cloak] {
        display: none;
    }

    ::-webkit-scrollbar {
        width: 5px; /*对垂直流动条有效*/
        height: 5px; /*对水平流动条有效*/
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    ::-webkit-scrollbar-track {
        /*内阴影*/
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
        /*background-color: initial;*/
        /*border-radius: 3px;*/
    }


    /*定义滑块颜色、内阴影及圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background-color: #e0e0e0;
    }

    /*定义两端按钮的样式*/
    ::-webkit-scrollbar-button {
        /*background-color:cyan;*/
    }

    /*定义右下角汇合处的样式*/
    ::-webkit-scrollbar-corner {
        /*background:khaki;*/
    }

    input::-webkit-input-placeholder { /*WebKit browsers*/
        color: #909090 !important;
    }

    input::-moz-input-placeholder { /*Mozilla Firefox*/
        color: #909090 !important;
    }

    input::-ms-input-placeholder { /*Internet Explorer*/
        color: #909090 !important;
    }

    .el-card__header {
        padding: 0.5rem 1rem !important;
        background-color: #f0f0f0;
    }

    .el-card__body {
        padding: 0.5rem !important;
    }

    .cms-header-bg {
        background-image: url("static/images/bg.png");
    }

    @media screen and (max-width: 1365px) {
        .at-menu__submenu-title {
            text-align: center;
            width: 6.3rem;
            padding: 0 !important;
        }
    }


    @media screen and (min-width: 1366px) and (max-width: 1919px) {
        .at-menu__submenu-title {
            text-align: center;
            width: 8rem;
            padding: 0 0.6rem !important;
        }
    }

    @media screen and (min-width: 1920px) {
        .at-menu__submenu-title {
            width: 10rem;
            text-align: center;
            padding: 0 1rem !important;
        }
    }

    .at-menu__item {
        text-align: center !important;
    }

    .at-menu__item-link {
        white-space: normal !important;
    }

    .at-table__content {
        border: none;
    }

    .el-tabs__nav {
        width: 100%;
    }

    #tab-0 {
        width: 50%;
        padding-right: 0.4rem;
    }

    #tab-1 {
        width: 50%;
        padding-left: 0.4rem;
    }

    .el-tabs__active-bar {
        display: none;
    }

    .at-menu__submenu-title > i {
        display: none !important;
    }

    .el-timeline-item {
        padding-bottom: 6px;
    }
</style>
