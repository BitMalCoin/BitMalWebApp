<template>
  <div
    :class="['project-card', { featured }]"
    @click="$router.push(`/project/${project.id}`)">

    <div class="img-holder">
      <img
        v-if="project.primary_media && project.primary_media.url"
        :src="project.primary_media.url"
        :alt="$t('noImg')"
        class="project-img">
    </div>
    <div class="cause">{{ project.category.name }}</div>
    <div class="name">{{ project.title }}</div>
    <div class="introduction">{{ project.brief || '-' }}</div>
    <div class="info">{{ project.info || $t('walletNA') }}</div>
  </div>
</template>

<i18n>
{
  "en": {
    "noImg": "No project image",
    "walletNA": "wallet N.A."
  }
}
</i18n>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.project-card {
  margin-top: 40px;
  flex: 1;
  cursor: pointer;

  .img-holder {
    height: 210px;
    width: 100%;
    background-color: @text-light;
  }
  .project-img {
    height: 210px;
    width: 100%;
    object-fit: cover;
  }

  .cause {
    .font-xs;
    text-transform: uppercase;
    margin-top: 12px;
  }
  .name {
    .font-m;
    .bold;
    margin-bottom: 8px;
  }
  .introduction {
    .font-s;
    margin-bottom: 8px;
  }
  .info {
    .font-xs;
  }

  &.featured:before {
    position: absolute;
    content: url('/star.png');
    transform: scale(.55);
    transform-origin: left top;
  }
}
</style>
