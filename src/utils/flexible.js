export function init(screenRatioByDesign) {
  let docEle = document.documentElement

  function setHtmlFontSize() {
    var screenRatio = docEle.clientWidth / docEle.clientHeight;
    let rate = 1
    if (screenRatio > screenRatioByDesign) {
      rate = screenRatioByDesign / screenRatio
    }
    var fontSize = rate * docEle.clientWidth / 10;
    docEle.style.fontSize = fontSize.toFixed(3) + "px";
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
}