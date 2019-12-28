<template>
    <!--    页脚组件-->
    <!--    :class="{'cms-footer-position':HasScroll}"-->
    <el-row v-show="IsShow" v-cloak class="cms-footer">
        <el-col :sm="24" :md="6" class="cms-footer-img-box">
            <img src="../static/images/logo/logo.png"/>
        </el-col>
        <el-col :sm="24" :md="8" class="cms-footer-box">
            <div class="cms-footer-tap">版权所有&nbsp;&copy;ShowNews</div>
            <div class="cms-footer-tap">
                <span class="cms-footer-tap cms-view-num" style="position: relative;top: -1px;">浏览量:9698474824</span>
            </div>
        </el-col>
        <el-col :sm="24" :md="6" class="cms-footer-box">
            <div class="cms-footer-tap" @click="showFeedbackDialog = true" style="cursor:pointer;">我要反馈</div>
            <div class="cms-footer-tap">
                <span class="cms-footer-tap cms-view-num">邮编：123456</span>
            </div>
        </el-col>
        <el-dialog title="反馈" :visible.sync="showFeedbackDialog" :modal="false" width="85%">
            <div class="cms-flex-box cms-margin-small">
                <el-input
                        class="cms-comment-input"
                        type="textarea"
                        :autosize="{minRows:4}"
                        maxlength="200"
                        show-word-limit
                        placeholder="请输入反馈内容"
                        v-model="feedbackContent"
                        resize="none">
                </el-input>
            </div>
            <div class="flex-end" :xl="12" :lg="14" :md="18" :sm="20" :xs="22" style="margin: 1rem 0;">
                <el-button type="warning" round @click="submitFeedBack(false)">取消</el-button>
                <el-button type="success" round @click="submitFeedBack(true)">提交反馈</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import {Input, Form, FormItem, Dialog} from "element-ui"
    import store from "../store";

    export default {
        name: "CmsFooter",
        store,
        props: {
            CmsConfig: {    //网站配置
                type: Object,
            },
            HasScroll: { //是否有滚动条
                type: Boolean,
            },
            IsShow: {   //是否显示
                type: Boolean,
            }
        },
        data() {
            return {
                showFeedbackDialog: false,
                feedbackContent: "",
            }
        },
        components: {
            [Input.name]: Input,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Dialog.name]: Dialog
        },
        watch: {
            HasScroll() {

            }
        },
        methods: {
            submitFeedBack(isSubmit) {
                if (isSubmit) {
                    if (this.feedbackContent && this.feedbackContent.length != 0) {
                        if (store.state.userId && store.state.userInfo) {//已经登录了
                            let loading = this.$loading({
                                text: "正在提交"
                            });
                            this.$API.sendMessage(this.feedbackContent).then(res => {
                                if (res.data.success) {
                                    loading.close();
                                    this.feedbackContent = "";
                                    this.$message.success("已提交，感谢你的反馈");
                                    this.showFeedbackDialog = false;
                                } else {
                                    loading.close();
                                    this.$message.error("提交失败");
                                }
                            }).catch(() => {
                                loading.close();
                                this.$message.error("发生意外错误");
                            })
                        } else {
                            this.$message.error("请先登录");
                        }
                    } else {
                        this.$message.error("反馈内容不能为空");
                    }
                } else {
                    this.feedbackContent = "";
                    this.showFeedbackDialog = false;
                }
            }
        }
    }
</script>

<style scoped>
    .cms-footer {
        display: flex;
        padding: 0.5rem 1rem;
        width: 100%;
        justify-content: space-around;
        flex-flow: wrap;
        background-image: url(../static/images/footer.png);
        background-repeat: no-repeat;
        background-color: #003674;
    }

    .cms-footer-position {
        position: absolute;
        bottom: 0;
    }

    .cms-footer-img-box {
        padding-top: 1rem;
    }

    .cms-footer-img-box > img {
        height: 5rem;
        width: 5rem;
    }

    .cms-footer-box {
        padding-top: 0.5rem;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
    }

    .cms-footer-tap {
        font-size: 0.9rem;
        color: #f0f0f0;
    }


    .cms-footer-tap > a {
        color: #F0f0f0;
    }

    .cms-footer-tap-href {
        float: left;
    }

    .cms-footer-tap-separator {
        float: left;
        font-size: 0.9rem;
        margin: 0 3px;
    }

    .cms-view-num {
        margin-right: 1rem;
    }

    @media screen and (max-width: 992px) {
        .cms-view-num {
            display: block;
            width: 100%;
        }
    }
</style>
