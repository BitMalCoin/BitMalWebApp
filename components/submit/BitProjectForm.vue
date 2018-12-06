<template>
  <div class="project-form">

    <el-form
      ref="projectForm"
      :model="{ img, title, category, location, brief, description, launch_date, milestone_title, milestone_btc_value, milestone_target_date, milestone_description }"
      :rules="rules"
      @submit.native.prevent>

      <title-wrapper :title="$t('projectCoverImage')">
        <el-form-item prop="img">
          <bitmal-file
            :outer-url="img.url"
            @fileChanged="fileChanged" />
        </el-form-item>
      </title-wrapper>

      <title-wrapper :title="$t('projectTitle')">
        <el-form-item prop="title">
          <el-input
            v-model="title"
            :placeholder="$t('placehldrTitle')"
            class="bitmal-input"/>
        </el-form-item>
      </title-wrapper>

      <title-wrapper :title="$t('cause')">
        <el-form-item prop="category">
          <el-select
            v-model="category"
            :placeholder="$t('placehldrPleaseSelect')"
            class="bitmal-input hundred"
            popper-class="bitmal-input-popper">
            <el-option
              v-for="cat in getTypes('sc_marketPlaceCategory')"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id" />
          </el-select>
        </el-form-item>
      </title-wrapper>

      <div class="twins">
        <title-wrapper :title="$t('location')">
          <el-form-item prop="location">
            <el-select
              v-model="location"
              :placeholder="$t('placehldrPleaseSelect')"
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

        <title-wrapper :title="$t('launchDate')">
          <el-form-item prop="launch_date">
            <el-date-picker
              v-model="launch_date"
              :placeholder="$t('placehldrSelect')"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper"
              format="yyyy-MM-dd"
              type="date" />
          </el-form-item>
        </title-wrapper>
      </div>

      <title-wrapper
        :title="$t('briefProjectIntroduction')"
        :addition="$t('max140')">
        <el-form-item prop="brief">
          <el-input
            :rows="2"
            v-model="brief"
            :placeholder="$t('placehldrBrief')"
            class="bitmal-input"
            type="textarea"
            autosize />
        </el-form-item>
      </title-wrapper>

      <title-wrapper :title="$t('description')">
        <el-form-item prop="description">
          <el-input
            :rows="3"
            v-model="description"
            :placeholder="$t('placehldrDetails')"
            type="textarea"
            autosize
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>

      <title-wrapper
        :title="$t('milestoneTitle')"
        :addition="$t('min5')"
        big-top-margin>
        <el-form-item prop="milestone_title">
          <el-input
            v-model="milestone_title"
            :placeholder="$t('placehldrMilestoneTitle')"
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>

      <div class="twins">
        <title-wrapper :title="$t('milestoneFundingGoal')">
          <el-form-item prop="milestone_btc_value">
            <el-input-number
              v-model="milestone_btc_value"
              :min="0"
              class="bitmal-input hundred"
              controls-position="right" />
          </el-form-item>
        </title-wrapper>

        <title-wrapper :title="$t('milestoneTargetDate')">
          <el-form-item prop="milestone_target_date">
            <el-date-picker
              v-model="milestone_target_date"
              :placeholder="$t('placehldrSelect')"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper"
              format="yyyy-MM-dd"
              type="date" />
          </el-form-item>
        </title-wrapper>
      </div>

      <title-wrapper
        :title="$t('milestoneDetails')"
        :addition="$t('min10')">
        <el-form-item prop="milestone_description">
          <el-input
            :rows="3"
            v-model="milestone_description"
            :placeholder="$t('placehldrMilestoneDetails')"
            type="textarea"
            autosize
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>
    </el-form>

    <button
      class="btn btn-dark"
      @click="clickActionHandler">{{ edit ? $t('save') : $t('submit') }}</button>
  </div>
</template>

<i18n>
{
  "en": {
    "projectCoverImage": "project cover image",
    "projectTitle": "project title",
    "cause": "cause",
    "location": "location",
    "launchDate": "launch date",
    "briefProjectIntroduction": "brief project introduction",
    "description": "description",
    "milestoneTitle": "milestone title",
    "milestoneFundingGoal": "milestone funding goal",
    "milestoneTargetDate": "milestone target date",
    "milestoneDetails": "milestone details",
    "placehldrTitle": "Enter project title",
    "placehldrPleaseSelect": "Please select",
    "placehldrSelect": "Select",
    "placehldrBrief": "What's the key value proposition of your project?",
    "placehldrDetails": "What's your project in details? How are you going to use the funding? What are going to deliver and when?",
    "placehldrMilestoneTitle": "A title best describing your milestone",
    "placehldrMilestoneDetails": "Here you can further detail your milestone.",
    "max140": "max. 140 characters",
    "min5": "min. 5 characters",
    "min10": "min. 10 characters",
    "max140Invalid": "Introduction shouldn't be longer than 140 characters",
    "min5Invalid": "Should be at least 5 characters long",
    "min10Invalid": "Should be at least 10 characters long",
    "submit": "submit",
    "save": "save changes",
    "coverImgRequired": "Cover image is required",
    "fieldRequired": "This field is required",
    "apiPostSuccess": "Succcessful project creation",
    "apiPutSuccess": "Succcessful project creation",
    "apiError": "Server error occured while uploading the project form"
  }
}
</i18n>

<script>
import TitleWrapper from '../common/TitleWrapper.vue'
import BitmalFile from '../common/BitmalFile.vue'
import { mapGetters, mapActions } from 'vuex'
import NotificationMixin from '../NotificationMixin.js'
import get from 'lodash/get'
import { format as formatDate } from 'date-fns'

export default {
  components: { TitleWrapper, BitmalFile },
  mixins: [ NotificationMixin ],

  props: {
    project: {
      type: Object,
      default: () => ({
        empty: true
      })
    }
  },

  data () {
    return {
      img: '',
      title: '',
      category: '',
      location: '',
      brief: '',
      description: '',
      launch_date: '',

      milestone_title: '',
      milestone_btc_value: 0,
      milestone_target_date: '',
      milestone_description: '',

      rules: {
        img: [
          { required: true, message: this.$t('coverImgRequired'), trigger: 'change' }
        ],
        title: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' }
        ],
        category: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'change' }
        ],
        location: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'change' }
        ],
        launch_date: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'change' }
        ],
        brief: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' },
          { max: 140, message: this.$t('max140Invalid') }
        ],
        description: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' }
        ],
        milestone_title: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' },
          { min: 5, message: this.$t('min5Invalid') }
        ],
        milestone_btc_value: [
          { type: 'number', required: true, min: 0.0000001, message: this.$t('fieldRequired'), trigger: 'blur' }
        ],
        milestone_target_date: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' }
        ],
        milestone_description: [
          { required: true, message: this.$t('fieldRequired'), trigger: 'blur' },
          { min: 10, message: this.$t('min10Invalid') }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      getTypes: 'types/getRawTypes',
      getTypeIdFromName: 'types/getTypeIdFromName'
    }),

    edit () {
      return !this.project.empty
    }
  },

  created () {
    if (this.edit) {
      this.img = get(this, 'project.primary_media')
      this.title = get(this, 'project.title')
      this.category = get(this, 'project.category.name')
      this.location = get(this, 'project.location.name')
      this.brief = get(this, 'project.brief')
      this.description = get(this, 'project.description')
      this.launch_date = get(this, 'project.launch_date')
      this.milestone_title = get(this, 'project.milestones.data[0].title')
      this.milestone_btc_value = get(this, 'project.milestones.data[0].btc_value')
      this.milestone_target_date = get(this, 'project.milestones.data[0].target_date')
      this.milestone_description = get(this, 'project.milestones.data[0].description')
    }
  },

  methods: {
    ...mapActions({
      submitAction: 'form/submit',
      patchAction: 'form/patch',
      saveImg: 'form/saveImg',
      sendMilestone: 'form/sendMilestone'
    }),

    fileChanged (file) {
      if (file) {
        this.img = file
      }
      this.$nextTick(() => {
        this.$refs.projectForm.validateField('img')
      })
    },

    clickActionHandler () {
      this.$refs.projectForm.validate(async valid => {
        if (valid) {
          if (this.edit) {
            this.patch()
          } else {
            this.submit()
          }
        } // else client validation kicks in
      })
    },

    async submitProject () {
      const imgResponse = await this.saveImg(this.img)

      const formObj = {
        primary_media: get(imgResponse, 'data.data.id', null),
        title: this.title,
        category: this.category,
        location: this.location,
        brief: this.brief,
        description: this.description,
        launch_date: formatDate(this.launch_date, 'YYYY-MM-DD HH:mm:ss'),

        approval_notes: ''
      }
      this.submitAction(formObj)
        .then(async response => {
          this.handleSuccess(this.$t('apiPostSuccess'), get(response, 'data.message', 'success'))

          const projectId = get(response, 'data.id')
          await this.addMilestone(projectId)
          this.$router.push(`/project/${projectId}`)
        })
        .catch(error => {
          this.handleError(error, this.$t('apiError'))
        })
    },

    async patchProject () {
      // Upload image if its raw
      let imgResponse, imgResponseId
      if (this.img && !this.img.url) {
        imgResponse = await this.saveImg(this.img)
          .catch(error => {
            this.handleError(error)
          })
        imgResponseId = get(imgResponse, 'data.data.id', null)
      }

      // Serialising
      const formObj = {
        id: this.project.id,
        title: this.title,
        category: this.getTypeIdFromName('sc_marketPlaceCategory', this.category),
        location: this.getTypeIdFromName('sc_marketPlaceLocations', this.location),
        brief: this.brief,
        description: this.description,
        launch_date: formatDate(this.launch_date, 'YYYY-MM-DD HH:mm:ss'),

        approval_notes: get(this, 'project.approval_notes', '')
      }
      if (imgResponseId) {
        formObj.primary_media = imgResponseId
      }

      this.patchAction(formObj)
        .then(async response => {
          this.handleSuccess(this.$t('apiPutSuccess'), get(response, 'data.message', 'success'))

          const projectId = get(response, 'data.id')
          await this.addMilestone(projectId)
          this.$router.push(`/project/${projectId}`)
        })
        .catch(error => {
          this.handleError(error, this.$t('apiError'))
        })
    },

    addMilestone (projectId) {
      const milestoneData = {
        title: this.milestone_title,
        btc_value: this.milestone_btc_value,
        target_date: this.milestone_target_date,
        description: this.milestone_description
      }
      this.sendMilestone({ projectId, milestoneData })
        .catch(error => {
          this.handleError(error)
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
