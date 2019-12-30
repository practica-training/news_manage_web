<template>
    <el-col :span="24" class="cms-user-messages">
        <template v-for="(item,index) in messages">
            <el-col :key="index" :span="10" class="cms-user-message">
                <el-card>
                    <div slot="header" style="position: relative;">
                        <div class="cms-user-message-title">系统消息</div>
                        <div class="cms-user-message-time">{{item.createTime}}</div>
                    </div>
                    <div class="cms-user-message-content">{{item.content}}</div>
                    <div class="cms-user-message-operation">
                        <el-button type="danger" size="mini" @click="deleteMessage(index,item.id)">删除</el-button>
                        <el-button v-if="item.isRead == 0" type="success" size="mini" @click="readMessage(index,item.id)">确认</el-button>
                    </div>
                </el-card>
            </el-col>
        </template>
        <template v-if="messages.length == 0">
            <div class="cms-user-no-message">
                当前没有收到消息
            </div>
        </template>
    </el-col>
</template>

<script>
    import {Card} from "element-ui"

    export default {
        name: "UserMessage",
        components: {
            [Card.name]: Card
        },
        data() {
            return {
                messages: [
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 0
                    },
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 1
                    },
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 0
                    },
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 0
                    },
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 0
                    },
                    {
                        id:"123",
                        formID: "",
                        content: "你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核你已经通过审核",
                        createTime: "2019年12月30日 15:44",
                        isRead: 0
                    },
                ],
            }
        },
        methods:{
            deleteMessage(index,id){
                window.console.log(index,id);
                if(index == 0){
                    this.messages = this.messages.slice(1,this.messages.length);
                }else{
                    this.messages = this.messages.slice(0,index).concat(this.messages.slice(index+1,this.messages.length));
                }
            },
            readMessage(index,id){
                this.messages[index].isRead = 1;
                window.console.log(id)
            }
        },
    }
</script>

<style scoped>
    .cms-user-messages {
        height: 78vh;
        overflow-y: scroll;
        justify-content: space-between;
        display: flex;
        flex-wrap: wrap;
    }

    .cms-user-message{
        margin: 1rem 2rem;
        padding: 0 !important;
    }

    .cms-user-message-title {
        font-size: 1rem;
    }

    .cms-user-message-time {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.8rem;
        color: #5b5b5b;
    }

    .cms-user-message-content {
        padding: 0.5rem;
    }

    .cms-user-message-operation {
        text-align: right;
    }

    .cms-user-no-message {
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 1rem;
        padding-top: 1.5rem;
    }
</style>
