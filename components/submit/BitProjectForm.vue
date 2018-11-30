<template>
  <div class="project-form">

    <el-form
      ref="projectForm"
      :model="{ img, title, category, location, brief, description, launch_date, milestone_title, milestone_btc_value, milestone_target_date, milestone_description }"
      :rules="rules"
      @submit.native.prevent>

      <title-wrapper title="project cover image">
        <el-form-item prop="img">
          <bitmal-file @fileChanged="fileChanged" />
        </el-form-item>
      </title-wrapper>

      <title-wrapper title="project title">
        <el-form-item prop="title">
          <el-input
            v-model="title"
            class="bitmal-input"/>
        </el-form-item>
      </title-wrapper>

      <title-wrapper title="cause">
        <el-form-item prop="category">
          <el-select
            v-model="category"
            placeholder="Please select"
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
        <title-wrapper title="location">
          <el-form-item prop="location">
            <el-select
              v-model="location"
              placeholder="Please select"
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

        <title-wrapper title="launch date">
          <el-form-item prop="launch_date">
            <el-date-picker
              v-model="launch_date"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper"
              format="yyyy-MM-dd"
              type="date"
              placeholder="Select" />
          </el-form-item>
        </title-wrapper>
      </div>

      <title-wrapper
        title="brief project introduction"
        addition="max. 140 characters">
        <el-form-item prop="brief">
          <el-input
            :rows="2"
            v-model="brief"
            class="bitmal-input"
            type="textarea"
            autosize
            placeholder="What's the key value proposition of your project?" />
        </el-form-item>
      </title-wrapper>

      <title-wrapper title="description">
        <el-form-item prop="description">
          <el-input
            :rows="3"
            v-model="description"
            type="textarea"
            autosize
            placeholder="What's your project in details? How are you going to use the funding? What are going to deliver and when?"
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>

      <title-wrapper
        title="milestone title"
        big-top-margin>
        <el-form-item prop="milestone_title">
          <el-input
            v-model="milestone_title"
            placeholder="A title best describing your milestone"
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>

      <div class="twins">
        <title-wrapper title="milestone funding goal">
          <el-form-item prop="milestone_btc_value">
            <el-input-number
              v-model="milestone_btc_value"
              :min="0"
              class="bitmal-input hundred"
              controls-position="right" />
          </el-form-item>
        </title-wrapper>

        <title-wrapper title="milestone target date">
          <el-form-item prop="milestone_target_date">
            <el-date-picker
              v-model="milestone_target_date"
              class="bitmal-input hundred"
              popper-class="bitmal-input-popper"
              format="yyyy-MM-dd"
              type="date"
              placeholder="Select" />
          </el-form-item>
        </title-wrapper>
      </div>

      <title-wrapper title="milestone">
        <el-form-item prop="milestone_description">
          <el-input
            :rows="3"
            v-model="milestone_description"
            type="textarea"
            autosize
            placeholder="Here you can further detail your milestone."
            class="bitmal-input" />
        </el-form-item>
      </title-wrapper>
    </el-form>

    <button
      class="btn btn-dark"
      @click="submit">submit project</button>
  </div>
</template>

<script>
import TitleWrapper from '../common/TitleWrapper.vue'
import BitmalFile from '../common/BitmalFile.vue'
import { mapGetters, mapActions } from 'vuex'
import { Message } from 'element-ui'
import get from 'lodash/get'
import values from 'lodash/values'
import { format as formatDate } from 'date-fns'

export default {
  components: { TitleWrapper, BitmalFile },

  data () {
    return {
      img: '',
      title: 'FISH WITH MILESTONE #1',
      category: '',
      location: '',
      brief: 'A brief description',
      description: 'Taiyaki flexitarian copper mug fixie church-key, single-origin coffee tofu tilde humblebrag post-ironic stumptown tacos live-edge. Kickstarter farm-to-table hella lumbersexual readymade vinyl yr slow-carb heirloom succulents cold-pressed vice biodiesel thundercats whatever. Bitters health goth meh actually iceland typewriter biodiesel succulents. IPhone ennui asymmetrical kitsch art party selvage listicle vegan. Lomo XOXO chambray stumptown four loko. Lo-fi twee kogi copper mug single-origin coffee. Edison bulb ugh letterpress pug roof party slow-carb williamsburg waistcoat schlitz gastropub banh mi cloud bread. Semiotics listicle kogi, 3 wolf moon gentrify franzen af pabst banjo enamel pin post-ironic twee food truck irony. Typewriter truffaut pop-up venmo poutine hoodie blue bottle 90\'s farm-to-table hammock pug echo park irony shabby chic. Swag pabst green juice deep v. Cronut tattooed prism, hot chicken literally aesthetic DIY wayfarers hammock leggings blog craft beer. Leggings thundercats chia mustache keffiyeh. Affogato chicharrones gastropub pour-over, deep v post-ironic paleo viral thundercats pickled PBR&B skateboard. Disrupt fingerstache vinyl fam deep v. Fingerstache waistcoat four dollar toast kogi, XOXO gochujang shabby chic. Synth listicle put a bird on it, literally DIY vinyl pop-up meh four dollar toast raclette.',
      launch_date: '',

      milestone_title: 'Milestone title',
      milestone_btc_value: 1000,
      milestone_target_date: '2018.12.12',
      milestone_description: 'A description worth noticing...',
      // goal: '',
      // duration: ''

      rules: {
        img: [
          { required: true, message: 'Cover image is required', trigger: 'change' }
        ],
        title: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        category: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
        location: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
        launch_date: [
          { required: true, message: 'This field is required', trigger: 'change' }
        ],
        brief: [
          { required: true, message: 'This field is required', trigger: 'blur' },
          { max: 140, message: 'Introduction shouldn\'t be longer than 140 characters' }
        ],
        description: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        milestone_title: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        milestone_btc_value: [
          { type: 'number', required: true, min: 0.0000001, message: 'This field is required', trigger: 'blur' }
        ],
        milestone_target_date: [
          { required: true, message: 'This field is required', trigger: 'blur' }
        ],
        milestone_description: [
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

  methods: {
    fileChanged (file) {
      if (file) {
        this.img = file
      }
      this.$nextTick(() => {
        this.$refs.projectForm.validateField('img')
      })
    },

    ...mapActions({
      submitForm: 'form/submit',
      saveImg: 'form/saveImg',
      sendMilestone: 'form/sendMilestone'
    }),

    addMilestone (projectId) {
      const milestoneData = {
        title: this.milestone_title,
        btc_value: this.milestone_btc_value,
        target_date: this.milestone_target_date,
        description: this.milestone_description
      }
      this.sendMilestone({ projectId, milestoneData })
        .catch(error => {
          Message.error({
            dangerouslyUseHTMLString: true,
            message: `<em>${get(error, 'response.data.code')} - Server error occured</em><br>while adding milestone data`,
            duration: 0,
            showClose: true
          })
        })
    },

    submit () {
      this.$refs.projectForm.validate(async valid => {
        if (valid) {
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
          this.submitForm(formObj)
            .then(async response => {
              const title = 'Succcessful project creation'
              const description = get(response, 'data.message', 'success')
              const projectId = get(response, 'data.id')

              Message.success({
                dangerouslyUseHTMLString: true,
                message: `<em>${title}</em><br>${description}`,
                duration: 0,
                showClose: true
              })
              await this.addMilestone(projectId)
              this.$router.push(`/project/${projectId}`)
            })
            .catch(error => {
              const title = `Server error (${get(error, 'response.data.code', '-')}) - ${get(error, 'response.data.error.message', 'Server error occured while uploading the project form')}`
              const description = values(get(error, 'response.data.error.attributes', {}))
                .map(el => el.join(' & '))
                .join(', ')

              Message.error({
                dangerouslyUseHTMLString: true,
                message: `<em>${title}</em><br>${description}`,
                duration: 0,
                showClose: true
              })
            })
        } // else frontend validation messages are bound
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
