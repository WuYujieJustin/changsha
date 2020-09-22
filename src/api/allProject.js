import request from '@/utils/request'
const URL = '/csportalsite/pmreport'

/*
* 全市项目分析
* */

export function api_industryList () {
  return request({
    url: `${URL}/industryDirectionData`,
    method: 'get'
  })
}

// 天气信息
export function getWeather(params) {
  return request({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    method: 'get',
    params
  })
}

// 年度计划下拉框数据
export function api_yearList() {
  return request({
    url: `${URL}/yearPlanList`,
    method: "get",
  });
}

// 年度计划汇总
export function api_yearPlanSummary (params) {
  return request({
    url: `${URL}/yearPlanSummary`,
    method: 'get',
    params
  })
}

// 项目进度
export function api_projectProgress (params) {
  return request({
    url: `${URL}/projectProgress`,
    method: 'get',
    params
  })
}

// 资金来源
export function api_sourcesFunds (params) {
  return request({
    url: `${URL}/sourcesFunds`,
    method: 'get',
    params
  })
}

// 专家资源
export function api_expertResources (params) {
  return request({
    url: `${URL}/expertResources`,
    method: 'get',
    params
  })
}

// 工单统计
export function api_workOrder (params) {
  return request({
    url: `${URL}/workOrder`,
    method: 'get',
    params
  })
}

// 项目各阶段统计接口
export function api_stageData (params) {
    return request({
    url: `${URL}/stageStatistics`,
    method: 'get',
    params
  })
}

// 
export function api_projetData(params) {
  return request({
    url: `${URL}/statistics`,
    method: "get",
    params,
  });
}
