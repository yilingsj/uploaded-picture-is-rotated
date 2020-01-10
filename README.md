# uploaded-picture-is-rotated

### 说明：因某些机型的手机拍照后上传的图片会发生旋转，所以此demo为您复现并通过exif-js库对图片进行了修正，可稍做修改用于项目中。
主要的两个文件：
```
src/views/Home.vue 演示页面
```
```
src/assets/js/fixPhotoRotation.ts exif-js读取图片信息并对其纠正
```
扫码体验：
![移动端拍照上传图片后使用EXIF读取图片信息](http://www.yilingsj.com/d/file/xwzj/2020-01-05/uploaded-picture-is-rotated-demo.png)

[移动端戳我访问](http://www.yilingsj.com/d/file/xwzj/2020-01-05/uploaded-picture-is-rotated/index.html?t=1578648949313#/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
