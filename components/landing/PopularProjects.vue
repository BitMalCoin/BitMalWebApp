<template>
  <div class="popular-holder">
    <div class="top-text">
      <div class="bold">{{ $t('popularProjects') }}</div>
    </div>
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

<i18n>
{
  "en": {
    "popularProjects": "Popular projects"
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
  }
}
</script>

<style lang="less">
@import '../../assets/style/main.less';

.popular-holder {
  padding-bottom: 32px;

  .top-text {
    .font-s;
    display: flex;
    text-transform: uppercase;
  }

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
