<template>
    <!--    首部组件-->
    <!-- header -->
    <header>
        <div class="hidden-sm-and-down">
            <el-row :gutter="10" style="margin: 0;">
                <el-col :span="24" class="cms-header">
                    <div class="cms-header-bgc"></div>
                    <el-col :span="14" class="cms-no-padding">
                        <div class="cms-title-bar">
                            <!--                        显示LOGO-->
                            <div class="cms-title-logo" @click="toCyberspaceWebSide">
                                <img src="../static/images/logo/logo.png"/>
                            </div>
                            <!--                        显示中文标题和英文标题-->
                            <div class="cms-title-head">
                                <div class="cms-title cms-not-copy" @click="toScholWebSide" title="点击跳转学校官网">
                                    <span class="cms-title-school">ShowNews</span>
                                    <span class="cms-title-school-en">闻,所未闻</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="10" class="cms-header-other-box cms-no-padding">
                        <div class="cms-date-box">
                            <!--                        时间-->
                            <div class="cms-date" @click="showSchoolDate = true">{{cmsDate}}</div>
                            <!--                        搜索框和登录-->
                            <div class="cms-login-search">
                                <!--                            搜索-->
                                <div class="cms-search-box">
                                    <el-form :inline="true" ref="form" class="cms-form-flex"
                                             size="mini"
                                             style="outline: none;">
                                        <el-form-item class="cms-form-item">
                                            <el-input class="cms-form-input" v-model="keyword" name="keyword"
                                                      type="text"></el-input>
                                        </el-form-item>

                                        <!--                                    防止转行-->
                                        <el-form-item style="display: none;">
                                            <el-input type="text"></el-input>
                                        </el-form-item>
                                        <!--                                    防止转行-->

                                        <el-form-item class="cms-form-item">
                                            <el-button class="cms-form-button" icon="el-icon-search" type="primary"
                                                       @click="searchTo"></el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>

                                <!--                            登录-->
                                <div v-if="!userInfo" style="margin-top: 0 !important;" @click="loginTo"
                                     class="cms-login-button cms-header-login-button cms-login-button-bg">
                                    <span class="el-icon-user-solid"></span>
                                </div>
                                <div v-else class="cms-user-box">
                                    <el-popover
                                            placement="bottom"
                                            trigger="click">
                                            <div class="cms-user-info-title cms-not-copy">{{userInfo.userNickname}}</div>
                                            <div class="cms-divide-line"></div>
                                            <div class="cms-user-info-tap cms-not-copy">我的资料</div>
                                            <div class="cms-user-info-tap cms-not-copy">我的文章</div>
                                            <div class="cms-user-info-tap cms-not-copy">我的评论</div>
                                            <div class="cms-user-info-tap cms-not-copy">我的消息</div>
                                            <div class="cms-divide-line"></div>
                                            <div class="cms-user-info-tap cms-not-copy">退出登录</div>
                                        <el-button class="cms-userinfo-box" slot="reference" plain ><span class="el-icon-user-solid"></span></el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
        </div>
    </header>
    <!-- header -->
</template>

<script>
    import {Input, Form, FormItem, Dialog,Tooltip,Popover} from 'element-ui'
    import store from '../store'
    export default {
        name: "CmsHeader",
        store,
        components: {
            [Input.name]: Input,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Dialog.name]:Dialog,
            [Tooltip.name]:Tooltip,
            [Popover.name]:Popover
        },
        data() {
            return {
                keyword: "",
                userInfo: store.state.userInfo,
            }
        },
        props: {
            CmsConfig: {//网站配置
                type: Object
            },
            CmsSearchRouterTo: {//搜索的路由跳转位置
                type: String,
            },
        },
        methods: {
            loginTo() {
                //window.open("https://css.dgut.edu.cn/admin/", "_blank");
                this.$router.push("/login");
            },
            searchTo() {
                let routeUrl = this.$router.resolve({
                    path: this.CmsSearchRouterTo + '?keyword=' + this.keyword,
                });
                window.open(routeUrl.href, '_blank');
            },
            toScholWebSide(){
                window.open("http://www.dgut.edu.cn/", '_blank');
            },
            toCyberspaceWebSide(){
                let routeUrl = this.$router.resolve({
                    path: "/",
                });
                window.open(routeUrl.href, '_blank');
            },
        },
        computed: {
            cmsDate() {//计算当前几年几月几日星期几
                //得到现在的时间
                let date = new Date();
                //生成时间（几年几月几日星期几）
                return date.getFullYear() + "年" + (parseInt(date.getMonth()) + 1) + "月" + date.getDate() + "日 星期" + "日一二三四五六".charAt(date.getDay());
            }
        },
    }
</script>

<style>
    .cms-title-head{
        z-index: 1;
        padding-left: 1rem;
        display: flex;
    }

    .cms-title{
        display: flex;
        flex-direction: column;
        justify-content: left;
        color: #ffffff;
        margin-right: 10px;
        position: relative;
    }

    .cms-title-school{
        font-size: 2.6vw;
        font-family: "\534E\6587\6977\4F53";
        white-space: nowrap;
    }

    .cms-title-school-en {
        font-size: 1.5vw;
        font-family: "华文圆体 Light";
        letter-spacing: .3vw;
        zoom: 60%;
        white-space: nowrap;
    }

    @media screen and (max-width: 1200px){
        .cms-title-school{
            font-size: 2rem;
            letter-spacing: .6rem;
        }

        .cms-title-school-en {
            font-size: 0.8rem;
        }
    }

    @media screen and (max-width: 1100px){
        .cms-title-school{
            font-size: 1.8rem;
            letter-spacing: .6rem;
        }

        .cms-title-school-en {
            font-size: 0.8rem;
            letter-spacing: 0.1rem;
        }
    }

    @media screen and (max-width: 1024px){
        .cms-title-school{
            font-size: 1.8rem;
            letter-spacing: .4rem;
        }
    }

    .cms-no-padding{
        padding-top: 0 !important;
    }

    .cms-header {
        padding: 1.4rem 2rem !important;
        height: 8rem;
    }

    .cms-header-bgc {
        background: rgb(10, 16, 84); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #155799, rgb(10, 16, 84)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #155799, rgb(10, 16, 84)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        z-index: 0;
        opacity: 0.8;
    }

    .cms-title-bar {
        height: 6rem;
        display: flex;
        justify-content: left;
        align-items: center;
        z-index: 999;
    }

    .cms-title-logo {
        z-index: 0;
        height: 100%;
        padding: 4px !important;
        display: flex;
        align-items: center;
    }

    .cms-title-logo > img {
        border-radius: 50%;
        height: 80%;
        width: auto;
        box-shadow: 0 0 0.4rem #e0e0e0;
    }

    .cms-title-icon {
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .cms-header-other-box{
        display: flex;
        justify-content: flex-end;
    }

    .cms-date-box {
        height: 5rem;
        display: flex;
        justify-content: space-around;
        color: #f0f0f0;
        flex-flow: column;
        z-index: 999;
    }

    .cms-date {
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    .cms-login-search {
        display: flex;
        justify-content: space-around;
        flex-flow: row;
    }

    .cms-header-login-button {
        font-size: 1.5rem !important;
        height: 1.9rem !important;
        width: 1.9rem !important;
        line-height: 1.5rem !important;
    }

    .cms-login-button {
        border-radius: 50%;
        border: solid 1px #2b68a5;
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 1rem;
        text-align: center;
    }

    .cms-login-button-bg {
        transition: 500ms;
        color: #155799;
        background-color: #e9e9e9;
    }


    .cms-login-button-bg:hover {
        transition: 500ms;
        background-color: #3a8ee6;
        color: #f0f0f0;
    }

    .cms-search-box{
        margin-right: 0.5rem;
    }

    .cms-form-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row;
    }

    .cms-form-item {
        margin: 0 0 4px 4px !important;
    }

    .cms-form-input > input {
        width: 10rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .cms-form-button {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }

    .cms-user-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .cms-userinfo-box{
        font-size: 1.4rem !important;
        cursor: pointer;
        background-color: initial !important;
        color: #FFFFFF !important;
        border: none !important;
        padding: 0 !important;
    }

    .cms-user-info-title{
        text-align: center;
        font-size: 1.2rem;
        padding: 1px 5px;
        color: #475669;
    }

    .cms-user-info-tap{
        text-align: center;
        font-size: 1rem;
        cursor: pointer;
        padding: 1px 5px;
        color: #7B7B7B;
    }

    .cms-user-info-tap:hover{
        transition: 0.5s;
        color: #00b4db;
    }

    .cms-divide-line{
        height: 1px;
        background-color: #e0e0e0;
        margin: 4px 0;
    }
</style>
