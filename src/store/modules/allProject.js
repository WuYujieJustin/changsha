import Vue from 'vue'
import { api_industryList, api_yearList } from "@/api/allProject"

const state = {
  industryList: [],
  storeData: {},
  allCountData: null,
  yearList: [],
  curYear: null,
}

const actions = {
  setCurYear ({ commit }, data) {
    commit('SET_CUR_YEAR', data)
  },
  setYearList ({ commit }) {
    return new Promise((resolve, reject) => {
      api_yearList()
        .then(res => {
          const data = res.data.map(item => item.budgetYear).sort((a, b) => {
            return Number(b) - Number(a)
          })
          commit('SET_YEAR_LIST', data)
          commit('SET_CUR_YEAR', data[0])
          resolve(data)
        })
        .catch(err => {
          commit('SET_YEAR_LIST', [2020])
          reject(err)
        })
      })
  },
  getProjectList ({ commit }) {
    return new Promise((resolve, reject) => {
      api_industryList().then(response => {
        const data = response.data
        commit('SET_INDUSTRY_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  storeAllAnalysis ({ commit }, plainData) {
    commit('STORE_ALL_PROJECT_DATA', plainData)
  },
  storeAllCount ({ commit }, plainData) {
    commit('STORE_ALL_COUNT', plainData)
  }
}

const mutations = {
  SET_CUR_YEAR: (state, year ) => {
    state.curYear = year
  },
  SET_YEAR_LIST: (state, data ) => {
    state.yearList = data
  },
  SET_INDUSTRY_LIST: (state, industryList) => {
    state.industryList = industryList
  },
  STORE_ALL_PROJECT_DATA: (state, { code, key, value }) => {
    if (!(code in state.storeData)) {
      Vue.set(state.storeData, code, {})
    }
    state.storeData[code][key] = value
  },
  STORE_ALL_COUNT: (state, plainData) => {
    state.allCountData = plainData
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
