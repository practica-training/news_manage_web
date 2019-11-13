<template>
    <div>
        <!--        当视图是sm且sm以下时候隐藏（最多md可见）-->
<!--        <div class="hidden-sm-and-down">-->
<!--            <el-menu-->
<!--                    class="el-menu-demo cms-el-menu"-->
<!--                    mode="horizontal"-->
<!--                    :unique-opened="true"-->
<!--                    background-color="#f0f0f0"-->
<!--            >-->
<!--                <el-menu-item class="el-submenu__title cms-el-menu-item"-->
<!--                              style="line-height: 56px;border-color: initial !important;" @click="goHome">-->
<!--                    <li role="menuitem" aria-haspopup="true" class="el-submenu">-->
<!--                        <div class="el-submenu">-->
<!--                            首页-->
<!--                        </div>-->
<!--                    </li>-->
<!--                </el-menu-item>-->
<!--                <template v-for="(item,index) in CmsColumns">-->
<!--                    <el-menu-item :index="index.toString()" :key="item.cid" v-if="item.columns.length == 0"-->
<!--                                  class="el-submenu__title cms-el-menu-item"-->
<!--                                  style="line-height: 56px;border-color: initial !important;"-->
<!--                                  @click="routerTo(item.cid,item.list,item.cid)">-->
<!--                        <li role="menuitem" aria-haspopup="true" class="el-submenu">-->
<!--                            <div class="el-submenu__title">-->
<!--                                <span class="cms-router-link" style="padding: 0;">-->
<!--                                    {{item.columnName}}-->
<!--                                </span>-->
<!--                            </div>-->
<!--                        </li>-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item v-if="item.columns.length != 0" class="cms-el-menu-item" :key="item.cid"-->
<!--                                  style="border-color: initial !important;">-->
<!--                        <el-submenu :index="index.toString()">-->
<!--                            <template slot="title">{{item.columnName}}</template>-->
<!--                            <template v-for="(childItem,childIndex) in item.columns">-->
<!--                                <el-menu-item class="cms-el-menu-item"-->
<!--                                              @click="routerTo(childItem.cid,childItem.list,item.cid)"-->
<!--                                              :key="childItem.cid"-->
<!--                                              :index="index.toString() + '-' + childIndex.toString()"-->
<!--                                              style="border-color: initial !important;">-->
<!--                                        <span class="cms-router-link">-->
<!--                                            {{childItem.columnName}}-->
<!--                                        </span>-->
<!--                                </el-menu-item>-->
<!--                                <li :key="'separator' + childIndex" role="separator" class="cms-separator"></li>-->
<!--                            </template>-->
<!--                        </el-submenu>-->
<!--                    </el-menu-item>-->
<!--                </template>-->
<!--            </el-menu>-->
<!--        </div>-->

        <!--        当视图在md且md以上时隐藏(最多sm可见)-->
        <div class="hidden-md-and-up">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content cms-navigation-bar-phone">
                        <div class="cms-navigation-bar-logo" style="padding: 0 !important;">
                            <router-link to="/">
                                <img style="height: 100%;width: auto;" src="../static/images/logo/logo.png"/>
                                <span v-if="CmsConfig.websiteTitle">{{CmsConfig.websiteTitle.replace("东莞理工学院","")}}</span>
                                <span v-else>网络空间安全学院</span>
                            </router-link>
                        </div>
                        <div style="display: flex;justify-content: space-around;vertical-align: middle;">
                            <div @click="loginTo" class="cms-login-button cms-login-button-bg">
                                <span class="el-icon-user-solid"></span>
                            </div>
                            <el-button @click="isShow = !isShow" class="cms-icon-bar-button"
                                       icon="el-icon-menu"></el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <transition name="el-zoom-in-top">
                <el-row v-show="isShow" class="cms-navigation-bar-phone-box">
                    <el-col :span="24" style="float: right">
                        <el-menu
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b" :default-openeds="navigatorBarPhoneOpen">

                            <el-menu-item index="0" @click="goHome">
                                <i class="el-icon-menu"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>

                            <template v-for="(item,index) in CmsColumns">
                                <template v-if="item.columns.length != 0">
                                    <el-submenu :key="item.cid" :index="index.toString()">
                                        <template slot="title">
                                            <span style="padding-left: 1.2rem;">{{item.columnName}}</span>
                                        </template>
                                        <el-menu-item-group v-for="(childItem,childIndex) in item.columns"
                                                            :key="childItem.cid">
                                            <el-menu-item @click="routerTo(childItem.cid,childItem.list,item.cid)"
                                                          :index="index.toString() + '-' + childIndex.toString()"
                                                          style="padding-left: 3rem;">
                                                <i class="el-icon-d-arrow-right"></i>
                                                <span>{{childItem.columnName}}</span>
                                            </el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                                </template>
                                <template v-if="item.columns.length == 0">
                                    <el-menu-item :index="index.toString()" :key="item.cid"
                                                  @click="routerTo(item.cid,item.list,item.cid)">
                                        <span slot="title">{{item.columnName}}</span>
                                    </el-menu-item>
                                </template>
                            </template>
                            <el-form :inline="true" ref="form" class="demo-form-inline cms-form-flex"
                                     style="justify-content: flex-start;padding: 0.6rem 0;" size="mini">
                                <el-form-item class="cms-form-item" style="padding-left: 2.5rem;">
                                    <el-input class="cms-form-input" v-model="keyword" name="keyword"
                                              type="text"></el-input>
                                </el-form-item>
                                <el-form-item class="cms-form-item">
                                    <el-button class="cms-form-button" icon="el-icon-search" type="primary"
                                               @click="searchTo"></el-button>
                                </el-form-item>
                            </el-form>
                        </el-menu>
                    </el-col>
                </el-row>
            </transition>
        </div>
    </div>

</template>

<script>
    import store from '../store'
    import {Menu, Submenu, MenuItem, MenuItemGroup, Input, Form, FormItem} from 'element-ui'

    export default {
        name: "CmsNavigationBar",
        store,
        data() {
            return {
                isShow: false,
                activeIndex: '0',
                keyword: "",//搜索的关键词
                navigatorBarPhoneOpen: [],
            };
        },
        components: {
            [Menu.name]: Menu,
            [Submenu.name]: Submenu,
            [MenuItem.name]: MenuItem,
            [MenuItemGroup.name]: MenuItemGroup,
            [Input.name]: Input,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
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
            routerTo(cid, isList, parentCid) {//路由跳转,参数:cid(选中的cid),isList(是否是list),parentCid(父节点的cid)
                this.navigatorBarPhoneOpen = [];
                this.isShow = false;
                if (isList) {//如果是列表
                    store.commit("setCmsSelectColumnId", parentCid);//设置父节点
                    this.$router.push({path: this.CmsColumnsRouterTo + '?' + cid});
                } else {//否则是文章
                    switch (cid.toString()) {
                        case "7": {
                            cid = "1";
                            break;
                        }
                        case "8": {
                            cid = "2";
                            break;
                        }
                        case "45": {
                            cid = "3";
                            break;
                        }
                        case "48": {
                            cid = "4";
                            break;
                        }
                    }
                    let routeUrl = this.$router.resolve({
                        path: this.CmsArticleRouterTo + "?" + cid,
                    });
                    window.open(routeUrl.href, '_blank');
                }
            },
            goHome() {//返回主页
                this.navigatorBarPhoneOpen = [];
                this.isShow = false;
                this.$router.push({path: '/'});
            },
            loginTo() {
                window.open("https://css.dgut.edu.cn/admin/", "_blank");
            },
            searchTo() {//搜索
                this.navigatorBarPhoneOpen = [];
                this.isShow = false;
                let routeUrl = this.$router.resolve({
                    path: this.CmsSearchRouterTo + '?keyword=' + this.keyword,
                });
                window.open(routeUrl.href, '_blank');
            },
            handleOpen(key) {
                // eslint-disable-next-line no-console
                this.navigatorBarPhoneOpen = [];
                this.navigatorBarPhoneOpen.push(key);
            },
            handleClose() {// handleClose(key, keyPath)
                //不操作
            }
        }
    }
</script>

<style>

    .is-active {
        border: none !important;
        background-color: initial !important;
    }

    .cms-el-menu {
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
    }

    .cms-el-menu-item {
        padding: 0 !important;
        border-bottom: none !important;
        border-bottom-color: initial !important;
    }

    .cms-el-menu .el-menu-item {
        border-bottom: none !important;
        border-bottom-color: initial !important;
    }

    .el-submenu {
        font-size: 1rem;
        height: 100%;
    }

    .el-submenu > .el-submenu__title {
        height: 100% !important;
        font-size: 1rem;
    }

    .cms-el-menu-item .el-submenu__title {
        border-bottom: none !important;
        border-bottom-color: initial !important;
    }

    .cms-el-menu-item i {
        display: none;
    }

    .cms-el-menu-item:hover {
        background-color: #00b4db;
    }

    .cms-el-menu-item > li > div {
        padding: 0 0.6rem !important;
    }

    .cms-router-link {
        padding-left: 1rem;
        text-decoration: none;
        color: initial;
    }

    .cms-separator {
        height: 1px;
        width: 80%;
        margin: 0 auto;
        border-bottom: dashed #e0e0e0 1px;
    }

    .cms-form-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row;
    }

    .cms-form-item {
        margin: 0 0 4px 0 !important;
    }

    .cms-form-input > input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .cms-form-button {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
    }

    .cms-navigation-bar-phone {
        padding: 0.5rem;
        background: rgba(10, 16, 84,0.8); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, rgba(21, 87, 153,0.85), rgba(10, 16, 84,0.9)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, rgba(21, 87, 153,0.85), rgba(10, 16, 84,0.9)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        display: flex;
        justify-content: space-between;
    }

    .cms-navigation-bar-logo {
        padding: 4px;
        height: 2rem;
    }

    .cms-navigation-bar-logo > a {
        color: #F9F9F9;
        text-decoration: none;
        height: 2rem;
        display: flex;
        justify-content: space-between;
    }

    .cms-navigation-bar-logo > a > span {
        padding-left: 0.4rem;
        font-size: 1.3rem;
        line-height: 2rem;
    }

    .cms-icon-bar-button {
        padding: 4px !important;
        font-size: 1.6rem !important;
        background-color: initial !important;
        color: #ffffff !important;
        border: none !important;
    }

    .cms-navigation-bar-phone-box {
        position: absolute !important;
        width: 100%;
        z-index: 999;
    }

    .cms-login-button {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 50%;
        padding: 2px;
        border: solid 1px #2b68a5;
        cursor: pointer;
        font-size: 1rem;
        margin-top: 4px;
        text-align: center;
    }

    .cms-login-button-bg {
        transition: 500ms;
        color: #155799;
        background-color: #e9e9e9;
    }
</style>