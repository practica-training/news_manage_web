<template>
    <div>
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
    import CmsHeader from '../components/CmsHeader'
    import CmsNavigationBar from '../components/CmsNavigationBar.vue'
    import CmsFooter from '../components/CmsFooter.vue'
    import store from '../store'
    import CmsNavigationBarPlus from "../components/CmsNavigationBarPlus";

    export default {
        name: 'Index',
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

<style scoped>

</style>
