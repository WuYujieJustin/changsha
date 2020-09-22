<template>
    <div class="wrapper">
        <img class="loading" :src="loading_gif" alt="">
    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        loading: {
            type: Boolean,
            default: () => false
        }
    },
    data () {
        return {
            loading_gif: require('img/bg/loading.gif')
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    .loading{
    width: 250px;
    height: 250px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    .el-icon-loading{
        font-size: 50px;
    }
}
}
</style>
