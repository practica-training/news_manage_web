<template>
    <!--    轮播组件-->
    <div>
        <el-carousel @change="changeCarousel" :height="imgHeight+'px'" class="cms-el-carousel" :loop="isLoop"
                     :autoplay="isAutoplay" :interval="interval" :arrow="arrow">
            <el-carousel-item v-for="(item,index) in CarouselList" :key="index">
                <img :title="item[ImgDecision]" ref="image" style="height: 100%;width:auto;cursor: pointer;" :src="ImgHost + item[ImgUrl]"
                     @click="lookArticle(item[ImgRoute])"/>
            </el-carousel-item>
            <transition name="el-zoom-in-bottom">
                <div v-show="msgShow" class="cms-carousel-info cms-not-copy">{{msg}}</div>
            </transition>
        </el-carousel>
    </div>
</template>

<script>
    import {Carousel,CarouselItem} from 'element-ui';//导入轮播组件

    export default {
        name: "CmsCarousel",
        props:{
            CarouselList:{ //轮播组件显示图片的列表
                type:Array
            },
            ImgHost:{      //图片域名地址
                type:String
            },
            ImgUrl:{       //图片链接的字段名
                type:String
            },
            ImgDecision:{  //图片描述的字段名
                type:String
            },
            ImgRoute:{     //图片跳转链接的字段名
                type:String,
            },
            CarouselRoute:{//轮播组件跳转的路由
                type:String,
            }
        },
        data() {
            return {
                imgHeight: "",   //轮播组件高度
                isAutoplay: true,//是否自动切换
                isLoop: true,    //是否循环显示
                interval: 5000,  //切换的时间
                arrow: "always", //切换箭头的显示时机 always/hover/never,
                msg: "",         //轮播组件图片上的标题
                msgShow: false,  //是否显示图片上的标题
            }
        },
        components:{
            //轮播图组件
            [Carousel.name]:Carousel,
            [CarouselItem.name]:CarouselItem
        },
        methods: {
            initCarouselHeight() {//初始化轮播图的高度
                this.$nextTick(function () {
                    // 获取窗口宽度*图片的比例，定义页面初始的轮播图高度
                    let clientWidth = document.documentElement.clientWidth;
                    let scale;
                    if (clientWidth <= 768) {
                        scale = 8 / 16;
                    } else if (clientWidth <= 991) {
                        scale = 7 / 16;
                    } else {
                        scale = 4.8 / 16;
                    }
                    this.imgHeight = clientWidth * scale;
                    this.$emit("getCarouselHeight",this.imgHeight);
                });
            },
            changeCarousel(currIndex) {//得到当前轮播图的索引
                let that = this;
                //先隐藏图片的描述
                this.msgShow = false;
                //重新获取当前图片的描述
                let msg = this.CarouselList[currIndex];
                this.msg = msg[this.ImgDecision];
                //重新显示图片的描述
                setTimeout(function () {
                    that.msgShow = true;
                },200);
            },
            lookArticle(linkStr) {//查看文章
                linkStr = linkStr.substring(0, linkStr.length - 1);
                linkStr = linkStr.substring(linkStr.lastIndexOf("/") + 1, linkStr.length);
                let routeUrl = this.$router.resolve({
                    path: this.CarouselRoute + "?" + linkStr,
                });
                window.open(routeUrl.href, '_blank');
            },
        },
        mounted() {
            this.initCarouselHeight();
            // 监听窗口变化，使得轮播图高度自适应图片高度
            window.addEventListener("resize", () => {
                this.initCarouselHeight();
            });
        }
    }
</script>

<style scoped>
    .cms-el-carousel {
        height: 100%;
        padding: 0;
    }

    .cms-el-carousel ul {
        top: 0 !important;
    }

    .cms-el-carousel > div {
        height: 100% !important;
    }

    .el-carousel__item {
        color: #475669;
        font-size: 18px;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .cms-carousel-info {
        height: 3rem;
        width: 100%;
        overflow: hidden;
        z-index: 666;
        position: absolute;
        bottom: 0;
        text-indent: 0.5rem;
        background-color: rgba(0, 0, 0, 0.7);
        color: #f0f0f0;
        line-height: 3rem;
        font-size: 1rem;
    }

    .cms-carousel-img {
        height: auto;
        width: 100%;
        min-height: 100%;
        min-width: 100%;
        cursor: pointer;
    }
</style>
