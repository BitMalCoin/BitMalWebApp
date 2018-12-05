<template>
  <el-row
    :gutter="24"
    class="proj-head">
    <el-col
      :span="calcLeftSpan"
      class="left">
      <div class="name">{{ project.title }}</div>
      <div class="intro">{{ project.brief || '-' }}</div>
    </el-col>

    <el-col
      v-if="project.owner"
      :span="calcRightSpan"
      class="right">
      <div class="img-holder">
        <img
          v-if="project.owner.profile_picture && project.owner.profile_picture.url"
          :src="project.owner.profile_picture.url"
          :alt="$t('ownerImg')"
          onerror="this.style.display='none'">
      </div>
      <div class="owner-and-cause">
        <div class="owner">{{ $t('by') }} {{ project.owner.first_name }} {{ project.owner.family_name }}</div>
        <div class="cause">{{ $t('in') }} {{ project.category.name }}</div>
      </div>
    </el-col>
  </el-row>
</template>

<i18n>
{
  "en": {
    "qwnerImg": "owners profile picture",
    "by": "by",
    "in": "in"
  }
}
</i18n>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  computed: {
    calcLeftSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 16,
        lg: 16,
        xl: 16
      }[this.$mq]
    },

    calcRightSpan () {
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

.proj-head {
  width: 100%;
  border-bottom: 1px solid @ui;
  padding-bottom: 30px;

  .left {
    margin-bottom: 12px;
    .name {
      .font-l;
      .bold;
    }

    .intro {
      .font-m;
      max-width: 500px;
      margin-top: 18px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .img-holder {
      height: 70px;
      width: 70px;
      min-width: 70px;
      background-color: @text-light;
      border-radius: 50%;

      img {
        height: 70px;
        width: 70px;
        min-width: 70px;
        border-radius: 50%;
      }
    }

    .owner-and-cause {
      margin-left: 12px;
      .owner {
        .font-m;
      }
      // .cause {}
    }
  }
}
</style>
