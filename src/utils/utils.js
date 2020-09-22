export const plainData = (data) => {
  return JSON.parse(JSON.stringify(data))
}
export function convertPx(px) {
  return (
    (px / 192) *
    parseFloat(document.documentElement.style.fontSize.replace("px", ""))
  )
}