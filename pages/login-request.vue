<template>
  <div class="bit-login">
    <div class="subhead sixh">
      <div class="tit">Welcome to bitmal.</div>
      <div class="subtit">Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem.</div>
    </div>
    <div class="hr" />

    <el-form
      ref="loginForm"
      :model="localForm"
      :rules="rules"
      class="login-inputs"
      @submit.native.prevent>

      <title-wrapper title="your registered mobile number">
        <el-form-item prop="mobile">
          <el-input
            v-model="localForm.mobile"
            autofocus
            class="bitmal-input"/>
        </el-form-item>
      </title-wrapper>

    </el-form>

    <div class="btn-holder">
      <button
        class="btn btn-dark"
        @click="submit">request sms</button>
    </div>
  </div>
</template>

<script>
import TitleWrapper from '../components/common/TitleWrapper'
import { mapActions } from 'vuex'
import get from 'lodash/get'
import { Message } from 'element-ui'

export default {
  auth: false,
  components: { TitleWrapper },

  data () {
    var isNumberString = (rule, val, cb) => {
      // eslint-disable-next-line eqeqeq
      if (val == +val && typeof +val === 'number') {
        cb()
      } else {
        cb(new Error('Phone number should be a number'))
      }
    }

    return {
      localForm: {
        mobile: ''
      },

      rules: {
        mobile: [
          { required: true, message: 'This field is required', trigger: 'blur' },
          { validator: isNumberString, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    ...mapActions({
      loginRequest: 'user/loginRequest'
    }),

    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginRequest({
            mobile: +this.localForm.mobile
          })
            .then(response => {
              Message.success({
                message: 'Successful SMS request',
                duration: 0,
                showClose: true
              })
              this.$router.push('/login')
            })
            .catch(error => {
              const title = `Server error (${get(error, 'response.data.code', '-')})`
              const description = get(error, 'response.data.error.message', '-')

              Message.error({
                dangerouslyUseHTMLString: true,
                message: `<em>${title}</em><br>${description}`,
                duration: 0,
                showClose: true
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/main.less';

.bit-login {
  display: flex;
  flex-direction: column;
  align-items: center;

  .hr {
    height: 1px;
    background-color: @ui;
    width: 100%;
  }

  .subhead {
    margin-top: 80px;
    margin-bottom: 40px;
    .tit {
      .font-l;
      .bold;
      text-align: center;
    }
    .subtit {
      .font-m;
      margin: 12px 0;
      text-align: center;
    }
  }

  .login-inputs {
    display: flex;
    justify-content: stretch;
    max-width: 700px;
    width: 100%;
    margin-top: 12px;
    margin-bottom: 24px;

    .title-wrapper:first-child {
      margin-right: 24px;
    }
  }

  .btn-holder {
    max-width: 700px;
    width: 100%;
  }
}
</style>
