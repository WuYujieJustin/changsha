<template>
    <div class="project-card">
        <div class="title">
            <div>{{content.unitName}}</div>
            <div class="total">{{ content.projectNum }}个项目</div>
        </div>
        <div class="status item">
            进度情况
            <!-- <span class="status-desc"> {{content.progressSate}}</span> -->
            <span class="status-detail overdue"> 逾期{{content.overdueNum}}个</span>
            <span class="status-detail"> 正常{{content.normalNum}}个</span>
        </div>
        <div class="risk item">
            风险情况
            <span class="high first">
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
        <!-- <div v-if="isProjectMode" class="quality item">
            质量情况
            <span class="quality-desc">{{content.qualityName}}</span>
            <span class="quality-score">{{content.qualityFraction}}分</span>
        </div>
        <div v-if="isProjectMode" class="milestone item">
            <div>里程碑</div>
            <div class="process">
                <div v-for="(item, index) in process" :key="index" :class="['item', index <= content.stageNum ? 'active' : '']"></div>
            </div>
            <div class="milestone-status">{{content.stageName}}</div>
        </div> -->
    </div>
</template>>

<script>
export default {
    name: 'ProjectLeadUnitCard',
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
        }
    },
    data() {
        return {
            high: require('img/bg/risk.png'),
            medium: require('img/bg/low_risk.png'),
            low: require('img/bg/safe.png'),
            process: [0, 1,2, 3,4,5,6,7,8]
        }
    }
    }
</script>

<style lang="scss" scoped>
.project-card{
    // width:330px;
    background:rgba(0,215,233,0.1);
    box-shadow: inset 0px 0px 12px 0px rgba(0,215,233,0.64);
    border-radius:4px;
    border:1px solid rgba(0,215,233,0.3);
    box-sizing: border-box;
    padding: 10px 20px;
    font-size: 14px;
    margin-bottom: 16px;
    .item{
        margin-top: 8px;
        height:19px;
        font-family:MicrosoftYaqiHei;
        line-height:19px;
    }
    .title{
        font-size: 16px;
        .total{
            float: right;
            height:24px;
            font-size:18px;
            font-weight:bold;
            color:rgba(0,226,223,1);
            line-height:24px;
            margin-top: -25px;
        }
    }
    .status{
        .status-desc{
            color: #EF8529;
            margin-left: 10px;
        }
        .status-detail{
            margin-left: 20px;
        }
        .overdue{
            color: #EF8529;
        }
    }
    .risk{
        .first{
            margin-left: 5px;
            img{
                height: 14px;
                width: 10px;
                vertical-align: middle;
            }
        }
        .risk-item{
            img{
                height: 14px;
                width: 10px;
                vertical-align: middle;
            }
            margin-left: 15px;
        }
    }
    .quality{
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
            font-size: 14px;
        }
    }
}
</style>