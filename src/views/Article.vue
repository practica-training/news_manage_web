<template>
    <!--    文章-->
    <el-row class="cms-article-box" :style="articleInfo?'':'background-color: initial !important;'">
        <el-col :md="3" :sm="4" class="hidden-xs-only"></el-col>
        <el-col :md="16" :sm="19" :xs="24">
            <!--            有文章内容时-->
            <div v-if="articleInfo.newsTitle">
                <!--                返回按钮-->
                <el-card class="hidden-xs-only" style="border: none;background-color: #f0f0f0;padding: 0;">
                    <div class="cms-article-header cms-not-copy">
                        <div class="cms-table-title cms-cursor" @click="backToLastPage">
                            <i class="el-icon-s-promotion cms-rotate-y"></i>&nbsp;<span>返回</span>
                        </div>
                    </div>
                </el-card>
                <img id="preViewImg" @click="$imageViewer" style="display: none;" ref="preViewImg"/>

                <!--               文章内容和一些工具-->
                <el-card class="cms-article-info-box cms-article-box-shadow" style="border: none;">
                    <!--                文章主体-->
                    <div id="cmsArticle">
                        <div class="cms-article-title">{{articleInfo.newsTitle}}</div>
                        <div class="cms-article-title-e">
                            <i class="el-icon-collection-tag"></i>
                            <template v-for="(item,index) in articleInfo.newsTypeSet">
                                <span v-if="index != 0"></span>
                                <span :key="item.id">{{item.name}}</span>
                            </template>
<!--                            {{articleInfo.likeNumber}}-->
                            &nbsp;&nbsp;
                            <i class="el-icon-time"></i>{{articleInfo.publishTime}}
                            &nbsp;&nbsp;
                            <i class="el-icon-view">{{articleInfo.readNumber}}</i>
                            &nbsp;&nbsp;
                            <i class="el-icon-warning cms-cursor" @click="showReportNews">举报</i>
                        </div>
                        <div id="article" class="cms-article-info" v-html="articleInfo.content"></div>
                    </div>
                </el-card>
                <div class="cms-wall"></div>
                <!--                评论-->
                <el-card style="border: none;">
                    <div class="cms-article-header cms-not-copy" slot="header" style="position: relative;">
                        <div class="cms-comment-title">评论</div>
                        <!--                评论按钮-->
                        <el-button size="mini" class="cms-comment-button" type="default" plain round
                                   @click="showCommentDrawer=true">参与评论
                        </el-button>
                        <news-comment :show-drawer="showCommentDrawer"></news-comment>
                    </div>
                    <!--                    评论列表-->
                    <news-show-comment :news-id="articleInfo.newsid" :comments="newsComments" @cancelSubmitContent="cancel" @submitContent="submit"></news-show-comment>
                    <news-comment :show-drawer="showReportNewsDrawer" :title="'举报新闻'" :placeholder="'请输入举报原因'" :cancel-info="'是否取消举报'" @cancelSubmitContent="cancelReport" @submitContent="submitReport"></news-comment>
                    <div style="display: flex;justify-content: center;padding: 2rem;">
                        <el-pagination
                                :current-page="1"
                                background
                                layout="prev, pager, next, total"
                                :hide-on-single-page="true"
                                :total="totalElements" @size-change="sizeChange" @current-change="currentChange">
                        </el-pagination>
                    </div>
                </el-card>
            </div>
            <!--            没有文章时-->
            <div v-else>
                <el-card class="hidden-xs-only" style="border: none;background-color: #f0f0f0;">
                    <div class="cms-article-header cms-not-copy">&nbsp;</div>
                </el-card>
                <!--               显示没有找到这篇文章-->
                <el-card class="cms-article-info-box cms-article-box-shado"
                         style="border: none;background-color: initial !important;">
                    <el-row>
                        <el-col class="cms-no-article-box" :lg="{span:12,offset:6}" :md="{span:14,offset:5}"
                                :sm="{span:16,offset:4}">
                            <img class="cms-no-article-image" src="../assets/images/no_article.png"/>
                            <div class="cms-no-article-title">哎呀~找不到这篇文章</div>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </el-col>
        <el-col :xl="3" :lg="4" :md="4" class="hidden-sm-and-down"></el-col>
    </el-row>
</template>

<script>
    import NewsComment from "../components/NewsComment";
    import NewsShowComment from "../components/NewsShowComment";
    import store from "../store"
    import QRCode from 'qrcodejs2' //生成二维码
    import Vue from 'vue/dist/vue.js'

    export default {
        name: "Article",
        store,
        components: {
            NewsComment,
            NewsShowComment
        },
        data() {
            return {
                loadingInstance: "",
                articleInfo: {},
                qrCode: null,     //文章底部的二维码
                qrCode2: null,    //工具栏的二维码
                priviewUrl: "",    //预览图片地址,
                imgList: [],
                showCommentDrawer: false,//是否显示评论的抽屉
                newsComments: [],//评论列表,
                showReportNewsDrawer:false,
                totalComment:0,
            }
        },
        methods: {
            checkUrl() {
                //得到请求的参数
                return this.$route.query.id;
            },
            async init() {//初始化columns
                let newsId = this.checkUrl();//得到栏目
                if (newsId) {//如果有,则赋值
                    await this.$API.getNewsByNewsId(newsId).then(res => {
                        window.console.log(res)
                        if (res.data.success) {
                            this.articleInfo = res.data.newsDTO;
                            window.console.log(this.articleInfo)
                            //this.formatArticle();
                        } else {//否则没有文章
                        }
                    })
                } else {//没有则跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            initComment(page){//初始化评论
                let newsId = this.checkUrl();//得到栏目
                this.$API.getCommentsByNewsId(newsId,page).then(res=>{
                    window.console.log(res)
                })
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.initComment(currPage);
            },
            // formatArticle() {//对文章格式化
            //     let article = this.articleInfo.articleContent;
            //     let cmsHost = this.$cmsInterface.DgutCMSHost;
            //
            //     //清除掉多余的转行
            //     article = article.replace(/<br>/g, "");
            //     article = article.replace(/<br\/>/g, "");
            //
            //     //给图片添加样式
            //     article = article.replace(/<img/g, "<img @click='clickImg($event)' class='cms-article-img'");
            //
            //     //给p添加样式
            //     article = article.replace(/<p/g, "<p class='cms-article-p' ");
            //
            //     //给span添加样式
            //     article = article.replace(/<span/g, "<span class='cms-article-span' ");
            //
            //     //修正href链接
            //     article = article.replace(/href="\//g, "href=\"" + cmsHost + "/");
            //
            //     //修正src链接
            //     article = article.replace(/src="\//g, "src=\"" + cmsHost + "/");
            //
            //     this.articleInfo.articleContent = article;
            // },
            backToLastPage() {//返回上一页
                //如果有上一页,则直接返回
                if (window.history.length > 1) {
                    history.go(-1);
                } else {//没有上一页,返回当前节点对应的那一页
                    this.$router.push({path: '/list?' + this.currCid});
                }
            },
            showReportNews(){//显示举报新闻抽屉
                this.showReportNewsDrawer = true;
            },
            cancelReport(){
                this.showReportNewsDrawer = false;
            },
            submitReport(content){
                this.showReportNewsDrawer = false;
                window.console.log(content)
            },
            toTop() {//返回顶部
                let x = document.body.scrollTop || document.documentElement.scrollTop;
                let timer = setInterval(function () {
                    x = x - 20;
                    if (x < 20) {
                        x = 0;
                        window.scrollTo(x, x);
                        clearInterval(timer);
                    }
                    window.scrollTo(x, x);
                }, 10);
            },
            toShare() {//分享
                this.$nextTick(() => {
                    if (this.qrCode == null) {//如果已经生成过一次了，就不再生成
                        let url = window.location.href;
                        this.qrCode = new QRCode(this.$refs.qrcodeContainer, {
                            text: url,
                            width: 150,
                            height: 150,
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    }
                });
            },
            toClose() {//关闭页面
                window.location.href = "about:blank";
                window.close();
            },
            cancel(){
                window.console.log("取消评论")
            },
            submit(comment){
                window.console.log("提交评论 " + comment)
            },
        },
        async created() {
            this.loadingInstance = this.$loading();
            await this.init();
            setTimeout(() => {//设置定时器，为了看上去不像闪屏
                this.loadingInstance.close();
            }, 200);
        },
        updated() {
            let that = this;
            let toPreviewImg = function (src) {
                that.$refs.preViewImg.src = src;
                that.$refs.preViewImg.click();
            }
            //将文章再创建成一个vue对象
            new Vue({
                el: "#article",
                data: {},
                methods: {
                    clickImg($event) {
                        let currImg = $event.currentTarget;
                        toPreviewImg(currImg.getAttribute("src"));
                    }
                }
            });
        }
    }
</script>

<style>
    .cms-wall {
        height: 1.5rem;
    }

    .cms-article-box {
        display: flex;
        justify-content: space-around;
        padding: 1.5rem 0;
    }

    @media (max-width: 768px) {
        .cms-article-box {
            background-color: #fbfbfb !important;
        }
    }

    .cms-article-info-box {
        padding-bottom: 3.5rem;
        background-color: #fbfbfb;
    }

    @media (max-width: 768px) {
        .cms-article-info-box {
            box-shadow: none !important;
        }
    }

    .cms-article-header {
        padding: 0.5rem;
        background-color: #f0f0f0;
        color: #666666 !important;
    }

    .cms-article-title {
        font-size: 1.2rem;
        text-align: center;
        padding: 1rem 0.4rem 0 0.4rem;
        color: #0a1054;
    }

    .cms-comment-title {
        font-size: 1.1rem;
        text-align: center;
        color: #0a1054;
    }

    .cms-comment-button {
        position: absolute;
        right: 0.5rem;
        font-size: 0.8rem;
        top: 0.5vh;
        padding: 10px 20px !important;
    }

    .cms-article-title-e {
        font-size: 1rem;
        text-align: center;
        color: #666666;
        padding: 1.5rem;
    }

    .cms-article-info {
        font-size: 1.1rem !important;
        font-family: "Microsoft YaHei" !important;
        line-height: 1.5rem;
        padding: 0 1rem 1.5rem 1rem;
    }

    td > p {
        text-indent: 0em !important;
    }

    .cms-article-info p {
        display: block;
        padding: 0 !important;
        text-indent: 2em !important;
        color: #333333;
    }

    @media (max-width: 768px) {
        .cms-article-info p {
            text-align: justify !important;
        }
    }


    p > img:first-child {
        position: relative !important;
        left: -1em !important;
    }

    p > a {
        font-size: 1rem !important;
    }

    p > span {
        font-family: "Microsoft YaHei" !important;
        color: #333333 !important;
    }

    tr:hover {
        background-color: #f6f6f6;
    }

    @media (min-width: 1200px) {
        .cms-article-info {
            font-size: 1.1rem !important;
            font-family: "Microsoft YaHei";
            line-height: 1.5rem;
            padding: 0rem 2.5rem;
        }
    }

    .cms-article-img[src$="gif"] {
        width: 1rem !important;
        height: auto !important;
        min-width: 1rem;
        max-width: 1rem !important;
        border-radius: 0 !important;
        opacity: 1;
        position: relative;
        left: 0 !important;
    }

    @media (max-width: 768px) {
        .cms-article-img {
            transition: 0.5s;
            min-width: 100%;
            max-width: 100% !important;
            height: auto !important;
            border-radius: 1rem;
            cursor: pointer;
            opacity: 0.9;
        }

        p > img:first-child {
            position: relative !important;
            left: -2em !important;
        }
    }

    .cms-article-img {
        transition: 0.5s;
        min-width: 90%;
        margin: 0 auto;
        max-width: 100% !important;
        height: auto !important;
        border-radius: 1rem;
        cursor: pointer;
        opacity: 0.9;
    }

    /*@media (max-width: 768px) {*/
    /*    .cms-article-img:hover {*/
    /*        transform: scale(1.2);*/
    /*        -ms-transform: scale(1.2); !* IE 9 *!*/
    /*        -moz-transform: scale(1.2); !* Firefox *!*/
    /*        -webkit-transform: scale(1.2); !* Safari 和 Chrome *!*/
    /*        -o-transform: scale(1.2);*/
    /*    }*/

    /*    .cms-article-img[src$="gif"]:hover {*/
    /*        transform: none !important;*/
    /*        -ms-transform: none !important; !* IE 9 *!*/
    /*        -moz-transform: none !important; !* Firefox *!*/
    /*        -webkit-transform: none !important; !* Safari 和 Chrome *!*/
    /*        -o-transform: none !important;*/
    /*    }*/
    /*}*/

    .cms-article-img:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .cms-rotate-y {
        transform: rotateY(180deg); /* 水平镜像翻转 */
    }

    .cms-cursor {
        cursor: pointer;
    }

    .cms-article-box-shadow {
        box-shadow: 1px 0 0 #e0e0e0, -1px 0 0 #e0e0e0, 0 1px 0 #e0e0e0;
        border-radius: 0;
    }

    @media (max-width: 768px) {
        .cms-article-box-shadow {
            box-shadow: none;
        }
    }

    .cms-article-util {
        padding: 0.2rem;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        position: fixed;
        bottom: 2rem;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0);
    }

    .cms-article-util-item {
        margin: 0.5rem;
        text-align: center;
    }

    .cms-article-util-button {
        transition: 0.5s;
        padding: 0.45rem !important;
        text-align: center;
        font-size: 1.35rem;
        opacity: 0.25;
    }

    .el-button--danger:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--warning:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--success:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--info:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--primary:hover {
        transition: 0.5s;
        opacity: 1;
    }

    .cms-article-other-util {
        position: fixed;
        width: 200px;
        border: none;
        background-color: #f0f0f0;
        padding: 0.5rem 0;
    }

    .cms-dividing-line {
        width: 90%;
        margin: 0 auto;
        height: 1px;
        background-color: #999999;
    }

    .cms-qrcode {
        text-align: center;
        font-size: 1rem;
        padding: 0.2rem;
    }

    .cms-qrcode > span {
        line-height: 3rem;
    }

    .cms-no-article-box {
        text-align: center;
    }

    .cms-no-article-image {
        width: 100%;
        height: auto;
    }

    .cms-no-article-title {
        font-size: 0.9rem;
        color: #a7a7a7;
        margin: 1rem 0;
    }
</style>
