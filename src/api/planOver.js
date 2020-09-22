import api from './index'
import request from "@/utils/request";

// 查询全市规划项目总数
export function api_queryProjectTotal(data){
    return request({
        url:`/csportalsite/projectgeneralview/queryProjectTotal`,
        method:'post',
        data
    })
}
// 查询全市规划项目阶段
export function api_queryMediumlongProjec(data){
    return request({
        url:`/csportalsite/projectgeneralview/queryMediumlongProject`,
        method:'post',
        data
    })
}
// 根据预算年度获取年度计划
export function api_yearplan(params){
    return request({
        url:`/csportalsite/yearplan/getIdByBudgetYear`,
        method:'get',
        params
    })
}
// 年度计划总览
export function api_yearplanzl(params){
    return request({
        url:`/csportalsite/yearplan/selectYearSum`,
        method:'get',
        params
    })
}
// 年度计划列表
export function api_yearplanlist(params){
    return request({
        url:`/csportalsite/yearplan/selectYearSumList`,
        method:'get',
        params
    })
}


