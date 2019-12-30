<template>
    <div id="app" v-cloak>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }

</script>

<style>
    @import "static/css/cms_index.css";
    @import "static/css/egg_paint.css";
    [v-cloak] {
        display: none;
    }

    .cms-cursor{
        cursor: pointer;
    }

    ::-webkit-scrollbar {
        width: 5px; /*对垂直流动条有效*/
        height: 5px; /*对水平流动条有效*/
    }

    /*定义滚动条的轨道颜色、内阴影及圆角*/
    ::-webkit-scrollbar-track {
        /*内阴影*/
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
        /*background-color: initial;*/
        /*border-radius: 3px;*/
    }


    /*定义滑块颜色、内阴影及圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background-color: #e0e0e0;
    }

    /*定义两端按钮的样式*/
    ::-webkit-scrollbar-button {
        /*background-color:cyan;*/
    }

    /*定义右下角汇合处的样式*/
    ::-webkit-scrollbar-corner {
        /*background:khaki;*/
    }

    input::-webkit-input-placeholder { /*WebKit browsers*/
        color: #909090 !important;
    }

    input::-moz-input-placeholder { /*Mozilla Firefox*/
        color: #909090 !important;
    }

    input::-ms-input-placeholder { /*Internet Explorer*/
        color: #909090 !important;
    }

    .el-card__header {
        padding: 0.5rem 1rem !important;
        background-color: #f0f0f0;
    }

    .egg-login-card > .el-card__header{
        padding:1rem !important;
        background-color: #fff;
    }

    .el-card__body {
        padding: 0.5rem !important;
    }

    .egg-login-card > .el-card__body{
        padding:0.8rem !important;
    }

    .cms-header-bg {
        background-image: url("static/images/bg.png");
    }

    @media screen and (max-width: 1365px) {
        .at-menu__submenu-title {
            text-align: center;
            width: 6.3rem;
            padding: 0 !important;
        }
    }


    @media screen and (min-width: 1366px) and (max-width: 1919px) {
        .at-menu__submenu-title {
            text-align: center;
            width: 8rem;
            padding: 0 0.6rem !important;
        }
    }

    @media screen and (min-width: 1920px) {
        .at-menu__submenu-title {
            width: 10rem;
            text-align: center;
            padding: 0 1rem !important;
        }
    }

    .at-menu__item {
        text-align: center !important;
    }

    .at-menu__item-link {
        white-space: normal !important;
    }

    .at-table__content {
        border: none;
    }

    .el-tabs__nav{
        width: 100%;
    }

    #tab-0{
        width: 50%;
        padding-right:0.4rem;
    }

    #tab-1{
        width: 50%;
        padding-left: 0.4rem;
    }

    .el-tabs__active-bar{
        display: none;
    }

    .at-menu__submenu-title>i{
        display: none !important;
    }

    .el-timeline-item{
        padding-bottom: 6px;
    }

    .el-slider__runway.disabled .el-slider__bar {
        background-color: #67c23a!important;
    }

    .el-slider__runway.disabled .el-slider__button {
        border-color: #67c23a!important;
    }

    .cms-user-operation-panel .el-tabs__nav{
        display: flex;
        justify-content: space-around;
    }

    .user-info-title .el-form-item__label{
        font-size: 1.1rem;
        color: #475669;
    }

    .el-tabs__content{
        overflow-y: scroll !important;
    }

    .user-news-tabs .el-tabs__header{
        width: 100%;
    }

    .user-news-tabs .el-tabs__nav{
        display:flex;
        justify-content:left;
        flex-direction: column;
        width: 100%;
    }

    .user-news-tabs .el-tabs__item{
        padding: 0 !important;
        width: 100% !important;
        text-align: center !important;
    }

    .cms-text-overflow .cell{
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
    }
</style>
