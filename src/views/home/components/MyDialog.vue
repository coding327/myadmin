<template>
    <!-- 嵌套表单的对话框组件 -->
    <el-dialog
        title="添加"
        :visible.sync="dialogFormVisible"
        width="30%"
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
                    <el-option label="选择" value=""></el-option>
                    <el-option label="充值" value="0"></el-option>
                    <el-option label="优惠卷" value="1"></el-option>
                    <el-option label="购买一定盈" value="2"></el-option>
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
                <el-button
                    type="primary"
                    @click="submitForm('form')"
                    >提 交</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import eventBus from "../../../utils/eventBus"
// 引入中国的省市区区域json文件【就是个数组】
import area from "../../../assets/area.json"
export default {
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
            dialogFormVisible: true, // 控制对话框的显示和隐藏[设置为true方便操作，之后再改回来]
            form: {
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
        eventBus.$on("dialogShowA", () => {
            this.dialogFormVisible = !this.dialogFormVisible
        })
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done()
                })
                .catch((_) => {})
        },
        cancelForm() {
            this.dialogFormVisible = false
        },
        submitForm(formName) {
            this.dialogFormVisible = false
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!")
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
</style>
