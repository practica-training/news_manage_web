<template>
    <div class="user-info-box">
        <div class="user-info-tab">
            <div class="user-info-avatar-box">
                <img v-if="updateUserInfo.userAvatar" :src="BaseUrl + updateUserInfo.userAvatar" @click="clickAvatar">
                <img v-else class="cms-user-avatar" src="../static/images/login.png" @click="clickAvatar">
            </div>
            <input type="file" id="uploadImg" style="display: none;" ref="uploadImg" accept=".png,.jpg,.jpeg"
                   multiple="multiple" @change="uploadAvatar"/>
            <!--                预览大图的img-->
            <img id="preViewImg" @click="$imageViewer" style="display: none;" ref="preViewImg"/>
            <!--                预览大图的img-->
        </div>
        <div v-if="IsOtherUserInfo" class="user-info-tab">
            <el-button type="danger" size="mini" @click="showReport">举报</el-button>
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
                    <el-button v-if="UserInfo.userState != 2" v-show="!isUpdate" style="float: left;" type="danger" plain round @click="showApplication">申请成为新闻发布者
                    </el-button>
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
                        <el-input v-model="newPhone" type="number" :maxlength="11"
                                  placeholder="输入新手机号" @input="inputUserPhone">
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
                <el-form class="cms-not-copy" label-width="100px">
                    <div class="user-info-tab">
                        <div class="user-verified-img" v-if="verifiedUrl" @click="clickCertifiedImg"
                             style="cursor: pointer;">
                            <img :src="BaseUrl +  verifiedUrl">
                        </div>
                        <div class="user-verified-img" v-else-if="verifiedInfo.photo" @click="clickCertifiedImg">
                            <img :src="BaseUrl + verifiedInfo.photo">
                        </div>
                        <div class="user-verified-box" v-else @click="clickCertifiedImg">
                            <div class="user-verified-logo">
                                <i class="el-icon-finished"></i>
                                <i class="el-icon-user-solid"></i>
                            </div>
                        </div>
                        <input type="file" id="uploadCertifiedImg" style="display: none;" ref="uploadCertifiedImg"
                               accept=".png,.jpg,.jpeg"
                               multiple="multiple" @change="uploadCertifiedImg"/>
                    </div>
                    <div class="cms-verified" style="padding: 0 3rem;margin: 1rem;">
                        <template v-if="verifiedInfo.realName">
                            <div class="cms-verified-info">{{verifiedInfo.realName}}</div>
                        </template>
                        <template v-else>
                            <el-form-item label="真实姓名">
                                <el-input v-model="realName" type="text" placeholder="请输入真实姓名"
                                          :maxlength="10"></el-input>
                            </el-form-item>
                        </template>
                        <template v-if="verifiedInfo.idCard">
                            <div class="cms-verified-info">{{verifiedInfo.idCard}}</div>
                        </template>
                        <template v-else>
                            <el-form-item label="身份证">
                                <el-input v-model="idCard" type="text" :maxlength="18" placeholder="请输入身份证"></el-input>
                            </el-form-item>
                        </template>

                        <template v-if="verifiedInfo.reviewState == 0 || verifiedInfo.reviewState == 1">
                            <div class="cms-verified-other-info">{{verifiedInfo.reviewState == 0 ? "等待审核":"已审核"}}</div>
                        </template>

                        <template v-if="verifiedInfo.verifiedTime">
                            <div class="cms-verified-other-info">{{verifiedInfo.verifiedTime}}</div>
                        </template>

                        <template v-if="verifiedInfo.failureReason">
                            <div class="cms-verified-other-info cms-verified-other-info-red">{{verifiedInfo.failureReason}}</div>
                        </template>
                    </div>
                    <div class="cms-verified" style="padding: 0 3rem;margin: 1rem;">
                        <div style="display: flex;justify-content: space-around;">
                            <el-button v-if="verifiedInfo.reviewState != 0 && verifiedInfo.reviewState != 1" type="warning" round @click="updateVerifiedInfo(false)">
                                取消
                            </el-button>
                            <el-button v-if="verifiedInfo.reviewState != 0 && verifiedInfo.reviewState != 1" type="success" round @click="updateVerifiedInfo(true)">
                                提交
                            </el-button>
                            <el-button v-if="verifiedInfo.reviewState != -1" type="danger"
                                       round @click="updateVerifiedInfo(false)">
                                关闭
                            </el-button>
                        </div>
                    </div>
                </el-form>
            </el-dialog>
            <!--            修改密码-->

            <news-comment :title="'举报用户'" :show-drawer="showReportDrawer" :placeholder="'请输入举报原因'" :cancel-info="'是否取消举报'" @cancelSubmitContent="cancelReport" @submitContent="submitReport"></news-comment>

            <news-comment :title="'申请成为新闻发布者'" :show-drawer="showApplicationDrawer" :placeholder="'请输入申请理由'" :cancel-info="'是否取消申请'" @cancelSubmitContent="cancelApplication" @submitContent="submitApplication"></news-comment>
        </div>
    </div>
</template>

<script>
    import {Form, FormItem, Input, Button, Select, Option, Dialog} from "element-ui"
    import store from "../store";
    import NewsComment from "./NewsComment";
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
            NewsComment,
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
                updateUserInfo: {},//用户信息
                verifiedInfo: {
                    // realName: "三三四四",
                    // idCard: "11111111111111111x",
                    // photo: "/upload/getImage?fileName=1577326327037timg.png",
                    // reviewState:0,
                    // failureReason:"速度发送到覅就嗖嗖覅骄傲if接啊搜夫斯基哦is阿杰哦is阿杰搜啊就我阿斯加否撒娇iOS及撒娇非赛季佛阿斯附加赛哦Jason"
                },//实名认证信息
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
                verifiedUrl: "",//身份证图片
                realName: "",//真实姓名
                idCard: "",//身份证号码
                showReportDrawer:false,
                showApplicationDrawer:false
            }
        },
        methods: {
            //点击头像
            clickAvatar() {//点击了头像
                if (this.IsOtherUserInfo) {//如果是查看别人的信息，点击头像则看大图
                    this.$refs.preViewImg.src = this.BaseUrl + this.UserInfo.userAvatar;
                    this.$refs.preViewImg.click();
                } else {//否则是修改头像
                    this.$refs.uploadImg.click();
                }
            },
            //上传头像
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
                        if (res.data.success) {
                            this.updateUserInfo.userAvatar = "/upload/getImage?fileName=" + res.data.url;
                            this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                                loading.close();
                                if (res.data.success) {
                                    this.$message.success("头像已修改");
                                    store.commit("setUserInfo", this.updateUserInfo);
                                    localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                                } else {
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

            //在输入手机号码时,控制长度
            inputUserPhone(val) {
                if (val.length > 11) {
                    this.newPhone = this.newPhone.slice(0, 11);
                }
            },

            //验证手机号码是否重复
            async validateUserPhone() {
                let newPhone = this.newPhone;
                if (newPhone) {
                    if (newPhone.length != 11) {
                        this.userPhoneSuffixIcon = "el-icon-circle-close";
                        this.$message.error("输入长度不符合");
                        return false;
                    }
                    if (this.UserInfo.userPhone == newPhone) {
                        this.userPhoneSuffixIcon = "el-icon-circle-check";
                        return true;
                    }
                    let result = await this.$API.checkUserPhone(newPhone);
                    if (result.data.success) {
                        this.userPhoneSuffixIcon = "el-icon-circle-check";
                        return true;
                    } else {
                        this.userPhoneSuffixIcon = "el-icon-circle-close";
                        this.$message.error("该手机号已注册");
                        return false;
                    }
                } else {
                    this.userPhoneSuffixIcon = "el-icon-circle-close";
                    this.$message.error("输入不能为空");
                    return false;
                }
            },

            //更新手机号
            updatePhone(isUpdate) {
                if (isUpdate) {
                    let canUpdate = this.validateUserPhone();
                    canUpdate.then(result => {
                        if (result) {
                            if (this.UserInfo.userPhone == this.newPhone) {//如果新的手机和旧的一样，则直接修改成功
                                this.$message.success("修改成功");
                                this.showUpdatePhoneDialog = false;
                                this.newPhone = "";
                                return;
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
                                } else {
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
                            return;
                        }
                    })
                } else {
                    this.showUpdatePhoneDialog = false;
                    this.newPhone = "";
                }
            },
            //修改密码
            updatePassword(isUpdate) {
                if (isUpdate) {
                    let oldPassword = this.oldPassword;
                    let newPassword = this.newPassword;
                    let newPassword2 = this.newPassword2;
                    if (oldPassword && newPassword && newPassword2) {
                        if (oldPassword != this.UserInfo.userPassword) {//和原密码不同
                            this.$message.error("旧密码不符合");
                            return;
                        }
                        if (newPassword != newPassword2) {//重复输入面膜不对
                            this.$message.error("两次输入的密码不相同");
                            return;
                        }
                        if (oldPassword == newPassword) {//新旧密码相同，则直接修改成功
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
                            } else {
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
                    } else {
                        this.$message.error("输入不能为空");
                    }
                } else {
                    this.showUpdatePasswordDialog = false;
                    this.oldPassword = "";
                    this.newPassword = "";
                    this.newPassword2 = "";
                }
            },
            //修改基本信息
            updateBaseInfo(isUpdate) {
                if (isUpdate) {
                    if (this.updateUserInfo.userNickname == this.UserInfo.userNickname && this.updateUserInfo.userSex == this.UserInfo.userSex) {//没有修改信息
                        this.$message.success("修改成功");
                        this.isUpdate = false;
                    } else {
                        let loading = this.$loading({
                            text: "正在修改"
                        });
                        this.$API.updateUserInfo(this.updateUserInfo).then(res => {
                            if (res.data.success) {
                                this.$message.success("修改成功");
                                store.commit("setUserInfo", this.updateUserInfo);
                                localStorage.setItem("userInfo", JSON.stringify(this.updateUserInfo));
                                loading.close();
                            } else {
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
                } else {
                    this.updateUserInfo = JSON.parse(JSON.stringify(this.UserInfo));
                    this.isUpdate = false;
                }
            },

            //显示实名认证窗口
            showVerifiedInfo() {
                this.showCertifiedDialog = true;
                if (this.verifiedInfo.photo && this.verifiedInfo.realName && this.verifiedInfo.idCard){
                    return;
                } else if (store.state.verifiedInfo) {
                    this.verifiedInfo = store.state.verifiedInfo;
                } else {
                    this.$API.getVerifiedInfo().then(res => {
                        window.console.log(res);
                    })
                }
                window.console.log(this.verifiedInfo)
            },

            //点击实名认证的图片
            clickCertifiedImg() {
                if (this.verifiedInfo.photo) {//如果有照片,则查看详情

                } else {
                    this.$refs.uploadCertifiedImg.click();
                }
            },

            //上传实名认证图片
            uploadCertifiedImg() {
                let file = this.$refs.uploadCertifiedImg.files[0];
                let imageType = file.name.split(".")[1];
                let imageSize = file.size / 1024;
                if (imageSize > 500) {
                    this.$message.error("实名认证图片大小不能超过500k");
                } else if (imageType != "png" && imageType != "jpg" && imageType != "jpeg") {
                    this.$message.error("只能上传 png、jpg 和 jpeg文件");
                } else {
                    let loading = this.$loading({
                        text: "正在上传"
                    });
                    this.$API.uploadAvatar(file).then(res => {
                        window.console.log(res)
                        loading.close();
                        if (res.data.success) {
                            this.$message.success("上传成功");
                            this.verifiedUrl = "/upload/getImage?fileName=" + res.data.url;
                        } else {
                            this.$message.error("上传失败");
                        }
                    }).catch(() => {
                        loading.close();
                        this.$message.error("发生意外错误");
                    })
                }
            },

            //提交实名认证信息
            updateVerifiedInfo(isUpdate) {
                if (isUpdate) {
                    let realName = this.realName;
                    let idCard = this.idCard;
                    let verifiedUrl = this.verifiedUrl;
                    if (realName.length == 0 || idCard.length == 0) {
                        this.$message.error("输入不能为空");
                        return;
                    }

                    if (idCard.length != 18) {
                        this.$message.error("身份证号码长度不符合");
                        return;
                    }

                    if (!verifiedUrl) {
                        this.$message.error("没有上传手持身份证照片");
                        return;
                    }
                    let verifiedInfo = {
                        realName: realName,
                        idCard: idCard,
                        photo: verifiedUrl
                    };
                    let loading = this.$loading({
                        text: "正在提交"
                    });
                    this.$API.updateVerifiedInfo(verifiedInfo).then(res => {
                        window.console.log(res);
                        loading.close();
                        if (res.data.success) {
                            this.$message.success("提交成功");
                            this.verifiedInfo = res.data.userVerified;
                            store.commit("setVerifiedInfo", verifiedInfo);
                        } else {
                            this.$message.error("提交失败");
                        }
                        this.verifiedUrl = "";
                        this.realName = "";
                        this.idCard = "";
                        this.showCertifiedDialog = false;
                    }).catch(() => {
                        loading.close();
                        this.$message.error("发生意外错误");
                        this.verifiedUrl = "";
                        this.realName = "";
                        this.idCard = "";
                        this.showCertifiedDialog = false;
                    })
                } else {
                    this.verifiedUrl = "";
                    this.realName = "";
                    this.idCard = "";
                    this.showCertifiedDialog = false;
                }
            },

            //显示申请成为新闻发布者
            showApplication(){
                //如果没绑定手机
                if(!this.UserInfo.userPhone){
                    this.$message.error("请先绑定手机号");
                    return;
                }
                //如果没实名认证
                if(this.UserInfo.isCertified == 0){
                    this.$message.error("请先实名认证");
                    return;
                }
                this.showApplicationDrawer = true;
            },

            //取消申请
            cancelApplication(){
                this.showApplicationDrawer = false;
            },

            //提交申请
            submitApplication(content){
                window.console.log(content);
                this.showApplicationDrawer = false;
            },

            //显示举报
            showReport(){
                this.showReportDrawer = true;
            },

            //取消举报
            cancelReport(){
                this.showReportDrawer = false;
            },

            //确认举报
            submitReport(content){
                this.showReportDrawer = false;
                window.console.log(content)
            },
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

    .user-verified-box {
        transition: 0.5s;
        padding: 2rem 4rem;
        border-radius: 15px;
        background-color: #e0e0e0;
        cursor: pointer;
    }

    .user-verified-box:hover {
        transition: 0.5s;
        background-color: #e8e8e8;
        box-shadow: 0px 0px 8px #999999;
    }

    .user-verified-logo {
        padding: 1rem;
        border: 3px solid #5B5B5B;
        color: #5B5B5B;
        font-size: 4rem;
    }

    .user-verified-box:hover .user-verified-logo {
        transition: 0.5s;
        border: 3px solid #2F7AA6;
        color: #2F7AA6;
    }

    .user-verified-img {
        height: 12rem;
        width: 17rem;
        padding: 0.4rem;
        background-color: #e8e8e8;
    }

    .user-verified-img > img {
        height: 100%;
        width: 100%;
    }

    .cms-verified-info {
        padding: 0 3rem;
        font-size: 1.2rem;
        text-align: center;
        color: #475669;
    }

    .cms-verified-other-info{
        padding: 0 3rem;
        font-size: 0.8rem;
        color: #1d6296;
        text-align: center;
        margin: 0.5rem;
    }

    .cms-verified-other-info-red{
        color: indianred;
    }
</style>
