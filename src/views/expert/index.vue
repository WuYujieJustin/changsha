<template>
    <div class="expert">
        <div class="header">
            <expert-nums :expertStatus="expertData.byStstus" v-if="expertData.byStstus" />
            <expert-face :expertbyOrganize="expertData.byOrganize" v-if="expertData.byOrganize" />
        </div>
        <div class="content">
            <expert-tec
                :expertNum="expertNum"
                :skillDirection="skillDirection"
                v-if="skillDirection"
            />
            <expert-area
                :expertNum="expertNum"
                :positionField="positionField"
                v-if="positionField"
            />
            <div class="expert_fenbu">
                <expert-job :expertJob="expertData.byOnJob" v-if="expertData.byOnJob" />
                <expert-title
                    :expertTitle="expertData.byPositionalTitle"
                    v-if="expertData.byPositionalTitle"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { expertCockpit, overview } from "@/api/expert.js";

export default {
    data() {
        return {
            expertData: {},
            skillDirection: null, //技术方向
            positionField: null, // 行业领域
            expertNum: 0, // 入库专家数
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            expertCockpit().then((res) => {
                if (res.msg.code == "0000") {
                    this.expertData = res.data;
                    // console.log(this.expertData)
                    this.expertData.byStstus = this.expertData.byStstus.reverse();
                }
            });
            overview().then((res) => {
                if (res.msg.code == "0000") {
                    this.skillDirection = res.data.skillDirection;
                    this.positionField = res.data.positionField;
                    this.expertNum = res.data.expertNum;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.expert {
    display: flex;
    height: calc(100% - 130px);
    flex-direction: column;
    padding-bottom: 28px;
    .header {
        display: flex;
        flex-wrap: nowrap;
        height: 317px;
    }
    .content {
        flex: 1;
        display: flex;
        margin-top: 40px;
        overflow: hidden;
        .expert_fenbu {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
    ::v-deep .title {
        position: absolute;
        left: 20px;
        top: 0px;
        font-size: 18px;
    }
    ::v-deep .order_title {
        @include bis("~img/bg/card_title@2x.png");
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 18px;
        left: 0;
    }
}
</style>