<template>
    <el-table
        ref="multipleTable"
        :data="arr"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="60"></el-table-column>
        <!-- label表头，prop指定的字段 -->
        <el-table-column
            prop="username"
            label="用户姓名"
            width="120"
        ></el-table-column>
        <!-- 去掉宽度能够自适应 -->
        <el-table-column prop="address" label="籍贯"></el-table-column>
        <el-table-column label="投资时间" width="180">
            <!-- slot-scope作用域插槽，template空标签，scope就当成变量即可，scope.row就是当前行数据，数组遍历得到对象 -->
            <template slot-scope="scope"
                ><i class="el-icon-time" style="margin-right: 5px"></i
                >{{ scope.row.createTime }}</template
            >
        </el-table-column>
        <el-table-column label="类型" width="100">
            <!-- 类型处理使用映射对象 -->
            <template slot-scope="scope">{{
                typeObj[scope.row.type]
            }}</template>
        </el-table-column>
        <el-table-column label="收入" width="100">
            <template slot-scope="scope"
                ><span style="color: green"
                    >+ {{ scope.row.income }}</span
                ></template
            >
        </el-table-column>
        <el-table-column label="支出" width="100">
            <template slot-scope="scope"
                ><span style="color: red">- {{ scope.row.pay }}</span></template
            >
        </el-table-column>
        <el-table-column label="余额" width="100">
            <template slot-scope="scope"
                ><span style="color: blue"
                    >+ {{ scope.row.money }}</span
                ></template
            >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="warning"
                    @click="handleEdit(scope.row)"
                    >编辑</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script type="text/javascript">
import { deleteHomeApi, batchDeleteApi } from "../../../api/homeApi"
import eventBus from "../../../utils/eventBus"
export default {
    props: ["arr"],
    data() {
        return {
            typeObj: {
                // 映射对象
                0: "充值",
                1: "优惠卷",
                2: "购买一定盈",
            },
            // tableData: [
            //     {
            //         username: "王小虎",
            //         address: "上海市普陀区金沙江路",
            //         createTime: "2022-6-24 10:10:10",
            //         type: 0, //0充值 1优惠卷 2购买一定盈
            //         income: 1000,
            //         pay: 100,
            //         money: 900,
            //     },
            // ],
            multipleSelection: [], // 就是我们checkbox双向数据绑定选中值放到这个数组中
        }
    },
    mounted() {
        eventBus.$on("batchDelete", this.batchDeleteFun)
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        handleDelete(id) {
            deleteHomeApi({ id }).then((res) => {
                if (res.code == 200) {
                    // console.log(res.msg)
                    this.$emit("delParent")
                }
            })
        },
        batchDeleteFun() {
            // multipleSelection这个数组放的是选中元素，把选中元素的id提取出来放到数组里面,使用map
            var idArr = this.multipleSelection.map((item) => item.id)
            // console.log(idArr) // ['8c5f493b-f3C9-Cd80-Ac1D-d9658AF2C8FF', '96Cd1BC9-2DB7-6CDA-61Ca-c66BCAf36F3D']
            batchDeleteApi({ idArr }).then((res) => {
                if (res.code == 200) {
                    // console.log(res.msg) // 成功
                    // 通知父组件数据刷新
                    this.$emit("batchDel")
                }
            })
        },
        handleEdit(val) {
            console.log(val);
            this.$emit('editData', val)
        },
    },
}
</script>

<style lang="less" scoped>
</style>
