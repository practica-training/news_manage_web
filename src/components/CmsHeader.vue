<template>
    <!--    首部组件-->
    <!-- header -->
    <header>
        <div class="hidden-sm-and-down">
            <el-row :gutter="10" style="margin: 0;">
                <el-col :span="24" class="cms-header">
                    <div class="cms-header-bgc"></div>
                    <div class="cms-title-bar" style="height: 100%;">
                        <!--                        显示LOGO-->
                        <div class="cms-title-logo" @click="toCyberspaceWebSide">
                            <img style="height: 100%;width: auto;" src="../static/images/logo/logo.png"/>
                        </div>
                        <!--                        显示中文标题和英文标题-->
                        <div class="cms-title-head">
                            <div class="cms-title cms-not-copy" @click="toScholWebSide" title="点击跳转学校官网">
                                <div class="cms-title cms-not-copy cms-title-shcool">東莞理工學院</div>
                                <div class="cms-title-en cms-not-copy cms-title-shcool-en">DONGGUAN UNIVERSITY OF TECHNOLOGY</div>
                            </div>
                            <div class="cms-title cms-not-copy" @click="toCyberspaceWebSide" title="首页">
                                <div class="cms-title cms-not-copy cms-title-netword">网络空间安全学院</div>
                                <div class="cms-title-en cms-not-copy cms-title-netword-en">SCHOOL OF CYBERSPACE SECURITY</div>
                            </div>
                        </div>
                    </div>
                    <div class="cms-date-box">
                        <!--                        时间-->
                        <el-tooltip effect="light" content="点击查看校历" placement="left">
                            <div class="cms-date" @click="showSchoolDate = true">{{cmsDate}}</div>
                        </el-tooltip>
                        <!--                        搜索框和登录-->
                        <div class="cms-login-search">
                            <!--                            登录-->
                            <div style="margin-top: 0 !important;" @click="loginTo" class="cms-login-button cms-header-login-button cms-login-button-bg">
                                <span class="el-icon-user-solid"></span>
                            </div>
                            <!--                            搜索-->
                            <div>
                                <el-form :inline="true" ref="form" class="demo-form-inline cms-form-flex" size="mini"
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
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-dialog width="90%" :visible.sync="showSchoolDate">
            <img class="cms-school-date" src="../static/images/school_date.png"/>
            <img class="cms-school-date" src="../static/images/school_day_date.png"/>
        </el-dialog>
    </header>
    <!-- header -->
</template>

<script>
    import {Input, Form, FormItem, Dialog,Tooltip} from 'element-ui'
    export default {
        name: "CmsHeader",
        components: {
            [Input.name]: Input,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Dialog.name]:Dialog,
            [Tooltip.name]:Tooltip
        },
        data() {
            return {
                keyword: "",
                showSchoolDate:false,//是否显示校历
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
                window.open("https://css.dgut.edu.cn/admin/", "_blank");
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
            cmsDate() {//计算当前几年几月几日第几周星期几
                let startTime = this.CmsConfig.startTime;//得到开始时间

                //字符串处理
                let tmp = (startTime || "").split(" ")[0];
                tmp = (tmp || "").split("-");

                //格式化开始时间
                let date1 = new Date(parseInt(tmp[0]), parseInt(tmp[1] - 1), parseInt(tmp[2]));
                //得到现在的时间
                let date2 = new Date();
                //计算现在是第几周
                let week = parseInt((date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24 / 7) + 1;

                //生成时间（第几周 + 几年几月几日星期几）
                return "第" + week + "周 " + date2.getFullYear() + "年" + (parseInt(date2.getMonth()) + 1) + "月" + date2.getDate() + "日 星期" + "日一二三四五六".charAt(date2.getDay());
            }
        },
    }
</script>

<style>
    .cms-header {
        padding: 1.4rem 2rem !important;
        height: 8rem;
        /*background-color: rgba(10, 16, 84, 0.87);*/
        display: flex;
        justify-content: space-between;
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
        display: flex;
        justify-content: left;
        z-index: 999;
    }

    .cms-title-logo {
        padding: 4px !important;
    }

    .cms-title-logo > img {
        border-radius: 50%;
        box-shadow: 0 0 0.4rem #e0e0e0;
    }

    .cms-title-head {
        padding-left: 1rem;
        display: flex;
        flex-flow: row;
        justify-content: left;
        margin: auto 0;
        color: #f9f9f9;
    }

    .cms-title-head > div {
        text-shadow: 0px 0px 4px #e0e0e0;
    }

    .cms-title {
        font-family: "华文楷体";
        font-size: 2.3rem;
        text-align: justify !important;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        transform-origin: left;
        cursor: pointer;
    }

    .cms-title-en {
        transform-origin: left;
        font-family: "楷体";
        font-size: 0.5rem;
    }

    .cms-title-shcool{
        letter-spacing: 0.4rem;
        transform: scale(1,1.3);
        -ms-transform: scale(1,1.3);
        -webkit-transform: scale(1,1.3);
        -moz-transform: scale(1,1.3);
        -o-transform: scale(1,1.3);
    }

    .cms-title-shcool-en{
        letter-spacing: 0.2rem;
        word-spacing: 0.1rem;
        text-indent: 0.4rem;
        transform: scale(0.8,1.3);
        -ms-transform: scale(0.8,1.3);
        -webkit-transform: scale(0.8,1.3);
        -moz-transform: scale(0.8,1.3);
        -o-transform: scale(0.8,1.3);
    }

    .cms-title-netword{
        font-family: "华文楷体";
        font-size: 2.2rem;
        -ms-transform: scale(0.9,1);
        -webkit-transform: scale(0.9,1);
        -moz-transform: scale(0.9,1);
        -o-transform: scale(0.9,1);
        position: relative;
        left: -2.5rem;
    }

    .cms-title-netword-en{
        letter-spacing: 0.2rem;
        word-spacing: 0.1rem;
        text-indent: 0.4rem;
        transform: scale(0.9,1.3);
        -ms-transform: scale(0.9,1.3);
        -webkit-transform: scale(0.9,1.3);
        -moz-transform: scale(0.9,1.3);
        -o-transform: scale(0.9,1.3);
        position: relative;
        left: -2.5rem;
    }


    @media screen  and (max-width:1365px){
        .cms-title-netword{
            font-family: "华文楷体";
            font-size: 2.2rem;
            -ms-transform: scale(0.9,1);
            -webkit-transform: scale(0.9,1);
            -moz-transform: scale(0.9,1);
            -o-transform: scale(0.9,1);
            position: relative;
            left: 0rem;
        }

        .cms-title-netword-en{
            letter-spacing: 0.2rem;
            word-spacing: 0.1rem;
            text-indent: 0.4rem;
            transform: scale(0.9,1.3);
            -ms-transform: scale(0.9,1.3);
            -webkit-transform: scale(0.9,1.3);
            -moz-transform: scale(0.9,1.3);
            -o-transform: scale(0.9,1.3);
            position: relative;
            left: 0rem;
        }
    }

    .cms-title-icon{
        font-size: 1.6rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .cms-date-box {
        height: 5rem;
        display: flex;
        justify-content: space-around;
        color: #f0f0f0;
        flex-flow: column;
        z-index: 999;
    }

    .cms-date{
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    /*校历*/
    .cms-school-date{
        width: 100%;
        height: auto;
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
        margin-right: 0.5rem;
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
</style>