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
                        <img class="cms-cursor" v-if="item.user.userAvatar" :src="baseUrl + item.user.userAvatar" @click="lookUserInfo(item.user.userId)"/>
                        <img class="cms-cursor" v-else src="../static/images/login.png" @click="lookUserInfo(item.user.userId)"/>
                        <span class="cms-not-copy cms-cursor" @click="lookUserInfo(item.user.userId)">{{item.user.userNickname}}</span>
                        <div class="cms-comments-replay-button" @click="replayUser(item.user.userId,item.user.userNickname)"><el-button plain size="mini">回复</el-button></div>
                    </el-col>
                    <el-col :span="24" class="cms-comment-info">
                        <span class="cms-comment-replay" v-if="item.replyUser && item.replyUser.id">@{{item.replyUser.userNickname}}</span>
                        &nbsp;&nbsp;<span>{{item.commentContent}}</span>
                    </el-col>
                    <el-col :span="24" class="cms-comment-time">
                        <span>{{item.commentTime}}</span>
                    </el-col>
                </el-col>
            </template>
            <news-comment :show-drawer="showReplayCommentDrawer" :Title="'回复'+ currReplayUserNickname + '的评论'" :Placeholder="'请输入回复内容'"  @cancelSubmitContent="cancel" @submitContent="submit"></news-comment>
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
    export default {
        name: "NewsShowComment",
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
                // newsComments: [
                //     {
                //         user:{
                //             userId:"8abc89d66f464f84016f4655fd4d0001",
                //             userAvatar:"",
                //             userNickname:"我",
                //         },
                //         commentContent:"真棒",
                //         commentTime:"2019年12月29日",
                //         replyUser:{
                //             userId:"12345",
                //             userAvatar:"",
                //             userNickname:"他",
                //         }
                //     },
                //     {
                //         user:{
                //             userId:"12345",
                //             userAvatar:"",
                //             userNickname:"他",
                //         },
                //         commentContent:"差点就信了",
                //         commentTime:"2019年12月29日",
                //         replyUser:{
                //         }
                //     },
                // ],
                showReplayCommentDrawer:false,
                currReplayUserNickname:"",
                currReplayUserId:"",
                showUserInfo:false,
                userInfo:{},

            }
        },
        methods:{
            replayUser(userId,userNickname){
                this.showReplayCommentDrawer = true;
                this.currReplayUserId = userId;
                this.currReplayUserNickname = userNickname;
            },
            cancel(){
                this.showReplayCommentDrawer = false;
                this.currReplayUserId = "";
                this.currReplayUserNickname = "";
            },
            submit(comment){
                window.console.log("提交评论 " + comment)
            },
            lookUserInfo(userId){
                this.$API.getUserInfo(userId).then(res => {
                    this.userInfo = res.data;
                    this.showUserInfo = true;
                    window.console.log(this.userInfo)
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
