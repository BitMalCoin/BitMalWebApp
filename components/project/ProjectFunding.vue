<template>
  <title-wrapper
    :title="$t('pledged')"
    class="marginless">
    <div class="proj-funding">
      <div class="nrs">
        <div class="bignr">{{ project.pledged || 100 }}</div>
        <div class="goalnr">OF {{ project.goal || 300 }} {{ $t('goal') }}</div>
      </div>
      <div class="figure">
        <div
          :style="figWidth(project.goal || 300, project.pledged || 100)"
          class="figure-filler" />
      </div>
      <div class="two-nrs">
        <title-wrapper :title="$t('toGo')">
          <div class="bignr">{{ daysUntil }}</div>
        </title-wrapper>
        <title-wrapper :title="$t('backers')">
          <div class="bignr">{{ project.backers || 2 }}</div>
        </title-wrapper>
      </div>

      <nuxt-link
        :to="localePath({path: `/project/${project.id}/backing`})"
        tag="button"
        class="btn btn-dark btn-fullwidth">{{ $t('backThis') }}</nuxt-link>
    </div>
  </title-wrapper>
</template>

<i18n>
{
  "en": {
    "pledged": "PLEDGED BITMALS",
    "goal": "GOAL",
    "toGo": "DAYS TO GO",
    "backers": "TOTAL BACKERS",
    "backThis": "BACK THIS PROJECT"
  }
}
</i18n>

<script>
import TitleWrapper from '../common/TitleWrapper.vue'
import diffInDays from 'date-fns/difference_in_days'

export default {
  components: { TitleWrapper },
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      daysUntil: Math.max(diffInDays(this.project.launch_date, Date.now()), 0)
    }
  },

  methods: {
    figWidth (goal, pledged) {
      return {
        width: (pledged / goal * 100).toPrecision(2) + '%'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.marginless {
  margin-top: 0px;
  padding-bottom: 36px;
  border-bottom: 1px solid @ui;

  .proj-funding {
    .nrs {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goalnr {
        .font-xs;
      }
    }

    .two-nrs {
      display: flex;
      justify-content: space-evenly;
    }

    .bignr {
      .bold;
      .font-l;
    }

    .btn {
      margin-top: 24px;
    }

    .figure {
      width: 100%;
      height: 10px;
      background-image: url(/sraf.png);

      .figure-filler {
        height: 10px;
        background-color: @text;
      }
    }
  }
}
</style>
