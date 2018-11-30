<template>
  <div>
    <project-header
      v-if="project"
      :project="project" />

    <div
      v-if="project"
      class="project-breakdown">

      <el-row :gutter="24">
        <el-col
          :span="leftSpan"
          class="left-col">
          <div class="proj-cover-holder">
            <img
              v-if="project.primary_media && project.primary_media.url"
              :src="project.primary_media.url"
              class="proj-cover"
              alt="project cover image">
          </div>

          <p class="description">{{ project.description }}</p>

          <title-wrapper
            v-if="project.milestones && project.milestones.data.length"
            title="milestones">
            <div
              v-for="(milestone, ind) in project.milestones.data"
              :key="milestone.id"
              class="milestone">
              <div class="m-title">{{ ind + 1 }}. {{ milestone.title }}</div>
              <div class="m-funding">FUNDING GOAL {{ milestone.btc_value }} BITMALS</div>
              <div class="m-detail">{{ milestone.description }}</div>
            </div>
          </title-wrapper>

          <title-wrapper
            v-if="project.tags && project.tags.length"
            :title="'tags'">
            <div
              v-for="(tag, ind) in project.tags"
              :key="'tag-' + ind"
              class="tag"
              v-html="tag" />
          </title-wrapper>

          <title-wrapper
            v-if="project.comments && project.comments.data"
            v-show="$mq !== 'xs'"
            :title="`comments (${project.comments && project.comments.data && project.comments.data.length})`">
            <bitmal-comments :project="project" />
          </title-wrapper>

        </el-col>

        <el-col
          :span="rightSpan"
          class="right-col">

          <project-funding :project="project"/>

          <title-wrapper
            v-if="project.tasks && project.tasks.data"
            title="volunteering tasks"
            class="small-top-margin-title">
            <project-task
              v-for="task in project.tasks.data"
              :key="task.id"
              :task="task" />
          </title-wrapper>

          <div>? Social Share ?</div>

          <project-feed :feed="project.feed || []" />

          <title-wrapper
            v-if="project.comments && project.comments.data"
            v-show="$mq === 'xs'"
            :title="`comments (${project.comments && project.comments.data && project.comments.data.length})`">
            <bitmal-comments :project="project" />
          </title-wrapper>
        </el-col>
      </el-row>
    </div>

    <bitmal-footer/>
  </div>
</template>

<script>
import ProjectHeader from '../../../components/project/ProjectHeader.vue'
import TitleWrapper from '../../../components/common/TitleWrapper.vue'
import BitmalComments from '../../../components/project/BitmalComments.vue'

import ProjectFunding from '../../../components/project/ProjectFunding.vue'
import ProjectTask from '../../../components/project/ProjectTask.vue'
import ProjectFeed from '../../../components/project/ProjectFeed.vue'

import BitmalFooter from '../../../components/common/BitmalFooter.vue'
import { mapGetters } from 'vuex'

export default {
  auth: false,
  components: {
    ProjectHeader,
    TitleWrapper,
    BitmalComments,
    ProjectFunding,
    ProjectTask,
    ProjectFeed,
    BitmalFooter
  },

  async fetch ({ store, params }) {
    await store.dispatch('projectDetail/loadProject', params.id)
  },

  computed: {
    ...mapGetters({
      project: 'projectDetail/getProject'
    }),

    leftSpan () {
      return {
        xs: 24,
        sm: 16,
        md: 16,
        lg: 16,
        xl: 16
      }[this.$mq]
    },

    rightSpan () {
      return {
        xs: 24,
        sm: 8,
        md: 8,
        lg: 8,
        xl: 8
      }[this.$mq]
    }
  }
}
</script>

<style lang="less">
@import '../../../assets/style/main.less';

.project-breakdown {
  margin-top: 30px;
  display: flex;
  width: 100%;

  .left-col {
    .title-wrapper {
      margin-top: 36px;
    }

    .proj-cover-holder {
      width: 100%;
      height: 450px;
      background-color: @text-light;

      img.proj-cover {
        width: 100%;
        height: 450px;
        object-fit: cover;
      }
    }

    .description {
      width: 100%;
      color: @text;
      .font-m;
      margin-top: 18px;
    }

    .milestone {
      .font-m;

      .m-title {
        .bold;
      }
      .m-funding {
        .font-xs;
        margin-bottom: 8px;
      }
      .m-detail {
        margin-bottom: 12px;
      }
    }

    .tag {
      padding: 4px 10px;
      background-color: @overlay;
      border-radius: 16px;
      display: inline-block;
      margin-right: 8px;
    }
  }

  .right-col {
    .small-top-margin-title {
      margin-top: 8px;
    }
  }
}
</style>