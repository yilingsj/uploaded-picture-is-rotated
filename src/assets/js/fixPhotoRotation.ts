/*
 * @Description: 修复部分手机拍照后旋转的bug（以下源码来源于网络并经艺灵加以修改）
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2019-11-29 11:33:02
 * @LastEditors  : yilingsj（315800015@qq.com）
 * @LastEditTime : 2020-01-10 11:09:54
 */
// https://blog.csdn.net/linlzk/article/details/48652635
import EXIF from 'exif-js'

function exifImage({ file, src, callback }: { file: any; src: string; callback: any }) {
  // 图片方向角
  let Orientation: any = null
  // 获取照片方向角属性，用户旋转控制
  EXIF.getData(file, () => {
    EXIF.getAllTags(file)
    Orientation = EXIF.getTag(file, 'Orientation')
    let image = new Image()
    image.src = src
    image.onload = function() {
      let _this = this as any
      let expectWidth = _this.naturalWidth
      let expectHeight = _this.naturalHeight
      if (_this.naturalWidth > _this.naturalHeight && _this.naturalWidth > 800) {
        expectWidth = 800
        expectHeight = (expectWidth * _this.naturalHeight) / _this.naturalWidth
      } else if (_this.naturalHeight > _this.naturalWidth && _this.naturalHeight > 1200) {
        expectHeight = 1200
        expectWidth = (expectHeight * _this.naturalWidth) / _this.naturalHeight
      }
      let canvas = document.createElement('canvas')
      let ctx: any = canvas.getContext('2d')
      canvas.width = expectWidth
      canvas.height = expectHeight
      ctx.drawImage(_this, 0, 0, expectWidth, expectHeight)
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:
            // 需要顺时针90度旋转
            rotateImg(this, 'left', canvas)
            break
          case 8:
            // 需要逆时针 90度旋转
            rotateImg(this, 'right', canvas)
            break
          case 3:
            // 需要180度旋转
            rotateImg(this, 'right', canvas)
            rotateImg(this, 'right', canvas)
            break
        }
      }
      let base64 = canvas.toDataURL('image/jpeg', 0.8)
      callback && callback(base64, Orientation)
    }
  })
}
// 对图片旋转处理
function rotateImg(img: any, direction: string, canvas: HTMLCanvasElement) {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  let minStep = 0
  let maxStep = 3
  if (img === null) {
    return
  }
  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  let height = img.height
  let width = img.width
  let step = 2
  if (step === null) {
    step = minStep
  }
  if (direction === 'right') {
    step++
    // 旋转到原位置，即超过最大值
    step > maxStep && (step = minStep)
  } else {
    step--
    step < minStep && (step = maxStep)
  }
  // 旋转角度以弧度值为参数
  let degree = (step * 90 * Math.PI) / 180
  let ctx: any = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0)
      break
  }
}
/**
 * @author: yilingsj（315800015@qq.com）
 * @description: base64转File或Blob，参考：https://blog.csdn.net/cuixiping/article/details/45932793
 * @param {type}
 * @return:
 * @Date: 2020-01-05 21:56:09
 */
function dataURLtoTransform({
  dataurl,
  filename,
  type
}: {
  dataurl: string
  filename?: string
  type?: string
}) {
  const arr: string[] = dataurl.split(',') || []
  let mime: string[] = arr[0].match(/:(.*?);/) || []
  let mimeType = ''
  if (mime.length > 1) {
    mimeType = mime[1]
  }
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  if (type === 'file') {
    return new File([u8arr], filename || 'name.jpg', {
      type: mimeType
    })
  } else {
    return new Blob([u8arr], {
      type: mimeType
    })
  }
}
export { exifImage, rotateImg, dataURLtoTransform }
