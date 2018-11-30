<template>
  <div class="project-form">

    <el-form
      ref="signupForm"
      :model="{ firstName, lastName, email, mobile }"
      :rules="rules"
      @submit.native.prevent>

      <el-row
        :gutter="20"
        class="hundred">

        <el-col :span="calcSpan">
          <title-wrapper title="first name">
            <el-form-item prop="firstName">
              <el-input
                v-model="firstName"
                class="bitmal-input"/>
            </el-form-item>
          </title-wrapper>
        </el-col>

        <el-col :span="calcSpan">
          <title-wrapper title="last name">
            <el-form-item prop="lastName">
              <el-input
                v-model="lastName"
                class="bitmal-input"/>
            </el-form-item>
          </title-wrapper>
        </el-col>

        <el-col :span="calcSpan">
          <title-wrapper title="email">
            <el-form-item prop="email">
              <el-input
                v-model="email"
                class="bitmal-input"/>
            </el-form-item>
          </title-wrapper>
        </el-col>

        <el-col :span="calcSpan">
          <title-wrapper title="mobile">
            <el-form-item prop="mobile">
              <el-input
                v-model="mobile"
                class="bitmal-input"/>
            </el-form-item>
          </title-wrapper>
        </el-col>
      </el-row>
    </el-form>

    <button
      class="btn btn-dark"
      @click="submit">{{ editable ? 'save profile' : 'sign up' }}</button>
  </div>
</template>

<script>
import TitleWrapper from '../common/TitleWrapper.vue'
import BitmalFile from '../common/BitmalFile.vue'
import { Message } from 'element-ui'
import { mapState, mapActions } from 'vuex'
import get from 'lodash/get'

export default {
  components: { TitleWrapper, BitmalFile },

  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {

      localUser: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: ''
      },

      rules: {
        email: [
          { required: true, message: 'This field is required', trigger: 'blur' },
          { type: 'email', message: 'E-mail not valid', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'This field is required', trigger: 'blur' },
          { type: 'number', message: 'Phone number should be a number', trigger: 'blur' }
        ],
        firstName: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {

    ...mapState('user', ['user']),

    firstName: {
      get () {
        return this.localUser.firstName || this.user.firstName
      },
      set (val) {
        this.localUser.firstName = val
      }
    },

    lastName: {
      get () {
        return this.localUser.lastName || this.user.lastName
      },
      set (val) {
        this.localUser.lastName = val
      }
    },

    email: {
      get () {
        return this.localUser.email || this.user.email
      },
      set (val) {
        this.localUser.email = val
      }
    },

    mobile: {
      get () {
        return +this.localUser.mobile || +this.user.mobile
      },
      set (val) {
        this.localUser.mobile = val
      }
    },

    calcSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }[this.$mq]
    }
  },

  methods: {
    ...mapActions({
      register: 'user/register'
    }),

    submit () {
      this.$refs.signupForm.validate(async valid => {
        if (valid) {
          const body = {
            email: this.email,
            mobile: this.mobile,
            first_name: this.firstName,
            last_name: this.lastName,
            address: 'LB',
            invite: 'BitMalPilot'
          }

          this.register(body)
            .then(response => {
              this.$auth.fetchUser()
              const title = 'Succcessful signup request'
              const description = get(response, 'message', 'success')

              Message.success({
                dangerouslyUseHTMLString: true,
                message: `<em>${title}</em><br>${description}`,
                duration: 0,
                showClose: true
              })
            })
            .catch((error) => {
              const title = `Server error (${get(error, 'response.data.code', '-')}) - ${get(error, 'response.data.error.message', '-')}`
              const description = `${get(error, 'response.data.error.attributes.email', []).join(' & ')}
                ${get(error, 'response.data.error.attributes.password', []).join(' & ')}`

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

<style lang="less" scoped>
@import '../../assets/style/main.less';

.btn.btn-dark {
  margin: 40px 0 60px;
}
</style>
