
import request from '@/utils/request'
const URL = '/csportalsite'


//查询行业领域列表接口
export function getIndustryFieldList() {
    return request({
        url: `${URL}/expert/expertPositionFieldDict/queryExpertPositionFieldDictList`,
        method: "get",
    });
}

//查询技术方向标签列表接口
export function getTechnicalList() {
    return request({
        url: `${URL}/expert/expertPositionFieldDict/querySkillDirectionList`,
        method: "get",
    });
}
// 专家列表查询
export function queryListExpertBase(params) {
    return request({
        url: `${URL}/expert/expertBase/queryListExpertBase`,
        method: 'get',
        params
    })
}

// 专家详情 
export function getExpertInfo(params) {
    return request({
        url: `${URL}/expert/expertBase/getExpertInfo`,
        method: 'get',
        params
    })
}
// 专家详情评审记录列表 
export function getExpertReviewRecordList(params) {
    return request({
        url: `${URL}/expert/expertBase/getExpertReviewRecordList`,
        method: 'get',
        params
    })
}

// 专家驾驶舱看板
export function expertCockpit() {
    return request({
        url: `${URL}/expert/expertBase/cockpit`,
        method: 'get'
    })
}

// 行业领域和技术方向数据接口
export function overview() {
    return request({
        url: `/csportalsite/expert/expertBase/overview`,
        method: 'get'
    })
};

// 驾驶舱工单统计面板
export function cockpitPanel() {
    return request({
        url: `/csportalsite/workOrder/cockpitPanel`,
        method: 'post'
    })
};
