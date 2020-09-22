<template>
    <div class="order_invalid">
        <div class="title order_title">工单处理失效统计</div>
        <ul class="category">
            <li class="list_item" v-for="(item, index) in orderType" :key="index">
                <i class="color_block" :style="{backgroundColor: orderType[index].color}"></i>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <e-charts :initOptions="initOptions" :options="options" v-if="options" />
    </div>
</template>

<script>
import { convertPx } from "@/utils/utils";

export default {
    name: "OrderInvalid",
    data() {
        return {
            initOptions: {
                width: 850 * window.scale,
                height: 280 * window.scale,
            },
            options: null,
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
                    name: "联合评审工单",
                },
                {
                    color: "#FFCC00",
                    name: "其他工单",
                },
            ],
        };
    },
    mounted() {
        this.echartsInit();
    },
    methods: {
        echartsInit() {
            let dataList = (this.options = {
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "5%",
                    top: "10%",
                    containLabel: true,
                },
                yAxis: {
                    max: 50,
                    type: "value",
                    barWidth: 300,
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#363e83",
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#363e83 ",
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontWeight: "normal",
                            fontSize: "12",
                        },
                        formatter: "{value}/h",
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#363e83",
                            },
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: "#fff",
                                fontWeight: "normal",
                                fontSize: "12",
                            },
                        },
                        data: ["服务工单", "会议工单", "联合评审工单"],
                    },
                    {
                        type: "category",
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        splitArea: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        data: ["会", "不会", "看情况"],
                    },
                ],
                series: [
                    {
                        type: "bar",
                        xAxisIndex: 1,
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                color: "#121847",
                                borderWidth: 0,
                                shadowBlur: {
                                    shadowColor: "rgba(60,130,248,0.2)",
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 2,
                                },
                            },
                        },
                        barWidth: convertPx(10),
                        data: [48, 48, 48],
                        barGap: 2,
                    },
                    {
                        type: "bar",
                        xAxisIndex: 1,
                        barGap: "100%",
                        data: [48, 48, 48],
                        zlevel: 1,
                        barWidth: convertPx(10),
                        itemStyle: {
                            normal: {
                                color: "#121847",
                                borderWidth: 0,
                                shadowBlur: {
                                    shadowColor: "rgba(60,130,248,0.2)",
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 2,
                                },
                            },
                        },
                        barGap: 2,
                    },
                    {
                        type: "bar",
                        xAxisIndex: 1,
                        barGap: "100%",
                        data: [48, 48, 48],
                        zlevel: 1,
                        barWidth: convertPx(10),
                        itemStyle: {
                            normal: {
                                color: "#121847",
                                borderWidth: 0,
                                shadowBlur: {
                                    shadowColor: "rgba(60,130,248,0.2)",
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 2,
                                },
                            },
                        },
                        barGap: 2,
                    },
                    {
                        name: "中软国际",
                        type: "bar",
                        itemStyle: {
                            normal: {
                                show: true,
                                barBorderRadius: 50,
                                borderWidth: 0,
                                color: "#07E6F9",
                            },
                        },
                        label: {
                            normal: {
                                show: true,
                                fontSize: convertPx(18),
                                fontWeight: "bold",
                                color: "#04C7E6",
                                position: "top",
                            },
                        },
                        zlevel: 2,
                        barWidth: convertPx(10),
                        data: [50, 15, 10],
                        barGap: 2,
                    },
                    {
                        name: "中电莱斯",
                        type: "bar",
                        barWidth: convertPx(10),
                        itemStyle: {
                            normal: {
                                show: true,
                                barBorderRadius: 50,
                                borderWidth: 0,
                                color: "#FFE100",
                            },
                        },
                        zlevel: 2,
                        data: [8, 17, 26],
                        barGap: 2,
                    },
                    {
                        name: "其他",
                        type: "bar",
                        barWidth: convertPx(10),
                        itemStyle: {
                            normal: {
                                show: true,
                                barBorderRadius: 50,
                                borderWidth: 0,
                            },
                        },
                        zlevel: 2,
                        data: [8, 17, 26],
                        barGap: 2,
                    },
                ],
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.order_invalid {
    flex: 1;
    height: 377px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 34px;
    @include bis("~img/order/right_bg.png");
    .category {
        width: 100%;
        box-sizing: border-box;
        padding-left: 237px;
        padding-right: 20px;
        margin-bottom: 0px;
        display: flex;
        list-style: none;
        justify-content: space-around;
        .list_item {
            font-size: 18px;
            .color_block {
                display: inline-block;
                font-style: normal;
                width: 26px;
                height: 13px;
                border-radius: 6px;
                margin-right: 13px;
            }
        }
    }
}
</style>