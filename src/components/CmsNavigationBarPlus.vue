<template>
    <at-menu v-cloak mode="horizontal" active-name="0" class="cms-navbar-plus" theme="dark" width="100%">
        <at-menu-item @click.native="goHome">首页</at-menu-item>
        <template v-for="(item,index) in CmsColumns">
            <at-menu-item :name="(index+1).toString()" :key="item.id"
                          @click.native="routerTo(item.id,item.name)">
                <span class="cms-router-link cms-router-link-name" style="padding: 0;">
                    {{item.name}}
                </span>
            </at-menu-item>
        </template>
    </at-menu>
</template>

<script>
    import {Menu, MenuItem, MenuItemGroup, Submenu} from "at-ui"
    import store from '../store'

    export default {
        name: "CmsNavigationBarPlus",
        store,
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem,
            [MenuItemGroup.name]: MenuItemGroup,
            [Submenu.name]: Submenu,
        },
        props: {
            CmsColumns: {//导航栏栏目
                type: Array
            },
            CmsConfig: {//网站配置
                type: Object
            },
            CmsColumnsRouterTo: {//栏目路由跳转位置
                type: String,
            },
            CmsArticleRouterTo: {//文章路由跳转
                type: String,
            },
            CmsSearchRouterTo: {//搜索的路由跳转位置
                type: String,
            },
        },
        methods: {
            routerTo(id,name) {//路由跳转,参数:cid(选中的cid),isList(是否是list),parentCid(父节点的cid)
                this.$router.push({path: '/list',query:{id:id,name:name}});
            },
            goHome() {//返回主页
                this.$router.push({path: '/'});
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    @import "~at-ui-style";

    .cms-navbar-plus {
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
        font-size: 0.98rem;
        height: auto;
        background-color: initial;
        background: rgba(10, 16, 84, 0.8); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, rgba(21, 87, 153, 0.85), rgba(10, 16, 84, 0.9)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, rgba(21, 87, 153, 0.85), rgba(10, 16, 84, 0.9)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        z-index: 999;
        /*box-shadow: 0px 2px 1px #999999;*/
    }

    .cms-at-menu-item {
        font-size: 0.85rem !important;
    }

    .cms-router-link-name{
        color: #f0f0f0;
    }
</style>
