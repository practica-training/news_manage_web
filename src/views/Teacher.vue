<template>
<!--    旧的教师简历模板-->
    <el-row>
        <el-col :md="24" :sm="24" :xs="24" class="cms-teacher-info-box">
            <el-col id="cmsResume" :xl="20" :lg="20" :md="20" :sm="22" :xs="24" :style="'min-height:'+minHeight">
                <div class="cms-teacher-info-bg"></div>
                <div class="cms-teacher-info-bg-mark"></div>
                <el-card class="panel panel-default cms-teacher-info-card">
                    <div class="cms-not-copy cms-teacher-info-heading">
                        <img style="display:inline-block;height:1.8rem;width: auto;margin-right: 0.6rem;"
                             src="../static/images/logo/cms_logo.png"/>
                        <span style="font-size: 1.2rem;">师资力量——{{teacherInfo.column.columnName}}</span>
                    </div>
                </el-card>
                <div class="cms-teacher-info-self-box">
                    <div class="cms-teacher-self-heading">
                        <div v-show="hasTeacherInfo" class="form-group">
                            <div class="cms-teacher-self-img">
                                <img :src="cmsHost + teacherInfo.avatar"/>
                            </div>
                            <div class="cms-teacher-self-name" style="text-align: center;">
                                <span>{{teacherInfo.teacherName}}</span>
                            </div>
                        </div>
                        <div v-show="!hasTeacherInfo" class="form-group">
                            <h4>{{errorMessage}}</h4>
                        </div>
                    </div>
                    <div class="cms-teacher-self-info" teacherInfo v-html="teacherInfo.articleContent"></div>
                </div>
                <div class="cms-teacher-info-util cms-article-header cms-not-copy hidden-md-and-down no-print">
                    <div class="cms-article-util-item">
                        <el-button v-print="'#cmsResume'" class="cms-article-util-button" type="primary"
                                   icon="el-icon-printer" title="打印" circle></el-button>
                    </div>
                    <div class="cms-article-util-item">
                        <el-button class="cms-article-util-button" @click="toTop" icon="el-icon-top"
                                   type="success" title="返回顶部" circle></el-button>
                    </div>
                    <div class="cms-article-util-item hidden-md-and-down">
                        <el-popover trigger="click" placement="top">
                            <div class="cms-qrcode" ref="qrcodeContainer"><span>手机扫一扫分享简历</span></div>
                            <el-button slot="reference" class="cms-article-util-button" @click="toShare"
                                       icon="el-icon-share"
                                       type="warning" title="分享" circle></el-button>
                        </el-popover>
                    </div>
                    <div class="cms-article-util-item">
                        <el-button class="cms-article-util-button" @click="toClose" type="danger"
                                   icon="el-icon-close" title="关闭页面" circle></el-button>
                        <!--                                    <div>关闭页面</div>-->
                    </div>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import QRCode from 'qrcodejs2' //生成二维码

    export default {
        name: "Teacher",
        data() {
            return {
                teacherId: "",//teacherId
                hasTeacherInfo: false,//有没有教师简历信息
                teacherInfo: {
                    teacherName: "",
                    column: {
                        columnName: "",
                    },
                    articleContent: "",
                },//教师信息
                errorMessage: "",//错误信息

                tableClass: "cms-teacher-info-table",
                trClass: "cms-teacher-info-table-tr",
                tdClass: "",
                minHeight:"", //简历的最小高度
                cmsHost:"",//域名
            }
        },
        methods: {
            checkUrl() {
                //得到请求的参数
                let tempJson = this.$route.query;
                let teacherId = "";
                for (let key in tempJson) {
                    if (key) {
                        teacherId = key;
                        break;
                    }
                }
                return teacherId;
            },
            init() {//初始化
                this.minHeight = (window.screen.height - 174) + "px";
                this.cmsHost = this.$cmsInterface.DgutCMSHost;
                let $teacherId = this.checkUrl();
                if ($teacherId) {//如果有teacherId
                    this.teacherId = $teacherId;
                    this.initTeacherInfo();
                } else {
                    //参数错误
                    this.hasTeacherInfo = false;
                    this.errorMessage = "参数有误..";
                    document.getElementsByTagName("title")[0].innerText = "参数错误";
                }
            },
            initTeacherInfo() {//初始化老师简历信息
                //请求
                let $url = this.$cmsInterface.DgutGetTeacherInfo.url.replace("$teacherId", this.teacherId);
                this.$Get($url).then(res => {
                    if (res.code == 0) {
                        if (res.data.teacherName) {//如果有信息
                            this.hasTeacherInfo = true;
                            this.teacherInfo = res.data;
                            this.formatTeacherResume();//格式化
                        } else {
                            this.hasTeacherInfo = false;
                            this.errorMessage = "没有找到此老师信息..";
                        }
                    } else {
                        this.hasTeacherInfo = false;
                        this.errorMessage = "发生错误..请稍后再试.";
                    }
                })
            },
            // 格式化简历数据
            formatTeacherResume() {
                let articleContent = this.teacherInfo.articleContent;

                //清除掉多余的转行
                articleContent = articleContent.replace(/<br>/g, "");
                articleContent = articleContent.replace(/<br\/>/g, "");

                articleContent = articleContent.replace("firstRow", "\" style=\"display:none !important;");
                //articleContent = articleContent.replace("tbody", "tbody class=\"row at-row\"");

                // 给table加类
                if (articleContent.indexOf("<table class=\"X4\"") != -1) {
                    articleContent = articleContent.replace(/<table class="X4"/g, "<table style='' border='0' class=\"" + this.tableClass + "\" ");
                } else {
                    articleContent = articleContent.replace(/<table/g, "<table style='' border='0' class=\"" + this.tableClass + "\" ");
                }
                // 给tr加类
                if (articleContent.indexOf("<tr class=\"X4\"") != -1) {
                    articleContent = articleContent.replace(/<tr class="X4"/g, "<tr class=\"cms-teacher-info-tr\" ");
                } else {
                    articleContent = articleContent.replace(/<tr/g, "<tr class=\"cms-teacher-info-tr\" ");
                }
                // 给td加类
                if (articleContent.indexOf("<td class=\"X4\"") != -1) {
                    articleContent = articleContent.replace(/<td class="X4"/g, "<td class=\"cms-teacher-info-td\" style='' ");
                } else {
                    articleContent = articleContent.replace(/<td/g, "<td class=\"cms-teacher-info-td\" style='' ");
                }
                //给P加类
                articleContent = articleContent.replace(/<p"/g, "<p style=\" \"");

                articleContent = articleContent.replace(">姓名", "name='cell-info' ref='cellInfo'>姓名");
                articleContent = articleContent.replace(">籍贯", "name='cell-info' ref='cellInfo'>籍贯");
                articleContent = articleContent.replace(">出生年月", "name='cell-info' ref='cellInfo'>出生年月");
                articleContent = articleContent.replace(">民族", "name='cell-info' ref='cellInfo'>民族");
                articleContent = articleContent.replace(">职称", "name='cell-info' ref='cellInfo'>职称");
                articleContent = articleContent.replace(">学历", "name='cell-info' ref='cellInfo'>学历");
                articleContent = articleContent.replace(">职务", "name='cell-info' ref='cellInfo'>职务");
                articleContent = articleContent.replace(">办公室", "name='cell-info' ref='cellInfo'>办公室");
                articleContent = articleContent.replace(">邮件", "name='cell-info' ref='cellInfo'>邮件");

                this.teacherInfo.articleContent = articleContent;
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
                    if (this.qrCode2 == null) {//如果已经生成过一次了，就不再生成
                        let url = window.location.href;
                        this.qrCode2 = new QRCode(this.$refs.qrcodeContainer, {
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
            scrollTo:function(target){
                var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
                if (scrollT >target) {
                    var timer = setInterval(function(){
                        var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
                        var step = Math.floor(-scrollT/6);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if(scrollT <= target){
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    },20)
                }else if(scrollT == 0){
                    var timer = setInterval(function(){
                        var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
                        var step = Math.floor(300/3*0.7);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if(scrollT >= target){
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    },20)
                }else if(scrollT < target){
                    var timer = setInterval(function(){
                        var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
                        var step = Math.floor(scrollT/6);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if(scrollT >= target){
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    },20)
                }else if(target == scrollT){
                    return false;
                }
            }
        },
        created() {
            this.loadingInstance = this.$loading();
            this.init();
        },
        updated() {
            let width = document.body.offsetWidth;
            if(width < 992){
                this.scrollTo(50);
            }

            this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                let cellArr = document.getElementsByName("cell-info");
                for (let i = 0; i < cellArr.length; i++) {
                    //span外面的p
                    let pElement = cellArr[i].parentElement;
                    pElement.setAttribute("style", "");
                    pElement.setAttribute("class", "cms-teacher-info-p-cell");

                    //p外面的td
                    let tdElement = pElement.parentElement;
                    tdElement.className = "cms-teacher-info-td-cell";

                    let trElement = tdElement.parentElement;
                    trElement.className = "cms-teacher-info-tr-cell";
                }

                setTimeout(() => {//设置定时器，为了看上去不像闪屏
                    this.loadingInstance.close();
                }, 200);
            });
        }
    }
</script>

<style>
    @import "../static/css/teacher.css";

    .cms-teacher-info-hide {
        display: none !important;
    }

    .cms-teacher-info-box {
        display: flex;
        justify-content: center;
    }

    .cms-teacher-info-bg {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        z-index: -2;
        background-image: url("../static/images/bg.jpg");
    }

    .cms-teacher-info-bg-mark {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        z-index: -1;
        background: rgba(10, 16, 84, 0.6); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, rgba(21, 87, 153, 0.6), rgba(10, 16, 84, 0.6)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, rgba(21, 87, 153, 0.6), rgba(10, 16, 84, 0.6)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        position: absolute;
    }

    .cms-teacher-info-card {
        border: none !important;
        margin-top: 1rem;
        background: rgba(6, 10, 49, 0.8); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, rgba(6, 10, 49, 0.8), rgba(10, 16, 84, 0.8)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, rgba(6, 10, 49, 0.8), rgba(10, 16, 84, 0.8)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #fefefe;
    }

    .cms-teacher-info-heading {
        margin: 3px 0;
        display: flex !important;
        justify-content: center !important;
    }

    .cms-teacher-info-self-box {
    }

    .cms-teacher-self-heading {
        display: flex !important;
        justify-content: center !important;
        padding: 1.5rem 0;
        background-color: rgba(245, 245, 245, 0.9);
    }

    .cms-teacher-self-img {
        width: 6rem;
        height: 6rem;
        padding: 0.8rem;
        border-radius: 50%;
        border: solid 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
        background-color: rgb(250, 250, 250)
    }

    .cms-teacher-self-img > img {
        height: auto;
        width: 100%;
        padding: 2px;
    }

    .cms-teacher-self-name {
        padding: 0.5rem;
        font-size: 1.2rem;
    }

    .cms-teacher-self-info {
        background-color: rgba(245, 245, 245, 0.9);
        padding: 0 2rem 2rem 2rem;
    }

    .cms-teacher-self-info >p{
        text-indent: 2em;
    }

    .cms-teacher-info-table {
        /*padding: 0 2rem;*/
    }

    .cms-teacher-info-tr {
        width: 100%;
    }

    .cms-teacher-info-td {

    }

    .cms-teacher-info-tr-cell {
        width: 100%;
    }

    .cms-teacher-info-tr-cell:nth-child(4) {
        box-shadow: 0 1px 0px #999999;
    }

    .cms-teacher-info-td-cell {
        width: 33.3%;
    }

    .cms-teacher-info-p-cell {
        text-indent: 0.5em;
    }

    @media screen and (max-width: 768px) {
        .cms-teacher-info-td-cell {
            display: block;
            float: left;
            width: 50%;
        }

        .cms-teacher-info-p-cell {
            text-indent: 2em;
        }
    }

    @media screen and (max-width: 480px) {
        .cms-teacher-info-td-cell {
            display: block;
            float: left;
            width: 100%;
        }

        .cms-teacher-info-p-cell {
            text-indent: 0em;
        }
    }

    .cms-teacher-info-td > p {
        text-align: left !important;
        text-indent: 2em !important;
    }

    .cms-teacher-info-util{
        padding: 0.2rem;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        position: fixed;
        bottom: 2rem;
        left: 0;
        right: 0;
        background-color: rgba(255,255,255,0);
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

    .el-button--danger:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--warning:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--success:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--info:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .el-button--primary:hover{
        transition: 0.5s;
        opacity: 1;
    }

    .cms-qrcode {
        text-align: center;
        font-size: 1rem;
        padding: 0.2rem;
    }

    .cms-qrcode > span {
        line-height: 3rem;
    }
</style>