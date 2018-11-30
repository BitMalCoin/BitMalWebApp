<template>
  <div class="explorer-holder">
    <div class="projects">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-comp">
        <project-component :project="project" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectComponent from '../common/ProjectComponent.vue'

export default {
  components: { ProjectComponent },
  props: {
    projects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.explorer-holder {
  padding-bottom: 32px;

  .projects {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-flow: row wrap;

    .project-comp {
      width: 23%;
      min-width: 200px;
    }
  }
}

</style>
