<template>
  <div class="featured-holder">
    <div class="top-text">
      <div class="bold">{{ $t('featuredProjects') }}</div>
    </div>
    <el-row :gutter="24">
      <el-col :span="countSpan">
        <project-component
          :project="projects[0]"
          featured />
      </el-col>
      <el-col :span="countSpan">
        <project-component
          :project="projects[1]"
          featured />
      </el-col>
      <el-col :span="countSpan">
        <project-component
          :project="projects[2]"
          featured />
      </el-col>
    </el-row>
  </div>
</template>

<i18n>
{
  "en": {
    "featuredProjects": "featured projects"
  }
}
</i18n>

<script>
import ProjectComponent from '../common/ProjectComponent.vue'

export default {
  components: { ProjectComponent },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  computed: {
    countSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 8
      }[this.$mq]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.featured-holder {
  padding-bottom: 32px;
  border-bottom: 1px solid @ui;

  .top-text {
    .font-s;
    display: flex;
    text-transform: uppercase;
  }
}

</style>
