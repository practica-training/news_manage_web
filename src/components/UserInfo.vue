<template>
    <div class="user-info-box">
        <div class="user-info-tab">
            <div class="user-info-avatar-box">
                <img :src="BaseUrl + updateUserInfo.userAvatar" @click="clickAvatar">
            </div>
            <input type="file" id="uploadImg" style="display: none;" ref="uploadImg" accept=".png,.jpg,.jpeg"
                   multiple="multiple" @change="uploadAvatar"/>
            <!--                预览大图的img-->
            <img id="preViewImg" @click="$imageViewer" style="display: none;" ref="preViewImg"/>
            <!--                预览大图的img-->
        </div>
        <div class="user-info-tab">
            <el-form class="cms-not-copy" label-position="right" :label-width="IsOtherUserInfo?'100px':'180px'"
                     :model="updateUserInfo">
                <el-form-item v-if="!IsOtherUserInfo" label="用户名" class="user-info-title">
                    <div class="user-info-decision">{{UserInfo.userName}}</div>
                </el-form-item>
                <el-form-item label="昵称" class="user-info-title">
                    <div v-show="!isUpdate">
                        <div class="user-info-decision">{{UserInfo.userNickname}}</div>
                    </div>
                    <el-input v-show="isUpdate" v-model="updateUserInfo.userNickname" @change="validateUserNickname">
                        <span slot="suffix"
                              :class="userNickNameSuffixIcon == 'el-icon-circle-check' ? 'validateSuccess' : 'validateFail'"><i
                                :class="userNickNameSuffixIcon"></i></span>
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" class="user-info-title">
                    <div v-show="!isUpdate">
                        <div class="user-info-decision">{{UserInfo.userSex == 0 ? '女' : '男'}}</div>
                    </div>
                    <el-select v-show="isUpdate" v-model="updateUserInfo.userSex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo" label="手机" class="user-info-title">
                    <div v-if="UserInfo.userPhone">
                        <span class="user-info-decision">{{UserInfo.userPhone.slice(0,3)}}***{{UserInfo.userPhone.slice(UserInfo.userPhone.length-4,UserInfo.userPhone.length)}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button v-show="!isUpdate" type="warning" size="mini" round plain
                                   @click="showUpdatePhoneDialog = true">
                            更换手机
                        </el-button>
                    </div>
                    <div v-else>
                        <el-button type="danger" size="mini" @click="showAddPhoneDialog = true">绑定手机</el-button>
                    </div>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo" label="密码" class="user-info-title">
                    <div v-show="!isUpdate">
                        <el-button type="primary" size="mini" round plain @click="showUpdatePasswordDialog = true">
                            修改密码
                        </el-button>
                    </div>
                    <div v-show="isUpdate" class="user-info-decision">
                        ******
                    </div>
                </el-form-item>
                <el-form-item label="实名认证" class="user-info-title">
                    <div v-if="updateUserInfo.isCertified" class="user-info-decision">已认证</div>
                    <div v-else-if="!IsOtherUserInfo" class="user-info-decision">未认证&nbsp;&nbsp;<span
                            class="user-info-to-certified" @click="showVerifiedInfo">去实名认证</span></div>
                    <div v-else class="user-info-decision">未认证</div>
                </el-form-item>
                <el-form-item label="注册时间" class="user-info-title">
                    <div class="user-info-decision">{{updateUserInfo.registrationTime}}</div>
                </el-form-item>
                <el-form-item label="违规次数" class="user-info-title">
                    <div class="user-info-decision">{{updateUserInfo.violationNumber}}</div>
                </el-form-item>
                <div v-if="!IsOtherUserInfo" class="cms-divide-line"></div>
                <el-form-item>
                </el-form-item>
                <el-form-item v-if="!IsOtherUserInfo">
                    <el-button v-show="!isUpdate" style="float: right;" plain round @click="isUpdate = true">修改资料
                    </el-button>
                    <el-button v-show="isUpdate" style="float: left;" type="primary" round
                               @click="updateBaseInfo(false)">
                        取消修改
                    </el-button>
                    <el-button v-show="isUpdate" style="float: right;" type="success" round
                               @click="updateBaseInfo(true)">
                        确认修改
                    </el-button>
                </el-form-item>
            </el-form>

            <!--            修改密码-->
            <el-dialog title="修改密码" :visible.sync="showUpdatePasswordDialog" :modal="false" width="85%">
                <el-form class="cms-not-copy">
                    <el-form-item label="旧密码">
                        <el-input v-model="oldPassword" type="password" placeholder="输入旧密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="newPassword" type="password" placeholder="输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="newPassword2" type="password" placeholder="再一次输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: left;" type="warning" round @click="updatePassword(false)">
                            取消修改
                        </el-button>
                        <el-button style="float: right;" type="success" round @click="updatePassword(true)">
                            确认修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--            修改密码-->

            <!--            修改手机号码-->
            <el-dialog title="更改手机号码" :visible.sync="showUpdatePhoneDialog" :modal="false" width="85%">
                <el-form class="cms-not-copy">
                    <el-form-item label="手机号">
                        <el-input v-model="newPhone" type="number" :min-length="11" :max-length="11"
                                  placeholder="输入新手机号" @change="validateUserPhone">
                            <span slot="suffix"
                                  :class="userPhoneSuffixIcon == 'el-icon-circle-check' ? 'validateSuccess' : 'validateFail'"><i
                                    :class="userPhoneSuffixIcon"></i></span>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: left;" type="warning" round @click="updatePhone(false)">
                            取消修改
                        </el-button>
                        <el-button style="float: right;" type="success" round @click="updatePhone(true)">
                            确认修改
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--            修改密码-->

            <!--            实名认证-->
            <el-dialog title="实名认证" :visible.sync="showCertifiedDialog" :modal="false" width="85%">
                <el-form class="cms-not-copy">
                    <div class="user-info-tab">
                        <div class="user-verified-box">
                            <img :src="verifiedUrl" @click="clickCertifiedImg">
                        </div>
                        <input type="file" id="uploadCertifiedImg" style="display: none;" ref="uploadCertifiedImg"
                               accept=".png,.jpg,.jpeg"
                               multiple="multiple" @change="uploadCertifiedImg"/>
                    </div>
                    <el-form-item>
                        <el-button style="float: right;" type="warning" round @click="updatePhone(false)">
                            取消
                        </el-button>
                        <el-button type="danger" round @click="updatePhone(false)">
                            关闭
                        </el-button>
                        <el-button style="float: right;" type="success" round @click="updatePhone(true)">
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <!--            修改密码-->
        </div>
    </div>
</template>

<script>
    import {Form, FormItem, Input, Button, Select, Option, Dialog} from "element-ui"
    import store from "../store";

    export default {
        name: "UserInfo",
        props: {
            BaseUrl: {
                type: String
            },
            UserInfo: {
                type: Object
            },
            IsOtherUserInfo: {//是否是查看别人的资料
                type: Boolean,
                default: false
            }
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Button.name]: Button,
            [Select.name]: Select,
            [Option.name]: Option,
            [Dialog.name]: Dialog
        },
        data() {
            return {
                updateUserInfo: {},
                isUpdate: false,
                userNickNameSuffixIcon: "",
                showUpdatePasswordDialog: false,//是否显示修改密码的窗口
                oldPassword: "",//旧密码
                newPassword: "",//新密码
                newPassword2: "",//第二次输入新密码
                userPhoneSuffixIcon: "",
                showAddPhoneDialog: false,//绑定手机弹窗
                showUpdatePhoneDialog: false,//修改手机弹窗
                newPhone: "",//新手机
                isCheckPhone: false,//是否已经验证手机号码
                showCertifiedDialog: false,//是否显示实名认证窗口
                verifiedUrl: "../static/image/verified.svg"
            }
        },
        methods: {
            clickAvatar() {//点击了头像
                if (this.IsOtherUserInfo) {//如果是查看别人的信息，点击头像则看大图
                    this.$refs.preViewImg.src = this.BaseUrl + this.UserInfo.userAvatar;
                    this.$refs.preViewImg.click();
                } else {//否则是修改头像
                    this.$refs.uploadImg.click();
                }
            },
            uploadAvatar() {//上传新头像
                let file = this.$refs.uploadImg.files[0];
                let imageType = file.name.split(".")[1];
                let imageSize = file.size / 1024;
                if (imageSize > 500) {
                    this.$message.error("头像大小不能超过500k");
                } else if (imageType != "png" && imageType != "jpg" && imageType != "jpeg") {
                    this.$message.error("只能上传 png、jpg 和 jpeg文件");
                } else {
                    let loading = this.$loading({
                        text: "正在上传"
                    });
                    this.$API.uploadAvatar(file).then(res => {
                        if (res.data) {
                            this.updateUserInfo.userAvatar = "/upload/getImage?fileName=" + res.data.url;
                            this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                                loading.close();
                                if (res.data.success) {
                                    this.$message.success("头像已修改");
                                    store.commit("setUserInfo", this.updateUserInfo);
                                    localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                                }else{
                                    this.$message.error("头像修改失败");
                                    this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                                }
                            })
                        } else {
                            loading.close();
                            this.$message.error("上传失败");
                            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                        }
                    }).catch(() => {
                        loading.close();
                        this.$message.error("发生意外错误");
                        this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                    })
                }
            },

            validateUserNickname(newVal) {//验证用户昵称是否重复
                if (newVal) {
                    if (newVal == this.UserInfo.userNickname) {//如果没改
                        this.userNickNameSuffixIcon = "el-icon-circle-check";
                        return;
                    }
                    this.$API.checkUserNickname(newVal).then(res => {
                        if (res.data.success) {
                            this.userNickNameSuffixIcon = "el-icon-circle-check";
                        } else {
                            this.userNickNameSuffixIcon = "el-icon-circle-close";
                            this.$message.error("当前昵称已存在");
                        }
                    }).catch(() => {
                        this.$message.error("发生意外错误");
                    })
                } else {
                    this.userNickNameSuffixIcon = "el-icon-circle-close";
                    this.$message.error("输入不能为空");
                }
            },

            validateUserPhone() {//验证手机号码是否重复
                let newPhone = this.newPhone;
                if (newPhone) {
                    if (newPhone.length != 11) {
                        this.userPhoneSuffixIcon = "el-icon-circle-close";
                        this.$message.error("输入长度不符合");
                        return;
                    }
                    this.$API.checkUserPhone(newPhone).then(res => {
                        if (res.data.success) {
                            this.userPhoneSuffixIcon = "el-icon-circle-check";
                            this.isCheckPhone = true;
                        } else {
                            this.userPhoneSuffixIcon = "el-icon-circle-close";
                            this.$message.error("当前手机号已注册");
                        }
                    }).catch(() => {
                        this.$message.error("发生意外错误");
                    })
                } else {
                    this.userPhoneSuffixIcon = "el-icon-circle-close";
                    this.$message.error("输入不能为空");
                }
            },

            async updatePhone(isUpdate) {//更新手机号
                if (isUpdate) {
                    if (!this.isCheckPhone) {
                        await this.validateUserPhone();
                    }
                    let loading = this.$loading({
                        text: "正在修改"
                    });
                    this.updateUserInfo.userPhone = this.newPhone;
                    this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                        if (res.data.success) {
                            loading.close();
                            this.$message.success("修改成功");
                            store.commit("setUserInfo", this.updateUserInfo);
                            localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                            this.showUpdatePhoneDialog = false;
                            this.newPhone = "";
                        }else{
                            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                            this.$message.error("修改失败");
                            loading.close();
                        }
                    }).catch(() => {
                        this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                        loading.close();
                        this.$message.error("发生意外错误");
                    })
                } else {
                    this.showUpdatePhoneDialog = false;
                    this.newPhone = "";
                }
            },

            updatePassword(isUpdate) {//修改密码
                if (isUpdate) {
                    let oldPassword = this.oldPassword;
                    let newPassword = this.newPassword;
                    let newPassword2 = this.newPassword2;
                    if(oldPassword && newPassword && newPassword2){
                        if(oldPassword != this.UserInfo.oldPassword){//和原密码不同
                            this.$message.error("旧密码不符合");
                            return;
                        }
                        if(newPassword != newPassword2){//重复输入面膜不对
                            this.$message.error("两次输入的密码不相同");
                            return;
                        }
                        if(oldPassword == newPassword){//新旧密码相同，则直接修改成功
                            this.$message.success("修改成功");
                            this.showUpdatePasswordDialog = false;
                            this.oldPassword = "";
                            this.newPassword = "";
                            this.newPassword2 = "";
                            return;
                        }

                        let loading = this.$loading({
                            text: "正在修改"
                        });
                        this.updateUserInfo.userPassword = this.newPassword;
                        this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                            if (res.data.success) {
                                this.$message.success("修改成功");
                                store.commit("setUserInfo", this.updateUserInfo);
                                localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                                loading.close();
                            }else{
                                this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                                this.$message.error("修改失败");
                                loading.close();
                            }
                            this.showUpdatePasswordDialog = false;
                            this.oldPassword = "";
                            this.newPassword = "";
                            this.newPassword2 = "";
                        }).catch(() => {
                            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                            loading.close();
                            this.$message.error("发生意外错误");
                        })
                    }else{
                        this.$message.error("输入不能为空");
                    }
                } else {
                    this.showUpdatePasswordDialog = false;
                    this.oldPassword = "";
                    this.newPassword = "";
                    this.newPassword2 = "";
                }
            },

            updateBaseInfo(isUpdate) {//修改基本信息
                if(isUpdate){
                    if(this.updateUserInfo.userNickname == this.UserInfo.userNickname && this.updateUserInfo.userSex == this.UserInfo.userSex){//没有修改信息
                        this.$message.success("修改成功");
                        this.isUpdate = false;
                    }else{
                        let loading = this.$loading({
                            text: "正在修改"
                        });
                        this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                            if (res.data.success) {
                                this.$message.success("修改成功");
                                store.commit("setUserInfo", this.updateUserInfo);
                                localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                                loading.close();
                            }else{
                                this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                                this.$message.error("修改失败");
                                loading.close();
                            }
                            this.isUpdate = false;
                        }).catch(() => {
                            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                            loading.close();
                            this.$message.error("发生意外错误");
                        })
                    }
                }else{
                    this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                    this.isUpdate = false;
                }
            },

            showVerifiedInfo() {
                this.showCertifiedDialog = true;
            },

            clickCertifiedImg() {

            },

            uploadCertifiedImg() {

            }
        },
        created() {
            this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
        }
    }
</script>

<style scoped>
    .user-info-box {
        padding: 0 1rem;
        height: 80vh;
    }

    .user-info-tab {
        display: flex;
        justify-content: center;
        margin: 8px 0;
    }

    .user-info-avatar-box {
        height: 7rem;
        width: 7rem;
        border-radius: 50%;
        border: 5px solid #dddddd;
    }

    .user-info-avatar-box > img {
        height: 100%;
        width: 100%;
        border: 2px solid #f0f0f0;
        border-radius: 50%;
        cursor: pointer;
    }

    .user-info-title {
        transition: 0.5s;
        margin-bottom: 0.5rem !important;
        padding: 0;
    }

    .user-info-title:hover {
        transition: 0.5s;
        background-color: #f0f0f0;
    }

    .user-info-decision {
        font-size: 1rem;
        color: #8B8B8B;
    }

    .user-info-to-certified {
        transition: 0.5s;
        font-size: 0.9rem;
        color: #2F7AA6;
        cursor: pointer;
    }

    .user-info-to-certified:hover {
        transition: 0.5s;
        color: #3a8ee6;
    }

    .cms-divide-line {
        height: 1px;
        width: 80%;
        position: absolute;
        left: 10%;
        background-color: #999999;
    }

    .validateSuccess {
        color: lightgreen;
    }

    .validateFail {
        color: orangered;
    }
</style>
