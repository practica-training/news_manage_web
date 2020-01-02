<template>
    <el-row class="cms-comments-box">
        <el-col :span="24" v-if="Comments.length == 0">
            <div class="cms-no-comment cms-not-copy">
                <span class="cms-no-comment-info">来成为第一个评论者吧~</span>
                <i class="cms-icon-thumb el-icon-thumb animated bounce"></i>
            </div>
        </el-col>
        <el-col class="cms-has-comments" :span="24" v-else>
            <template v-for="(item,index) in Comments">
                <el-col class="cms-comment-box" :span="24" :key="index">
                    <el-col :span="24" class="cms-comments-user-info">
                        <img class="cms-cursor" v-if="item.userAvatar" :src="baseUrl + item.userAvatar" @click="lookUserInfo(item.userId)"/>
                        <img class="cms-cursor" v-else src="../static/images/login.png" @click="lookUserInfo(item.userId)"/>
                        <span class="cms-not-copy cms-cursor" @click="lookUserInfo(item.userId)">{{item.userNickname}}</span>
                        <div v-if="currUserInfo.id != item.userId" class="cms-comments-replay-button" @click="replayUser(item.userId,item.userNickname)"><el-button plain size="mini">回复</el-button></div>
                    </el-col>
                    <el-col :span="24" class="cms-comment-info">
                        <span class="cms-comment-replay" v-if="item.replyUserId">@{{item.replyUserNickname}}</span>
                        &nbsp;&nbsp;<span>{{item.commentContent}}</span>
                    </el-col>
                    <el-col :span="24" class="cms-comment-time">
                        <span>{{item.commentTime}}</span>
                    </el-col>
                </el-col>
            </template>
            <news-comment :show-drawer="showReplayCommentDrawer" :Title="'回复'+ currReplayUserNickname + '的评论'" :Placeholder="'请输入回复内容'"  @cancelSubmitContent="cancelComment" @submitContent="submitComment"></news-comment>
            <el-dialog :title="userInfo.userNickname" :visible.sync="showUserInfo" :modal="false" width="85%">
                <user-info :base-url="baseUrl" :user-info="userInfo" :is-other-user-info="true"></user-info>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>
    import {Button,Dialog} from "element-ui";
    import NewsComment from "./NewsComment";
    import UserInfo from "./UserInfo";
    import store from "../store";
    export default {
        name: "NewsShowComment",
        store,
        props:{
            Comments:{
                type:Array,
            },
            NewsId:{
                type:String
            }
        },
        components:{
            UserInfo,
            [Button.name]:Button,
            [Dialog.name]:Dialog,
            NewsComment
        },
        data(){
            return{
                baseUrl:this.$API.BaseUrl,
                showReplayCommentDrawer:false,
                currReplayUserNickname:"",
                currReplayUserId:"",
                showUserInfo:false,
                userInfo:{},
                currUserInfo:store.state.userInfo
            }
        },
        methods:{
            replayUser(userId,userNickname){
                this.showReplayCommentDrawer = true;
                this.currReplayUserId = userId;
                this.currReplayUserNickname = userNickname;
            },
            cancelComment(){
                this.showReplayCommentDrawer = false;
                this.currReplayUserId = "";
                this.currReplayUserNickname = "";
            },
            submitComment(comment){
                window.console.log("提交评论 " + comment);
                let loading = this.$loading({
                    text: "正在提交"
                });
                this.$API.submitComment(this.NewsId,comment,this.currReplayUserId).then(res => {
                    loading.close();
                    if(res.data.success){
                        this.$message.success("评论成功");
                        this.$emit("listenAddComment",res.data.comment);
                    }else{
                        this.$message.success("发生错误，评论失败");
                    }
                })
                this.cancelComment();
            },
            lookUserInfo(userId){
                this.$API.getUserInfo(userId).then(res => {
                    this.userInfo = res.data;
                    this.showUserInfo = true;
                })
            },
        }
    }
</script>

<style scoped>
    .cms-comments-box{
        padding: 1rem;
    }

    .cms-no-comment{
        position: relative;
        height: 2rem;
        text-align: center;
    }

    .cms-no-comment-info{
        font-size: 0.9rem;
        color: #999999;
    }

    .cms-icon-thumb{
        transition: 0.5s;
        position: absolute;
        right: 2rem;
        font-size: 1.6rem;
        top: -1rem;
        opacity: 0;
        color: #409eff;
        animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Firefox: */
        -moz-animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: thumb-move 0.5s linear 1.5s infinite alternate;
        /* Opera: */
        -o-animation: thumb-move 0.5s linear 1.5s infinite alternate;
    }

    .cms-no-comment:hover .cms-icon-thumb{
        transition: 0.5s;
        opacity: 1;
    }

    .cms-comment-box{
        margin: 0.5rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .cms-comments-user-info{
        padding: 0.5rem;
        display: flex;
        align-content: center;
        background-color: #f0f0f0;
        position: relative;
    }

    .cms-comments-user-info > img{
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        border:1px solid #cccccc;
    }

    .cms-comments-user-info > span{
        font-size: 1.1rem;
        color: #5B5B5B;
        line-height: 2rem;
        margin-left: 10px;
    }

    .cms-comments-replay-button{
        position: absolute;
        font-size: 0.7rem;
        right: 0.5rem;
        bottom: 8px;
    }

    .cms-comment-info{
        padding: 0.5rem 0 0.2rem 1.5rem;
        font-size: 1rem;
        color: #333333;
    }

    .cms-comment-replay{
        color: #1d6296;
    }

    .cms-comment-time{
        font-size: 0.8rem;
        color: #5b5b5b;
        text-align: right;
        padding-right: 10px;
        padding-bottom: 0.5rem;
    }

    @keyframes thumb-move
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-moz-keyframes thumb-move /* Firefox */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-webkit-keyframes thumb-move /* Safari 和 Chrome */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }

    @-o-keyframes thumb-move /* Opera */
    {
        from {top: -1rem;}
        to {top: -2rem;}
    }
</style>
