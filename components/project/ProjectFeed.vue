<template>
  <title-wrapper
    v-show="feed.length > 0"
    :title="$t('title')"
    class="proj-feed">

    <div
      v-for="(activity, index) in feedToShow"
      :key="`act-${index}`"
      class="act-container">
      <img
        :src="activity.avatar"
        alt="">
      <div class="act-texts">
        <div class="act-text">{{ activity.text }}</div>
        <div class="act-when">{{ countDistance(activity.timestamp) }}</div>
      </div>
    </div>

    <button
      v-if="feed.length > 5"
      class="btn btn-fullwidth btn-ghost"
      @click="toggleShowAll">{{ showAll ? 'HIDE' : 'SEE' }} {{ $t('allActivity') }}</button>
  </title-wrapper>
</template>

<i18n>
{
  "en": {
    "title": "activity feed",
    "allActivity": "ALL ACTIVITY"
  }
}
</i18n>

<script>
import TitleWrapper from '../common/TitleWrapper'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

export default {

  components: { TitleWrapper },

  props: {
    feed: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      showAll: false
    }
  },

  computed: {
    feedToShow () {
      return this.showAll ? this.feed : this.feed.slice(0, 5)
    }
  },

  methods: {
    countDistance (date) {
      return distanceInWordsToNow(date, { includeSeconds: true, addSuffix: true })
    },

    toggleShowAll () {
      this.showAll = !this.showAll
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.proj-feed {

  .act-container {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .act-when {
      .font-xs;
      line-height: 20px;
    }
  }
}
</style>
