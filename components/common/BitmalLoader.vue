<template>
  <transition name="el-fade-in">
    <div
      v-show="show"
      class="GlobalLoader">
      <div>
        <div class="Loader">
          <div />
          <span>Loading</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      throttle: 200,
      duration: 1000
    }
  },
  methods: {
    start () {
      this.canSuccess = true
      if (this._throttle) {
        clearTimeout(this._throttle)
      }
      if (this._timer) {
        clearInterval(this._timer)
        this._timer = null
        this.percent = 0
      }
      this._throttle = setTimeout(() => {
        this.show = true
        this._cut = 10000 / Math.floor(this.duration)
        this._timer = setInterval(() => {
          this.increase(this._cut * Math.random())
          if (this.percent > 95) {
            this.finish()
          }
        }, 100)
      }, this.throttle)
      return this
    },
    set (num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor(this.percent)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease (num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      return this
    },
    pause () {
      clearInterval(this._timer)
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      clearTimeout(this._throttle)
      this._throttle = null
      setTimeout(() => {
        this.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style lang="less">
@import "~assets/style/variables.less";

  .GlobalLoader {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5000;
    background-color: rgba(255,255,255,.5);

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: @khaki;
      border-radius: 5px;
      box-shadow: 0 4px 12px 0 rgba(0,0,0,.12);
    }

    p {
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }

    .Loader {
      display: inline-block;
      text-align: center;

      div {
        display: inline-block;
        margin: 0 auto;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 6px solid @overlay;
        border-top-color: @blue;
        -webkit-animation: loading 1s infinite linear;
        animation: loading 1s infinite linear
      }

      span {
        display: block;
        max-width: 120px;
        margin-top: 8px;
        color: @text;
        font-size: 14px;
        line-height: 14px;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
      }

      @-webkit-keyframes loading {
        100% {
          transform: rotate(360deg) translate3d(0,0,0);
        }
      }

      @keyframes loading {
        100% {
          transform: rotate(360deg) translate3d(0,0,0);
        }
      }
    }
  }
</style>
