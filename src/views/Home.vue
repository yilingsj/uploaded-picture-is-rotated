<!--
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-01-04 14:36:09
 * @LastEditors  : yilingsj（315800015@qq.com）
 * @LastEditTime : 2020-01-10 17:15:04
 -->
<template>
  <div class="form-wrap">
    <div class="form__item flex column">
      <div class="form__label">上传图片</div>
      <div class="form__label_content">
        <div class="upload-wrap">
          <label
            class="upload__item upload_status_default flex all-center"
            v-if="!src"
          >+
            <input
              type="file"
              class="none upload__file"
              accept="image/jpeg,image/jpg,image/png,image/svg"
              @change="handleChangeFile"
            />
          </label>
          <div
            class="upload__item"
            v-else
          >
            <img
              :src="src"
              alt=""
              class="upload__img"
            />
            <span
              class="upload-delete"
              @click="handleDelete"
            >×</span>
          </div>
        </div>
      </div>
    </div>
    <div class="form__item">
      <p
        class="msg"
        v-if="value && value !== '1'"
      >如果您看到这段文字，说明图片需要进行修正。<br>Orientation={{ value }}，当前图片已{{ status[value] }}并修正完毕。详情请看源码相关片断。</p>
      <p>示例：<img
          :src="defaultSrc"
          alt="部分手机拍照上传图片到服务器后出现了旋转"
          class="upload__img_demo"
        ></p>
      <img
        v-if="resultSrc"
        :src="resultSrc"
        alt="上传到服务器后的返回的图片地址"
        class="upload__img_demo"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { exifImage, dataURLtoTransform } from '@/assets/js/fixPhotoRotation'
import axios from 'axios'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

@Component
export default class uploadedPictrueIsRotated extends Vue {
  // 图片预览地址
  src: string = ''
  status: { [key: string]: string } = {
    '1': '0°',
    '6': '顺时针90°',
    '8': '逆时针90°',
    '3': '旋转180°'
  }
  value: any = ''
  // 示例图片
  defaultSrc: string =
    'https://img.alicdn.com/imgextra/i1/759415648/O1CN01bQFrQJ1rapYw8QBVt_!!759415648.png'
  // 服务器端返回的图片地址
  resultSrc: string = ''
  // 删除图片
  handleDelete() {
    this.src = ''
    this.value = ''
  }
  // 图片本地上传
  handleChangeFile(event: any) {
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.readAsDataURL(file)
    // var encoder = new JPEGEncoder() // 经测试发现安卓机上会报错，但网上多篇文章都有些代码，有点懵啊......
    reader.onload = (event: any) => {
      let src = event.target.result
      exifImage({
        file: file,
        src: src,
        callback: (base64Url: any, Orientation: any) => {
          this.value = Orientation
          this.src = base64Url
          return false
          // 上传图片到服务器的代码
          // let blobData = dataURLtoTransform({
          //   dataurl: base64Url
          // })
          // let formData = new FormData()
          // // 接口部分
          // let token = '换成你的token'
          // let url = '换成你的服务器地址?' + Date.now()
          // axios
          //   .post(url, {
          //     token: token,
          //     type: 1,
          //     copid: '换成你的'
          //   })
          //   .then((res: any) => {
          //     formData.append('file', blobData)
          //     formData.append('policy', res.data.data.policy)
          //     formData.append('authorization', res.data.data.authorization)
          //     axios.post(res.data.data.url, formData).then((res: any) => {
          //       if (res.data && res.data.url) {
          //         // 有图片url表示成功
          //         this.resultSrc = '换成你的域名前缀' + res.data.url
          //         console.log('线上图片地址=', this.resultSrc)
          //       }
          //     })
          //   })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex
  display flex
.column
  flex-direction column
.all-center
  @extend .flex
  align-items center
  justify-content center
.none
  display none
.msg
  text-align left
.form
  &__item
    padding 0 20px
  &__label
    font-size 14px
    line-height 1.5
    padding 10px 0
.upload
  &__item
    width 200px
    height 200px
    border-radius 8px
    border 1px solid #ccc
    position relative
    margin 0 auto
  &__img
    width 100%
    max-height 100%
    display block
    margin 0 auto
    border-radius inherit
    &_demo
      display block
      max-width 100%
      margin 0 auto
  &_status_default
    font-size 40px
  &-delete
    position absolute
    right -8px
    top -8px
    font-size 24px
    line-height 30px
    font-family SimSun
    width 32px
    height 32px
    border-radius 50%
    background-color rgba(0, 0, 0, .5)
    color #fff
    display inline-block
    text-align center
</style>
