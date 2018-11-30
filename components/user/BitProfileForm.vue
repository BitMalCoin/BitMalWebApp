<template>
  <div class="bit-profile-form">

    <el-form
      ref="profileForm"
      :model="innerForm"
      :rules="rules"
      @submit.native.prevent>

      <title-wrapper
        v-if="innerForm.profile_picture"
        title="Profile picture">
        <el-form-item prop="profile_picture">
          <bitmal-file
            :outer-url="innerForm.profile_picture.url"
            @fileChanged="fileChanged"/>
        </el-form-item>
      </title-wrapper>

      <div class="twins">
        <title-wrapper title="First name">
          <el-input
            v-model="$auth.user.first_name"
            disabled
            class="bitmal-input"/>
        </title-wrapper>
        <title-wrapper title="Last name">
          <el-input
            v-model="$auth.user.family_name"
            disabled
            class="bitmal-input"/>
        </title-wrapper>
      </div>

      <title-wrapper title="Bitmal wallet address hash">
        <el-input
          v-model="wallet"
          disabled
          class="bitmal-input"/>
      </title-wrapper>

      <title-wrapper title="Biography">
        <el-form-item prop="bio">
          <el-input
            :rows="2"
            v-model="innerForm.bio"
            class="bitmal-input"
            type="textarea"
            autosize
            placeholder="You can write your relevant biography here..." />
        </el-form-item>
      </title-wrapper>

      <div class="twins">
        <title-wrapper title="Birth date">
          <el-form-item prop="birth_date">
            <el-date-picker
              v-model="innerForm.birth_date"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper"
              format="yyyy-MM-dd"
              type="date"
              placeholder="Select" />
          </el-form-item>
        </title-wrapper>

        <title-wrapper title="Location">
          <el-form-item prop="location">
            <el-select
              v-model="innerForm.location"
              placeholder="Select location"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper">
              <el-option
                v-for="loc in getTypes('sc_marketPlaceLocations')"
                :key="loc.id"
                :label="loc.name"
                :value="loc.id" />
            </el-select>
          </el-form-item>
        </title-wrapper>
      </div>

      <div class="twins">
        <title-wrapper title="LinkedIn link">
          <el-form-item prop="linkedin_link">
            <el-input
              v-model="innerForm.linkedin_link"
              class="bitmal-input"/>
          </el-form-item>
        </title-wrapper>

        <title-wrapper title="Facebook link">
          <el-form-item prop="facebook_link">
            <el-input
              v-model="innerForm.facebook_link"
              class="bitmal-input"/>
          </el-form-item>
        </title-wrapper>
      </div>

      <title-wrapper title="Education level">
        <el-form-item prop="education_level">
          <el-select
            v-model="innerForm.education_level"
            placeholder="Select education"
            class="bitmal-input hundred"
            popper-class="bitmal-input-popper">
            <el-option
              v-for="loc in getTypes('sc_marketPlaceEducation')"
              :key="loc.id"
              :label="loc.name"
              :value="loc.id" />
          </el-select>
        </el-form-item>
      </title-wrapper>

      <title-wrapper title="Education details">
        <el-form-item prop="education">
          <el-input
            :rows="2"
            v-model="innerForm.education"
            class="bitmal-input"
            type="textarea"
            autosize
            placeholder="You can write about your education here..." />
        </el-form-item>
      </title-wrapper>
    </el-form>

    <button
      class="btn btn-dark"
      @click="submit">save profile</button>
  </div>
</template>

<script>
import TitleWrapper from '../common/TitleWrapper.vue'
import BitmalFile from '../common/BitmalFile.vue'
import { mapGetters, mapActions } from 'vuex'
import get from 'lodash/get'
import { format as formatDate } from 'date-fns'
import NotificationMixin from '../NotificationMixin'

export default {
  components: { TitleWrapper, BitmalFile },
  mixins: [NotificationMixin],

  data () {
    return {
      wallet: 'MOCK-asdf-fdsa-m0ck-4ddr355',
      innerForm: {},
      rules: {
        profile_image: [
          { required: true, message: 'Cover image is required', trigger: 'change' }
        ],
        bio: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        birth_date: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        location: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        linkedin_link: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        facebook_link: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        education_level: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        education: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      getTypes: 'types/getRawTypes'
    })
  },

  mounted () {
    if (get(this, '$auth.user.id')) {
      let flattenedForm = JSON.parse(JSON.stringify(this.$auth.user))
      for (var key in flattenedForm) {
        if (key === 'profile_picture') continue
        flattenedForm[key] = flattenedForm[key].url || flattenedForm[key].id || flattenedForm[key]
      }
      this.innerForm = flattenedForm
    }
  },

  methods: {
    ...mapActions({
      putProfile: 'user/putProfile',
      saveImg: 'form/saveImg'
    }),

    submit () {
      this.$refs.profileForm.validate(async valid => {
        if (valid) {
          let imgResponse, imgResponseId
          if (this.innerForm.profile_picture && !this.innerForm.profile_picture.url) {
            imgResponse = await this.saveImg(this.innerForm.profile_picture)
              .catch(error => {
                this.handleError(error)
              })
            imgResponseId = get(imgResponse, 'data.data.id', null)
          }

          const serializedProfile = {}
          for (var key in this.innerForm) {
            const flattenedValue = get(this.innerForm[key], 'id', this.innerForm[key])
            serializedProfile[key] = flattenedValue

            if (key === 'birth_date') {
              serializedProfile.birth_date = formatDate(serializedProfile.birth_date, 'YYYY-MM-DD')
            } else if (key === 'profile_picture') {
              serializedProfile.profile_picture = imgResponseId || serializedProfile.profile_picture
            }
          }

          this.putProfile(serializedProfile)
            .then(async response => {
              await this.$auth.fetchUser()
              this.handleSuccess('Succesful profile update', response.message)
            })
            .catch(error => {
              this.handleError(error)
            })
        }
      })
    },

    fileChanged (file) {
      if (file) {
        this.innerForm.profile_picture = file
      }
      this.$nextTick(() => {
        this.$refs.profileForm.validateField('profile_picture')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.bit-profile-form {
  .btn.btn-dark {
    margin: 40px 0 60px;
  }
}
</style>
