const isDev = process.env.NODE_ENV === 'development' // 是否本地开发环境
// let baseUrl = isDev ? 'https://csyjtest.jiefanghao.com' : location.protocol + '//' + location.hostname
let baseUrl = isDev ? 'https://csyjdev.jiefanghao.com' : location.protocol + '//' + location.hostname
// let baseUrl = isDev ? 'https://bcyjtest.jiefanghao.com' : location.protocol + '//' + location.hostname
const imgBaseUrl = baseUrl + "/csportalsite/api/file/docapi/view?fileId="
module.exports = {
  title: '长沙市全生命周期项目驾驶舱',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',
  baseUrl: baseUrl,
  imgBaseUrl: imgBaseUrl,
}