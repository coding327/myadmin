<template>
    <div class="container">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script type="text/javascript">
export default {
    props: {
        page: {
            type: Number,
            default() {
                return 1
            }
        },
        pageSize: {
            type: Number,
            default() {
                return 20
            }
        },
        total: {
            type: Number,
            default() {
                return 0
            }
        },
        pageSizes: {
            type: Array,
            default() {
                return [20, 40, 60, 80, 100]
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.$emit('changePageSize', val)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.$emit('changePage', val)
        },
    },
    data() {
        return {
            // currentPage4: 1,
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
