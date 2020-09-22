<template>
    <svg xmlns="http://www.w3.org/2000/svg" class="chart-lines" style="shape-rendering:geometricPrecision;">

        <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                <stop stop-color="#00D7E9" offset="0%"/>
                <stop stop-color="#00D7E9" stop-opacity="0" offset="100%"/>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
                <stop stop-color="#00D7E9" offset="0%"/>
                <stop stop-color="#00D7E9" stop-opacity="0" offset="100%"/>
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
                <stop stop-color="#E0FDFF" offset="0%"/>
                <stop stop-color="#00D7E9" stop-opacity="0" offset="100%"/>
            </linearGradient>
            <g id="indicator" xmlns="http://www.w3.org/2000/svg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g>
                    <path d="M3.94285714,36 C5.59971139,36 6.94285714,5.65685425 6.94285714,4 C6.94285714,2.34314575 5.59971139,1 3.94285714,1 C2.28600289,1 0.942857143,2.34314575 0.942857143,4 C0.942857143,5.65685425 2.28600289,36 3.94285714,36 Z" id="椭圆形备份" fill="url(#linearGradient-1)"/>
                    <path d="M3.94285714,46 C6.12043701,46 7.88571429,6.12043701 7.88571429,3.94285714 C7.88571429,1.76527727 6.12043701,0 3.94285714,0 C1.76527727,0 -7.81597009e-14,1.76527727 -7.81597009e-14,3.94285714 C-7.81597009e-14,6.12043701 1.76527727,46 3.94285714,46 Z" id="椭圆形备份-2" fill="url(#linearGradient-2)" opacity="0.499581473"/>
                    <circle fill="url(#linearGradient-3)" cx="3.94285714" cy="4" r="3"/>
                </g>
            </g>
            <circle id="circle" cx="5" cy="5" r="3" fill="lightgrey"/>
        </defs>

        <path
            v-for="(edge, index) in edges"
            :key="index"
            :d="edge.path"
            :id="index"
            :style="edge.style"
            class="customer-line"
        >
        </path>

        <use v-for="(edge, index) in edges"
            :key="'use' + index"
            :style="edge.style"
            class="indicator-arrow"
            xlink:href="#indicator"
            transform="translate(10.057143, 10.000000)"
        >
             <animateMotion v-show="showArrow" dur="3s" repeatCount="indefinite" rotate="auto" fill="freeze"
                :path="edge.path" />
        </use>
        Sorry, your browser does not support inline SVG.
    </svg>
</template>

<script>
export default {
    name: 'ChartLines',
    props: {
        edges: {
            type: [Array],
            default: () => {
                return
                [
                    // { sourcePos: [10, 0], targetPos: [100, 100] }
                ]
            }
        }
    },
    data () {
        return {
            showArrow: false
        }
    },
    created () {
        setTimeout(() => {
            this.showArrow  = true
        }, 100000)
    },
    methods: {
        // <line x1="20" y1="100" x2="100" y2="20"/> => <path d="M20 100, L100 20" />
        getMpath(edge, offset = [0, 0]) {
            return `M${edge.sourcePos[0] + offset[0]} ${edge.sourcePos[1] + offset[1]}, L${edge.targetPos[0]} ${edge.targetPos[1]}`
        }
    }
}
</script>

<style lang="scss" scoped>
.chart-lines{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1111;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    .indicator-arrow{
        transform: rotate(90deg);
    }
    .customer-line {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
        animation: dash 3s linear forwards;
    }
    @keyframes dash {
        to {
            stroke-dashoffset: 0;
        }
    }
}
</style>
