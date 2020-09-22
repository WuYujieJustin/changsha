import api from './index'
import request from "@/utils/request";
const URL = "/csportalsite/pmreport";
export const CardDetail = [
         {
           ref: "project1",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "project2",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "project3",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "project4",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "project5",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
       ];
export const UnitDetail = [
         {
           ref: "unit1",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "unit2",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "unit3",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "unit4",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "unit5",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           },
         },
         {
           ref: "unit6",
           title: "XXX智慧项目",
           status: "逾期",
           statusDetail: "超期12天",
           risk: {
             high: 0,
             medium: 0,
             low: 1,
           },
           quality: "良好",
           qualityDetail: "100分",
           milestone: {
             name: "开发阶段",
             process: [1, 5], // [current, total]
           }
         },
       ];

export function api_getMajorProjectList(params) {
    return request({
      url: `${URL}/importantProject`,
      method: "get",
      params,
    });
  }

export function api_getMajorProjectDetail(params) {
  return request({
    url: `${URL}/importantProjectInfo`,
    method: "get",
    params,
  });
}

export function api_getLeadUnitList () {
  return request({
    url: `${URL}/leadUnit`,
    method: 'get'
  });
}
