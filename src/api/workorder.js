import request from '@/utils/request'
const manage = [{
        "type": "workOrderSubmitOrSave",
        "url": "csportalsite/workOrder/submitOrSave",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "保存工单"
    },
    {
        "type": "saveWorkOrderTempData",
        "url": "csportalsite/workOrder/saveWorkOrderTempData",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "暂存工单"
    },
    {
        "type": "queryFormInfoByExampleAndTaskId",
        "url": "csportalsite/workOrder/queryFormInfoByExampleAndTaskId",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "查询工单详情"
    },
    {
        "type": "findWorkOrderTempData",
        "url": "csportalsite/workOrder/findWorkOrderTempData",
        "method": "get",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "查询暂存工单详情,暂时停用"
    },
    {
        "type": "workOrderFindParticipants",
        "url": "csportalsite/workOrder/findParticipants",
        "method": "get",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "查询参会单位"
    },
    {
        "type": "workOrderSaveParticipants",
        "url": "csportalsite/workOrder/saveParticipants",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "新增参会单位"
    },
    {
        "type": "unionReviewData",
        "url": "csportalsite/workOrder/unionReview/data",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json',
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "获取联合评审工单初始数据"
    },
    {
        "type": "meetingDoc",
        "url": "csportalsite/workOrder/meeting/doc",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // 
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "获取会议工单会前资料"
    },
    {
        "type": "eventInfoSave",
        "url": "csportalsite/expert/eventInfo/saveEventInfo",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "创建会议"
    },
    {
        "type": "workOrderFile",
        "url": "csportalsite/workOrder/file",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "生成文件"
    },
    {
        "type": "eventInfoFile",
        "url": "csportalsite/expert/eventInfo/file",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "生成文件"
    },
    {
        "type": "getExpertNumByObject",
        "url": "csportalsite/expert/eventInfo/getExpertNumByObject",
        "method": "get",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "查询抽取专家是否完成"
    },
    {
        "type": "queryContentAndAsk",
        "url": "csportalsite/workOrder/queryServiceContent",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "根据工单类型查询服务内容和工作要求"
    },
    {
        "type": "queryMeetingFileTypes",
        "url": "csportalsite/workOrder/queryMeetingFileTypes",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "获取会议工单列表中会议文件模板列表"
    },
    {
        "type": "workContent",
        "url": "csportalsite/workOrder/queryAskContent",
        "method": "post",
        "header": {
            // 'Content-Type': 'application/json', // csportalsite/expert/eventInfo/save
            // 'Authorization': 'bearer ' + getToken()
        },
        "desc": "新增工单获取服务内容"
    }
];
const query = [{
    "type": "businessList",
    "url": "business/list",
    "method": "POST",
    "header": {

    },
}];
const apiList = [...manage, ...query]
export const requestData = (type, data, paramType) => {
    let obj = {};
    for (let k = 0; k < apiList.length; k++) {
        if (apiList[k].type == type) {
            obj = Object.assign({}, apiList[k]);
            continue;
        }
    }
    if (obj.url) {
        obj.url = '/' + obj.url
        if (paramType) {
            if (paramType.constructor == Object) {
                paramType = "?" + param(paramType)
            }
            obj.url = obj.url + paramType
        }
        let header = {
            'Content-Type': 'application/json'
        }
        header = obj.header ? obj.header : header;
        let r_param = {
            url: obj.url,
            method: obj.method || 'POST',
            header: header
        }
        if (obj.method == "get") {
            r_param.params = data || {}
        } else {
            r_param.data = data || {}
        }
        return request(r_param)
    } else {
        //没有配置对应的接口
        let bc = (resolve, reject) => {
            return resolve({
                code: -1,
                msg: "没有接口",
                data: ""
            });
        }
        return new Promise(bc);
    }
}

// 工单列表
export function api_getGDdata(data) {
    return request({
        url: `/csportalsite/workOrder/queryListWorkorderYT `,
        method: 'post',
        data
    })
}

// 会议类型
export function api_queryMeetingTypes(data) {
    return request({
        url: `/csportalsite/yuhua/workOrder/queryMeetingTypes `,
        method: 'post',
        data
    })
}

// 工单类型
export function api_queryWorkTypes(data) {
    return request({
        url: `/csportalsite/workOrder/queryWorkTypes `,
        method: 'post',
        data
    })
}
/**
 * 查询第三方机构
 */

export function api_queryListAndName(data) {
    return request({
        url: `csportalsite/bizunitNewController/queryListIdAndName`,
        method: 'post',
        data
    })
}
// 工单动态
export function api_hiDynamic(params) {
    return request({
        url: `/csportalsite/workOrder/hiDynamic`,
        method: 'get',
        params
    })
}