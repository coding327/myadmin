<template>
    <div class="container">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        >
        </el-pagination>
    </div>
</template>

<script type="text/javascript">
export default {
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
    },
    data() {
        return {
            currentPage4: 4,
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
}
</style>
