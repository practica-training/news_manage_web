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
                messages: [],
            }
        },
        methods:{
            initMessages(){
                this.$API.getUserMessages().then(res => {
                    window.console.log(res.data);
                    if(res.data.success){
                        this.messages = res.data.list;
                    }
                })
            },
            //删除消息
            deleteMessage(index,id){
                let loading = this.$loading({
                    text: "正在删除"
                });
                this.$API.deleteMessage(id).then(res => {
                   if(res.data.success){
                       loading.close();
                       if(index == 0){
                           this.messages = this.messages.slice(1,this.messages.length);
                       }else{
                           this.messages = this.messages.slice(0,index).concat(this.messages.slice(index+1,this.messages.length));
                       }
                   }
                });
            },
            //读消息
            readMessage(index){
                this.messages[index].isRead = 1;
                let loading = this.$loading();
                this.$API.readMessage(this.messages[index]).then(res => {
                    window.console.log(res)
                });
                loading.close();
            }
        },
        created() {
            this.initMessages();
        }
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
