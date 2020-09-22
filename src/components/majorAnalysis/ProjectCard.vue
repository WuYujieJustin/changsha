<template>
    <div class="project-card" @click.stop="getDetail(content)">
        <div class="title">{{content.mediumlongProjectName}}</div>
        <div class="status item">
            进度情况
            <span :class="['status-desc', content.progressSate === '正常' ? 'normal' : '']"> {{content.progressSate}}</span>
            <span class="status-detail" v-show="content.overdueDays > 0"> 超期{{content.overdueDays}}天</span>
        </div>
        <div class="risk item">
            风险情况
            <span class="high first" v-if="content.riskHighNum !== '0' || content.riskHighNum !== 0">
                <img :src="high" alt="">
                高：
                <span>{{content.riskHighNum}}</span>
            </span>
            <span class="medium risk-item">
                <img :src="medium" alt="">
                中：
                <span>{{content.riskMiddleNum}}</span>
            </span>
            <span class="low risk-item">
                <img :src="low" alt="">
                轻：
                <span>{{content.riskLowNum}}</span>
            </span>
        </div>
        <div v-if="isProjectMode" class="quality item">
            质量情况
            <span class="quality-desc">{{content.qualityName || '良好'}}</span>
            <span class="quality-score">{{content.qualityFraction || '--'}}分</span>
        </div>
        <div v-if="isProjectMode" class="milestone item">
            <div>里程碑</div>
            <div class="process">
                <div v-for="(item, index) in process" :key="index" :class="['item', index <= content.stageNum ? 'active' : '']"></div>
            </div>
            <div class="milestone-status">{{content.stageName || '暂未公布'}}</div>
        </div>
    </div>
</template>>

<script>
export default {
    name: 'ProjectCard',
    props: {
        isProjectMode: {
            type: Boolean,
            default: () => true
        },
        content: {
            type: Object,
            default: () => {
                return {
                    title: 'XXX智慧项目',
                    status: '逾期',
                    statusDetail: '超期12天',
                    risk: {
                        high: 0,
                        medium: 0,
                        low: 1
                    },
                    quality: '良好',
                    qualityDetail: '100分',
                    milestone: {
                        name: '开发阶段',
                        process: [1, 5]// [current, total]
                    }
                }
            }
        }
    },
    methods: {
        getProcess(total) {
            let helper = new Array(total)
            helper.map(item => 1)
            return helper
        },
        getDetail (detail) {
            this.$emit('get-detail', detail)
        }
    },
    data() {
        return {
            high: require('img/bg/risk.png'),
            medium: require('img/bg/low_risk.png'),
            low: require('img/bg/safe.png'),
            process: [0, 1, 2, 3, 4, 5, 6]
        }
    }
    }
</script>

<style lang="scss" scoped>
.project-card{
    background:rgba(0,215,233,0.1);
    box-shadow: inset 0px 0px 12px 0px rgba(0,215,233,0.64);
    border-radius:4px;
    border:1px solid rgba(0,215,233,0.3);
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 12px;
    margin-bottom: 16px;
    border: 2px solid transparent;
    height: 150px;
    cursor: pointer;
    .item{
        margin-top: 8px;
        // height:19px;
        font-family:MicrosoftYaqiHei;
        line-height:19px;
    }
    .title{
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }
    .status{
        // height: 20px;
        line-height: 20px;
        .status-desc{
            color: #EF8529;
            margin-left: 5px;
        }
        .normal{
            color: #00E2DF;
        }
        .status-detail{
            margin-left: 20px;
        }
    }
    .risk{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        .first{
            margin-left: 10px;
            width: 62px;
            img{
                width: 10px;
                height: 14px;
                vertical-align: middle;
            }
        }
        .risk-item{
            font-size: 14px;
            width: 62px;
            img{
                width: 10px;
                height: 14px;
                vertical-align: middle;
            }
            margin-left: 10px;
        }
    }
    .quality{
        height: 20px;
        line-height: 20px;
        .quality-desc{
            margin-left: 10px;
            color: #00E2DF;
        }
        .quality-score{
            color: #00E2DF;
            margin-left: 20px;
        }
    }
    .milestone{
        height: 20px;
        line-height: 20px;
        display: flex;
        align-items: center;
        .process{
            display: flex;
            justify-content: space-around;
            margin-left: 27px;
            .item{
                width:16px;
                height:10px;
                background:rgba(255,255,255,0.3);
                margin: 0 1px;
            }
            .active{
                background:rgba(0,226,223,1);
            }
        }
        .milestone-status{
            flex: 1;
            text-align: center;
            font-size: 12px;
        }
    }
}
</style>