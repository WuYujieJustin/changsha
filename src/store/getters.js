const getters = {
  industryList: state => state.allProject.industryList,
  allAnalysisData: state => state.allProject.storeData,
  allCountData: state => state.allProject.allCountData,
  yearList: state => state.allProject.yearList,
  curYear: state => state.allProject.curYear
}
export default getters
