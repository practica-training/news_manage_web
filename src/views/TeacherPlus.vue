<template>
    <!--    新的教师简历模板-->
    <el-row>
        <el-col :span="24" class="hidden-xs-only" style="height: 1rem;"></el-col>
        <el-col :span="24" class="cms-resume-big-box">
            <el-col :md="3" :sm="4" class="hidden-xs-only">
                <cms-side-bar :cms-columns="parentColumn" :curr-cid="currCid"
                              :has-columns="currCid?true:false"></cms-side-bar>
            </el-col>
            <el-col :md="16" :sm="19" :xs="24">
                <!--        有教师信息的时候显示-->
                <el-col v-if="teacherInfo" id="cmsResume" class="cms-resume-box" :span="24">
                    <el-col :span="24" class="cms-resume-head hidden-xs-only"></el-col>
                    <!--                基本信息的盒子-->
                    <el-col :span="24" class="cms-resume-base-box" :class="hasBaseInfo?'':'cms-no-base-info'">
                        <el-col :span="24" class="cms-resume-mark-bg"></el-col>
                        <!--                    照片和名字-->
                        <el-col :span="24">
                            <el-col :xl="{span:4,offset:10}" :lg="{span:4,offset:10}" :md="{span:4,offset:10}"
                                    :sm="{span:4,offset:10}" :xs="{span:6,offset:9}">
                                <img class="cms-teacher-image" v-if="teacherInfo.avatar" :src="cmsHost + teacherInfo.avatar"/>
                                <img class="cms-teacher-image" v-else src="../static/resume/no_avatar.png">
                            </el-col>
                            <el-col :span="24">
                                <div class="cms-teacher-name">
                                    <i class="cms-sex-icon el-icon-s-custom" :class="{'cms-sex-woman':teacherInfo.sex=='0'}"></i>
                                    {{teacherInfo.teacherName}}
                                </div>
                            </el-col>
                        </el-col>
                        <!--                    照片和名字-->
                        <!--                    基本信息-->
                        <el-col v-if="hasBaseInfo" :span="24" style="display: flex;justify-content: left; flex-wrap: wrap;">
                            <el-col :span="24" style="height: 1rem;" class="hidden-md-and-up"></el-col>
                            <el-col v-if="teacherInfo.country" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/place.png"/>&nbsp;
                                    <span class="cms-resume-scroll">籍贯：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.country}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.nation" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/nation.png"/>&nbsp;
                                    <span class="cms-resume-scroll">民族：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.nation}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.birthday" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/birthday.png"/>&nbsp;
                                    <span class="cms-resume-scroll">出生年月：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.birthday.split("-")[0]}}-{{teacherInfo.birthday.split("-")[1]}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.educational" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/education.png"/>&nbsp;
                                    <span class="cms-resume-scroll">学历/学位：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.educational}}/研究生</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.titles" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/title.png"/>&nbsp;
                                    <span class="cms-resume-scroll">职称：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.titles}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.position" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/position.png"/>&nbsp;
                                    <span class="cms-resume-scroll">职务：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.position}}</span>
                                </div>
                            </el-col>
<!--                            <el-col v-if="teacherInfo.domain" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">-->
<!--                                <div class="cms-resume-base-info">-->
<!--                                    <img class="cms-resume-logo" src="../static/resume/position.png"/>&nbsp;-->
<!--                                    <span class="cms-resume-scroll">研究领域：</span>&nbsp;-->
<!--                                    <span class="cms-resume-scroll cms-resume-scroll-x">{{teacherInfo.domain}}</span>-->
<!--                                </div>-->
<!--                            </el-col>-->
                            <el-col v-if="teacherInfo.office" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/workplace.png"/>&nbsp;
                                    <span class="cms-resume-scroll">办公室：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.office}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.phone" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/workplace.png"/>&nbsp;
                                    <span class="cms-resume-scroll">手机：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.phone}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.email" :lg="{span:7,offset:1}" :md="{span:9,offset:3}" :sm="{span:9,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/email.png"/>&nbsp;
                                    <span class="cms-resume-scroll">邮箱：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.email}}</span>
                                </div>
                            </el-col>
                            <el-col v-if="teacherInfo.comment" :lg="{span:22,offset:1}" :md="{span:18,offset:3}" :sm="{span:18,offset:3}" :xs="{span:20,offset:2}">
                                <div class="cms-resume-base-info">
                                    <img class="cms-resume-logo" src="../static/resume/comment.png"/>&nbsp;
                                    <span class="cms-resume-scroll">备注：</span>&nbsp;
                                    <span class="cms-resume-scroll">{{teacherInfo.comment}}</span>
                                </div>
                            </el-col>
                        </el-col>
                        <!--                    基本信息-->
                    </el-col>
                    <!--                基本信息的盒子-->
                    <!--                    个人介绍-->
                    <el-col :span="24" v-if="teacherInfo.selfIntroduction">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/introduction.png"/>
                                    <span>个人介绍</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-content" :span="22" :offset="1">
                            <template v-for="(item,index) in teacherInfo.selfIntroduction" >
                                <p :key="index">
                                    {{item}}
                                </p>
                            </template>
                        </el-col>
                    </el-col>
                    <!--                    个人介绍-->

                    <!--                    开设课程-->
                    <el-col :span="24" v-if="teacherInfo.courseIntroduction">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/courseIntroduction.png"/>
                                    <span>开设课程</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-timeline" :span="22" :offset="1">
                            <el-timeline>
                                <template v-for="(item,index) in teacherInfo.courseIntroduction">
                                    <el-timeline-item :key="index" :hide-timestamp="true" color="#5ac1fd">
                                        <p>{{item}}</p>
                                    </el-timeline-item>
                                </template>
                            </el-timeline>
                        </el-col>
                    </el-col>
                    <!--                    开设课程-->
                    <!--                    科研项目-->
                    <el-col :span="24" v-if="teacherInfo.projectIntroduction">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/projectIntroduction.png"/>
                                    <span>科研项目</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-timeline" :span="22" :offset="1">
                            <el-timeline>
                                <el-timeline>
                                    <template v-for="(item,index) in teacherInfo.projectIntroduction">
                                        <el-timeline-item :key="index" :hide-timestamp="true" color="#93bfe8">
                                            <p>{{item}}</p>
                                        </el-timeline-item>
                                    </template>
                                </el-timeline>
                            </el-timeline>
                        </el-col>
                    </el-col>
                    <!--                    科研项目-->
                    <!--                    科研成果-->
                    <el-col :span="24" v-if="teacherInfo.scientificPayoffs">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/scientificPayoffs.png"/>
                                    <span>科研成果</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-timeline" :span="22" :offset="1">
                            <el-timeline>
                                <el-timeline>
                                    <template v-for="(item,index) in teacherInfo.scientificPayoffs">
                                        <el-timeline-item :key="index" :hide-timestamp="true" color="#5ac1fd">
                                            <p>{{item}}</p>
                                        </el-timeline-item>
                                    </template>
                                </el-timeline>
                            </el-timeline>
                        </el-col>
                    </el-col>
                    <!--                    科研成果-->
                    <!--                    获奖情况-->
                    <el-col :span="24" v-if="teacherInfo.prize">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/tutor.png"/>
                                    <span>获奖情况</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-timeline" :span="22" :offset="1">
                            <el-timeline>
                                <template v-for="(item,index) in teacherInfo.prize">
                                    <el-timeline-item :key="index" :hide-timestamp="true" color="#93bfe8">
                                        <p>{{item}}</p>
                                    </el-timeline-item>
                                </template>
                            </el-timeline>
                        </el-col>
                    </el-col>
                    <!--                    获奖情况-->

                    <!--                    导师制-->
                    <el-col :span="24" v-if="teacherInfo.tutor">
                        <el-col class="cms-resume-other-info-bar" :span="24">
                            <el-col :md="{span:20,offset:1}">
                                <div class="cms-resume-other-info">
                                    <img class="cms-resume-logo-lg" src="../static/resume/prize.png"/>
                                    <span>导师制</span>
                                    <span class="cms-resume-other-info-note hidden-sm-and-down">（鼓励有兴趣同学优先考虑以下课题方向，可提供基础经费支持）</span>
                                </div>
                            </el-col>
                        </el-col>
                        <el-col class="cms-resume-other-info-timeline" :span="22" :offset="1">
                            <div class="cms-resume-other-info-note hidden-md-and-up" style="padding: 10px 0 15px 0;">鼓励有兴趣同学优先考虑以下课题方向,可提供基础经费支持</div>
                            <el-timeline>
                                <el-timeline>
                                    <template v-for="(item,index) in teacherInfo.tutor">
                                        <el-timeline-item :key="index" :hide-timestamp="true" color="#5ac1fd">
                                            <p>{{item}}</p>
                                        </el-timeline-item>
                                    </template>
                                </el-timeline>
                            </el-timeline>
                        </el-col>
                    </el-col>
                    <!--                    导师制-->
                </el-col>
                <!--        有教师信息的时候显示-->
                <!--        没有教师信息的时候显示-->
                <el-col v-else class="cms-no-resume-box" :lg="{span:12,offset:6}" :md="{span:14,offset:5}"
                        :sm="{span:16,offset:4}">
                    <img class="cms-no-resume-image" src="../assets/images/no_article.png"/>
                    <div class="cms-no-resume-title">找不到当前老师的信息~</div>
                </el-col>
                <!--        没有教师信息的时候显示-->
                <el-col :span="24" class="hidden-sm-and-down" style="height:7rem;"></el-col>
            </el-col>
            <el-col :xl="3" :lg="4" :md="4" class="hidden-sm-and-down"></el-col>
        </el-col>
        <div v-if="teacherInfo" class="cms-teacher-info-util cms-article-header cms-not-copy hidden-md-and-down no-print">
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
    </el-row>
</template>

<script>
    import CmsSideBar from "../components/CmsSideBar"
    import store from "../store"
    import QRCode from 'qrcodejs2' //生成二维码
    import {Timeline, TimelineItem, Steps, Step} from 'element-ui';

    export default {
        name: "TeacherPlus",
        store,
        components: {
            CmsSideBar,
            [Timeline.name]: Timeline,
            [TimelineItem.name]: TimelineItem,
            [Steps.name]: Steps,
            [Step.name]: Step
        },
        data() {
            return {
                loadingInstance: "", //加载动画对象
                cmsHost: "",         //域名
                teacherInfo: "",    //教师信息
                parentColumn: [],   //父栏目
                currCid: '',        //当前选中栏目
                qrCode: null,       //简历底部的二维码
                hasBaseInfo:true,   //是否有基本信息（籍贯、生日等）
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
            async init() {//初始化
                this.cmsHost = this.$cmsInterface.DgutCMSHost;
                let $teacherId = this.checkUrl();
                if ($teacherId) {//如果有teacherId
                    this.teacherId = $teacherId;
                    await this.initTeacherInfo();
                } else {
                    //参数错误
                    this.hasTeacherInfo = false;
                }
            },
            async initTeacherInfo() {//初始化老师简历信息
                //请求
                let $url = this.$cmsInterface.DgutGetTeacherInfo.url.replace("$teacherId", this.teacherId);
                await this.$Get($url).then(res => {
                    if (res.code == 0) {
                        if (res.data.teacherName) {//如果有信息
                            let teacherInfo = res.data;
                            if(teacherInfo.sex || teacherInfo.country || teacherInfo.nation || teacherInfo.birthday || teacherInfo.educational || teacherInfo.titles || teacherInfo.position || teacherInfo.office || teacherInfo.email){
                                this.hasBaseInfo = true;
                            }else{
                                this.hasBaseInfo = false;
                            }
                            this.parentColumn = store.state.cmsColumns;
                            this.currCid = "" + teacherInfo.column.cid;
                            this.teacherInfo = this.formatTeacherResume(teacherInfo);//格式化
                        }
                    }
                })
            },
            formatTeacherResume(teacherInfo) {
                //自我介绍
                let selfIntroduction = teacherInfo.selfIntroduction;
                if (selfIntroduction) {
                    selfIntroduction = selfIntroduction.split("\r\n\r\n");
                    teacherInfo.selfIntroduction = selfIntroduction;
                }
                //开设课程
                let courseIntroduction = teacherInfo.courseIntroduction;
                if (courseIntroduction) {
                    courseIntroduction = courseIntroduction.split("\r\n\r\n");
                    teacherInfo.courseIntroduction = courseIntroduction;
                }
                //科研项目
                let projectIntroduction = teacherInfo.projectIntroduction;
                if (projectIntroduction) {
                    projectIntroduction = projectIntroduction.split("\r\n\r\n");
                    teacherInfo.projectIntroduction = projectIntroduction;
                }
                //科研成果
                let scientificPayoffs = teacherInfo.scientificPayoffs;
                if (scientificPayoffs) {
                    scientificPayoffs = scientificPayoffs.split("\r\n\r\n");
                    teacherInfo.scientificPayoffs = scientificPayoffs;
                }
                //获奖情况
                let tutor = teacherInfo.tutor;
                if (tutor) {
                    tutor = tutor.split("\r\n\r\n");
                    teacherInfo.tutor = tutor;
                }
                //导师制
                let prize = teacherInfo.prize;
                if (prize) {
                    prize = prize.split("\r\n\r\n");
                    teacherInfo.prize = prize;
                }
                return teacherInfo;
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
            scrollTo: function (target) {
                let scrollT = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollT > target) {
                    let timer = setInterval(function () {
                        var scrollT = document.body.scrollTop || document.documentElement.scrollTop
                        var step = Math.floor(-scrollT / 6);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if (scrollT <= target) {
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    }, 20)
                } else if (scrollT == 0) {
                    let timer = setInterval(function () {
                        let scrollT = document.body.scrollTop || document.documentElement.scrollTop
                        let step = Math.floor(300 / 3 * 0.7);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if (scrollT >= target) {
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    }, 20)
                } else if (scrollT < target) {
                    let timer = setInterval(function () {
                        var scrollT = document.body.scrollTop || document.documentElement.scrollTop
                        var step = Math.floor(scrollT / 6);
                        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
                        if (scrollT >= target) {
                            document.body.scrollTop = document.documentElement.scrollTop = target;
                            clearTimeout(timer);
                        }
                    }, 20)
                } else if (target == scrollT) {
                    return false;
                }
            }
        },
        async created() {
            this.loadingInstance = this.$loading();
            await this.init();
            setTimeout(() => {//设置定时器，为了看上去不像闪屏
                this.loadingInstance.close();
            }, 200);
        },
    }
</script>

<style scoped>
    .cms-resume-big-box {
        display: flex;
        justify-content: space-around;
    }

    .cms-resume-head {
        height: 2.5rem;
        background-color: #d9d9d9;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .cms-resume-box {
        box-shadow: 0 0 15px #999999;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .cms-resume-mark-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        top: 0;
        left: 0;
        background-image: url("../static/resume/bg.jpg");
        background-position: left bottom;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .cms-resume-base-box {
        padding: 1.5rem 1.5rem;
        height: auto;
        background-color: rgba(245, 245, 245, 0.95);
        position: relative;
    }

    .cms-no-base-info{
        display: flex;
        justify-content: space-around;
    }

    .cms-teacher-image {
        width: 100%;
        border-radius: 10px;
        border: 5px solid #e0e0e0;
        height: auto;
    }

    .cms-sex-icon {
        font-size: 1rem;
        color: #00b4db;
    }

    .cms-sex-woman {
        color: palevioletred;
    }

    .cms-resume-logo {
        height: 2rem;
        width: 2rem;
        border: none;
    }

    .cms-resume-logo-lg {
        height: 2.5rem;
        width: 2.5rem;
        border: none;
    }

    .cms-resume-scroll{
        white-space: nowrap;
    }

    .cms-resume-scroll-x{
        overflow-x: scroll;
    }

    .cms-resume-scroll-x::-webkit-scrollbar{
        display: none;
    }

    .cms-teacher-name {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        color: #333333;
    }

    .cms-resume-base-info {
        padding-left: 10px;
        font-size: 1rem;
        display: flex;
        align-items: center;
        color: #5B5B5B;
    }

    .cms-resume-other-info {
        height: 3rem;
        font-weight: bold;
        font-size: 1rem;
        display: flex;
        align-items: center;
        color: #4F4F4F;
    }

    @media screen and (max-width: 991px) {
        .cms-resume-other-info {
            justify-content: center;
        }
    }

    .cms-resume-other-info-bar {
        background-color: #e9e9e9;
    }

    .cms-resume-other-info-content {
        text-indent: 2em;
        padding: 10px 0;
    }

    .cms-resume-other-info-content p {
        font-size: 1rem;
        color: #5B5B5B;
        text-align: justify;
    }

    .cms-resume-other-info-note {
        font-size: 0.8rem;
        color: #7A7A7A;
        text-align: justify;
    }

    .cms-resume-other-info-timeline {
        padding: 10px 0;
    }

    .cms-resume-other-info-timeline p {
        font-size: 1rem;
        color: #5B5B5B;
        text-align: justify;
    }

    .cms-teacher-info-util {
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

    .cms-qrcode {
        text-align: center;
        font-size: 1rem;
        padding: 0.2rem;
    }

    .cms-qrcode > span {
        line-height: 3rem;
    }

    .cms-no-resume-box {
        text-align: center;
    }

    .cms-no-resume-image {
        width: 100%;
        height: auto;
    }

    .cms-no-resume-title {
        font-size: 0.9rem;
        color: #a7a7a7;
        margin: 1rem 0;
    }
</style>