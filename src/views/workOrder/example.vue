<template>
    <swiper
        @slideChangeTransitionStart="slideChangeTransitionStart"
        ref="mySwiper"
        class="swiper"
        :options="swiperOption"
        v-if="swiperOption"
    >
        <swiper-slide
            class="list_item"
            :class="{'active': activeIndex == index}"
            v-for="(item, index) in datasCopy"
            :key="index"
        >
            <e-charts
                @chartmouseover="mouseover"
                @chartmouseout="mouseout"
                @chartclick="chartclick"
                :ref="`chart${index}`"
                :initOptions="initOptions"
                :options="options[index]"
                v-if="options[index]"
            />
            <div class="depart">{{item.workTypeName}}</div>
        </swiper-slide>
    </swiper>
</template>

<script>
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
import { Swiper as SwiperClass, Autoplay } from "swiper/core";
import "swiper/swiper-bundle.css";
SwiperClass.use(Autoplay);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
export default {
    name: "swiper-example-multiple-slides-per-biew",
    title: "Multiple slides per view",
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        datas: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    mounted() {
        this.echartInit();
    },
    data() {
        return {
            mouseover_bg: `url(${require("../../assets/img/expert/bg_noicon.png")})`,
            mouseout_bg: `url(${require("../../assets/img/expert/orderBg.png")})`,
            datasCopy: JSON.parse(JSON.stringify(this.datas)),
            swiperOption: null,
            activeIndex: 3,
            orderType: [
                {
                    color: "#06E3F8",
                    name: "服务工单",
                },
                {
                    color: "#3D88EA",
                    name: "会议工单",
                },
                {
                    color: "#D8419A",
                    name: "其他",
                },
            ],
            initOptions: {
                width: 260 * window.scale,
                height: 200 * window.scale,
            },
            options: [],
            myChart: null,
            curIndex: -1,
            timer: null,
        };
    },
    methods: {
        chartclick($event) {
            let echartDatas = $event.data;
            this.$emit("GetType", echartDatas);
        },
        mouseover($event) {
            this.$refs.mySwiper.$swiper.autoplay.stop();
            let e = window.event;
            let obj = e.target || e.srcElement;
            let echartsDom = obj.parentElement.parentElement;
            echartsDom.style.backgroundImage = this.mouseover_bg;
        },
        mouseout() {
            this.$refs.mySwiper.$swiper.autoplay.start();
            let e = window.event;
            let obj = e.target || e.srcElement;
            let echartsDom = obj.parentElement.parentElement;
            echartsDom.style.backgroundImage = this.mouseout_bg;
        },
        slideChangeTransitionStart() {
            let activeIndex = this.$refs.mySwiper.$swiper.activeIndex - 4;
            if (activeIndex == 13) {
                this.$refs.mySwiper.$swiper.activeIndex = 4;
                this.$refs.mySwiper.updateSwiper();
                setTimeout(() => {
                    this.$refs.mySwiper.$swiper.slideTo(5);
                }, 100);
            }
        },
        echartInit() {
            Array.prototype.push.apply(this.datasCopy, this.datas.slice(0, 4));
            Array.prototype.unshift.apply(
                this.datasCopy,
                this.datas.slice(this.datas.length - 4, this.datas.length)
            );
            this.datasCopy.map((res) => {
                let data = res.items;
                this.options.push({
                    color: this.orderType.map((res) => {
                        return res.color;
                    }),
                    tooltip: {
                        trigger: "item",
                    },
                    series: [
                        {
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["40%", "70%"],
                            clockwise: true,
                            avoidLabelOverlap: true,
                            hoverOffset: 15,
                            itemStyle: {
                                normal: {
                                    borderColor: "rgba(2,14,79,1)",
                                    borderWidth: 5,
                                    color: (params) => {
                                        return this.orderType[params.dataIndex]
                                            .color;
                                    },
                                },
                            },
                            label: {
                                show: false,
                                formatter: function ({ data }) {
                                    return data.percentage;
                                },
                                position: "center",
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: "18",
                                        color: "#fff",
                                        width: "42",
                                        height: "42",
                                    },
                                },
                            },
                            labelLine: {
                                show: false,
                                normal: {
                                    length: 10,
                                    lineStyle: {
                                        width: 1,
                                    },
                                },
                            },
                            data,
                        },
                    ],
                });
            });
            this.$nextTick(() => {
                // console.log(this.$refs.mySwiper);
                this.$refs.mySwiper.$swiper.activeIndex = 4;
                this.$refs.mySwiper.updateSwiper();
            });
            this.swiperOption = {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                slidesPerView: 7,
                spaceBetween: 30,
                centeredSlides: true,
                touchStartPreventDefault: false, // 禁用swiper的点击
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.swiper {
    width: 100%;

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
    }
    .list_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.5;
    }
    .swiper-slide-active {
        opacity: 1;
    }
    .echarts {
        @include bis("~img/expert/orderBg.png");
        background-position: 50% 50%;
        background-size: 65% 83%;
    }
    .depart {
        @include bis("~img/expert/departBg.png");
        width: 146px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #84b2ff;
        font-size: 18px;
    }
}
</style>