<template>
  <div class="photo-book">
    <div class="photo-bg">
      <img
        v-if="localImgBase64 || outerUrl"
        :src="localImgBase64 || outerUrl"
        style="object-fit: cover">
      <button
        :class="['btn btn-dark', { 'bordered': !!localImgBase64 }]"
        @click="$refs.fileInput.click()">{{ $t('upload') }}</button>
      <input
        ref="fileInput"
        accept="image/*"
        class="hidden"
        type="file"
        @change="fileChanged">
    </div>

    <div class="photo-text">{{ $t('sideText') }}</div>
  </div>
</template>

<i18n>
{
  "en": {
    "upload": "upload picture",
    "sideText": "Image requirements blah blah Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem."
  }
}
</i18n>

<script>
import { get as exists } from 'lodash'

export default {
  props: {
    outerUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localImgBase64: ''
    }
  },
  methods: {
    fileChanged (changedEvent) {
      if (exists(changedEvent, 'target.files[0]')) {
        const selectedFile = changedEvent.target.files[0]
        const reader = new FileReader()
        reader.onload = loadedEvent => {
          this.localImgBase64 = loadedEvent.target.result
          this.$emit('fileChanged', selectedFile)
        }
        reader.readAsDataURL(selectedFile)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.photo-book {
  display: flex;
  justify-content: space-between;

  .hidden {
    display: none;
  }

  .photo-bg {
    position: relative;
    .stretch-1;
    height: 216px;
    margin-right: 24px;
    background-color: @overlay;

    img {
      width: 100%;
      height: 100%;
    }

    button {
      position: absolute;
      right: 12px;
      top: 12px;

      &.bordered {
        border: 1px solid @khaki;
      }
    }
  }

  .photo-text {
    .stretch-1;
    font-style: italic;
    font-size: 14px;
    color: @text-light;
    line-height: initial;
  }
}

</style>
