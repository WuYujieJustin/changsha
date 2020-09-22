<template>
    <div class="wrapper">
        <iframe allowtransparency="true" frameborder="0" width="180" height="66" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=3&t=0&v=0&d=1&bd=0&k=000000&f=0080ff&ltf=009944&htf=cc0000&q=0&e=0&a=1&c=54511&w=180&h=36&align=center"></iframe>
    </div>
</template>

<script>
import { getWeather } from '@/api/allProject'
const adcode = 320100
const key = '8f347b7e74493b76e7648118ec125c1f'
export default {
    name: 'Weather',
    props: {
        loading: {
            type: Boolean,
            default: () => false
        }
    },
    created () {
        // this.getWeatherInfo()
    },
    methods: {
        getWeatherInfo () {
            const params = {
                city: adcode,
                key,
                extensions: 'base',
                output: 'JSON'
            }
            getWeather(params)
                .then(res => {
                    console.log(res)
                })
        }
    },
    data () {
        return {
            weather: null
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    left: 200px;
    top: 30px
}
</style>
