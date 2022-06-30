<template>
    <div class="container">
        <div class="left-title">
            <el-input placeholder="请输入用户名" v-model="search" clearable>
            </el-input>
            <el-button @click="searchFun" type="primary">搜索</el-button>
        </div>
        <div>
            <el-button type="primary" @click="batchDelete">批量删除</el-button>
            <el-button type="primary" @click="addShow">添加</el-button>
        </div>
    </div>
</template>

<script type="text/javascript">
import eventBus from "../../../utils/eventBus"
export default {
    data() {
        return {
            search: "",
        }
    },
    components: {},
    methods: {
        searchFun() {
            this.$emit("searchFunParent", this.search)
        },
        batchDelete() {
            eventBus.$emit("batchDelete")
        },
        addShow() {
            this.$emit('addShow')
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    background: #fff;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .left-title {
        display: flex;
        align-content: center;
        /deep/.el-input__inner {
            width: 160px;
            margin-right: 10px;
        }
    }
}
</style>
