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
            initCmsColumns() {//初始化网站栏目
                if(store.state.cmsColumns.length != 0){
                    this.cmsColumns = store.state.cmsColumns;
                }else{
                    this.$API.getNewsTypes().then(res => {
                        if(res.data.success){
                            let newsTypes = res.data.queryResult.list;
                            this.cmsColumns = newsTypes;
                            store.commit("initCmsColumns",newsTypes);
                            store.commit("initNewsAllTypes",newsTypes);
                        }
                    })
                }
            },
            initUserInfo() {
                if (store.state.userId && store.state.userInfo) {
                    return;
                } else if (store.state.userId) {
                    this.$API.getUserInfo().then(res => {
                        let userInfo = res.data;
                        store.commit("setUserInfo", userInfo);
                        localStorage.setItem("userInfo", JSON.toString(userInfo));
                    });
                }
            },
        },
        created() {
            this.initCmsColumns();
            this.initUserInfo();
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
        }
    }
</script>

<style scoped>

</style>
