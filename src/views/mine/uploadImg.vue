<template>
  <div class="vue-upload-img-multiple">
    <div v-if="images.length >0">
      <ul>
        <li v-for="image in images">
          <img :src="image" @click='delImage($index)' />
          <a href="#" style="position: absolute;" @click='delImage($index)'>
            <span class="glyphicon glyphicon-remove"></span>
          </a>
        </li>
      </ul>
      <button @click="removeImage">移除全部图片</button>
      <button @click='addPic' >上传</button>
    </div>

    <div>
      <div v-if="!image">
        <h2>选择图片</h2>
        <input type="file" @change="onFileChange">
      </div>
      <div v-else>
        <img :src="image" />
        <button @click="removeImage">移除图片</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'Upload',
        data: function () {
            return {
              images: []
        }
    },
    created() {
            this.$store.dispatch('updateAllLoad', false)
    },
  methods: {
    test () {
      var vm = this
      console.log(vm.message)
    },
    addPic () {
      $('input[type=file]').trigger('click')
      return false
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    createImage (file) {
      var vm = this
      var reader = null
      var leng = file.length
      for (var i = 0; i < leng; i++) {
        reader = new window.FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          vm.images.push(e.target.result)
        }
      }
    },
    removeImage: function (e) {
      this.images = []
    },
    delImage: function (index) {
      this.images.shift(index)
    }
  }
}
</script>

<style style="stylus">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.vue-upload-img-multiple{
  border:1px red solid;
}
</style>