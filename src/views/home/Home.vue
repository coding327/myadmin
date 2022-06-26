<template>
    <div>
        <!-- 组件1 MySearch占位 -->
        <MySearch/>
        <!-- 组件2 MyTable占位 -->
        <MyTable/>
        <!-- 组件3 MyPage占位 -->
        <MyPage/>
    </div>
</template>

<script type="text/javascript">
import MySearch from './components/MySearch'
import MyTable from './components/MyTable'
import MyPage from './components/MyPage'
export default {
    data() {
        return {

        }
    },
    components: {
        MySearch,
        MyTable,
        MyPage
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>

</style>
