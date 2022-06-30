<template>
    <!-- 嵌套表单的对话框组件 -->
    <el-dialog
        title="添加"
        width="30%"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
    >
        <!-- 表单 -->
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form"
        >
            <!-- 下拉框，收支类型 【注意表单label和prop配套使用】-->
            <el-form-item label="收支类型" prop="type">
                <!-- 双向数据绑定对象里的属性 -->
                <el-select v-model="form.type" placeholder="请选择收支类型">
                    <!-- 注意这里的value有个问题它是字符串，和我们父组件里，MyTable组件type值得数据类型不同，传过来的是数字类型而不是字符串，我们只需要把下面value动态绑定，双引号里面数字不加引号就认为是数字类型，再加引号就是字符串 -->
                    <el-option label="选择" value=""></el-option>
                    <el-option label="充值" :value="0"></el-option>
                    <el-option label="优惠卷" :value="1"></el-option>
                    <el-option label="购买一定盈" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- 普通输入框 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <!-- 级联选择器 -->
            <el-form-item label="籍贯" prop="address">
                <el-cascader
                    v-model="form.address"
                    :options="options"
                    :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
            </el-form-item>
            <!-- 普通输入框 -->
            <el-form-item label="收入" prop="income">
                <el-input v-model="form.income"></el-input>
            </el-form-item>
            <!-- 普通输入框 -->
            <el-form-item label="支出" prop="pay">
                <el-input v-model="form.pay"></el-input>
            </el-form-item>
            <!-- 普通输入框 -->
            <el-form-item label="余额" prop="money">
                <el-input v-model="form.money"></el-input>
            </el-form-item>
            <!-- 按钮，一定注意submitForm()里面【包括重置表单resetSubmit()】的参数是字符串类型，也是表单双向绑定的数组名 -->
            <el-form-item>
                <el-button @click="cancelForm">取消</el-button>
                <el-button type="primary" @click="submitForm('form')"
                    >提 交</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
// 引入中国的省市区区域json文件【就是个数组】
import area from "../../../assets/area.json"
// 引入添加数据请求接口
import { addFunApi, editFunApi } from "../../../api/homeApi"
export default {
    props: ["row", "btnType"], // props与data平级
    data() {
        // 注意data是个函数，可以在里面写js代码
        // rule可以写上正则表达式，value是你所验证的属性对应的表单框里的值
        // var validateMyname = (rule, value, callback) => {
        //     if (value == "") {
        //         callback(new Error("输入的值不能为空，请从新输入"))
        //     } else if (value.length < 3 || value.length > 5) {
        //         callback(new Error("不满足条件，值是大于等于3小于等于5"))
        //     } else {
        //         callback()
        //     }
        // }
        return {
            options: area, // 籍贯的选项
            dialogVisible: true, //控制弹框的显示和隐藏的
            form: {
                id: "",
                username: "",
                address: "",
                type: "",
                income: "",
                pay: "",
                money: "",
            },
            rules: {
                //rules对应form属性的验证规则【注意是数组说明规则可以有多个，还支持自定义，可以一起写在一块,但是这种规则比如username里的数组有多个起了冲突就看谁先写前面谁就生效】
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur", // 输入类型的推荐使用blur,选择类型的推荐使用change
                    },
                    // {
                    //     min: 3,
                    //     max: 5,
                    //     message: "长度在 3 到 5 个字符",
                    //     trigger: "blur",
                    // },
                    // 支持自定义验证规则【validator是个回调函数】
                    // { validator: validateMyname, trigger: "blur" },
                ],
                address: [
                    {
                        required: true,
                        message: "请选择籍贯",
                        trigger: "change", // 选择类型推荐使用change
                    },
                ],
                type: [
                    {
                        required: true,
                        message: "请选择收支类型",
                        trigger: "change",
                    },
                ],
                income: [
                    {
                        required: true,
                        message: "请输入收入",
                        trigger: "blur",
                    },
                ],
                pay: [
                    {
                        required: true,
                        message: "请输入支出",
                        trigger: "blur",
                    },
                ],
                money: [
                    {
                        required: true,
                        message: "请输入余额",
                        trigger: "blur",
                    },
                ],
            },
        }
    },
    mounted() {
        this.form = JSON.parse(JSON.stringify(this.row))
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    // 这里补一个让对话框组件和取消按钮一样的发送事件
                    this.$emit("cancelForm")
                    done()
                })
                .catch((_) => {})
        },
        cancelForm() {
            this.$emit("cancelForm")
        },
        // 表单提交
        submitForm(formName) {
            // 注意formName是形参，最终通过中括号拿到组件，实参得是字符串类型的表单键名【那个表单对象存储用户名和密码】

            // 地址格式转换，因为area.json里的value值是数字字符串缘故，格式转换,注意数组转为字符串类型,格式上保存一致带个空格
            var newAddress = this.getAddress(this.form.address, area)
            this.form.address = newAddress.join(" ")

            // console.log(formName)
            // this.$refs[formName]拿到表单组件
            // validate: 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise

            // 验证表单数据，这个是最终验证，之前每个输入框对应自己的验证规则都通过，代表最终验证通过【所有的都通过才表示都通过才能提交】
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // valid是个布尔值，代表最终验证通过就执行里面代码
                    // 如果按钮类型为0，就调用添加请求接口
                    if (this.btnType == 0) {
                        addFunApi(this.form).then((res) => {
                            if (res.code == 200) {
                                // console.log(res.msg)
                                this.$emit("resetTable") // 刷新数据
                            }
                        })
                    } else {
                        // 修改数据，调用更新接口
                        editFunApi(this.form).then((res) => {
                            if (res.code == 200) {
                                console.log(res.msg)
                                this.$emit("resetTable") // 刷新数据
                            }
                        })
                    }
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        // 修改后发现籍贯显示为数字[area.json文件里面就有个value数字值]，属于正常现象是不需要转换的，但是我们可以转换一下【数字产生原因：area.json文件里的value是数字字符串，修改后发给后端，前端再请求回来渲染就成数字了】
        // 解决方法在调用请求接口之前进行地址格式转换
        getAddress(address, area) {
            // 地址格式转换[110000, 110001, 110011] => ['北京省','aa市','aa区']
            return address.map((item) => {
                for (var val of area) {
                    if (val.value == item) {
                        area = val.children
                        return val.label
                    }
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
</style>
