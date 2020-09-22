<template>
    <div class="wrapper">
        <div class="first">
            <div>时间</div>
            <div class="date">{{date}}</div>
        </div>
        <div class="second">
            <div class="time">{{time}}</div>
            <div>{{week}}</div>
        </div>
    </div>
</template>

<script>
import dateMixins from '@/mixins/dateMixins'
import { getWeather } from '@/api/allProject'
export default {
    mixins: [dateMixins],
    name: 'Clock',
    props: {
        loading: {
            type: Boolean,
            default: () => false
        }
    },
    created () {
       this.setTime()
       this.setDate()
    },
    data () {
        return {
            weather: null,
            week: null,
            time: null,
            date: null,
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    left: 20px;
    .first{
        display: flex;
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #FFFFFF;
        color: rgba(255, 255, 255, .4);
        .date{
            margin-left: 10px;
        }
    }
    .second{
        display: flex;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        .time{
            margin-right: 30px;
        }
    }
}
</style>
