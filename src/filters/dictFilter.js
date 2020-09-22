import * as textDict from '@/constant/dict'

// 相对通用的过滤器
export const dictFilter = (codeOrArray, dictName) => {
    console.log('codeOrArray', codeOrArray)
    console.log('dictName', dictName)
    let isArray = Array.isArray(codeOrArray)
    if (!dictName) {
        return codeOrArray
    }
    if (isArray) {
        // 筛一个数组
        let newArray = []
        codeOrArray.forEach(code => {
            Object
                .keys(textDict[dictName])
                .forEach(currentDictCode => {
                    if (currentDictCode === code) {
                        newArray.push(textDict[dictName][code])
                    }
                })
        })
        return newArray.join(' ')
    } else {
        // 筛一个单独字符串
        let newString = ''
        Object
            .keys(textDict[dictName])
            .forEach(currentDictCode => {
                if (currentDictCode === (codeOrArray + '')) {
                    newString += textDict[dictName][codeOrArray]
                }
            })
        return newString
    }
}

export const bigIntFormatter = val => {
    if (val > 10000 * 1000 * 10000) {
        return (val / 10000 * 1000 * 10000).toFixed(4) + '万亿'
    } else if ( val > 10000 * 10000) {
        return (val / 10000 * 10000).toFixed(2) + '亿'
    } else if (val > 10000) {
        return (val / 10000).toFixed(2) + '万'
    } else {
        return val
    }
}

// 元转为万元，并保留2位小数
export const budgetFilter = value => {
    if (value) {
        return (value / 10000).toFixed(2)
    }
    return value
}
// 元转为万元，并保留2位小数
export const fixedFilter = (value, digits) => {
    if (value && digits) {
        return Number(value).toFixed(digits)
    }
    return value
}
