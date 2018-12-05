<template>
  <div class="funding-figure">
    <div class="figure-base">
      <div
        v-if="bigger"
        :style="figWidth(sum, goal)"
        class="bigadding" />
      <div
        v-if="bigger"
        :style="figWidth(goal, sum)"
        class="goal" />
      <div
        v-if="!bigger"
        :style="figWidth(sum, goal)"
        class="smalladding" />
      <div
        :style="figWidth(there, max)"
        class="there" />
      <div
        v-if="bigger"
        :style="figLeft(goal, sum)"
        class="goal-sign">
        <i class="el-icon-caret-top el-icon--right" />
        <div>{{ $t('goal') }}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "goal": "GOAL"
  }
}
</i18n>

<script>
export default {
  props: {
    there: {
      type: Number,
      required: true
    },
    adding: {
      type: Number,
      default: 0
    },
    goal: {
      type: Number,
      required: true
    }
  },

  computed: {
    sum () {
      return +this.there + +this.adding
    },

    max () {
      return Math.max(this.sum, this.goal)
    },

    bigger () {
      return this.goal < this.sum
    }
  },

  methods: {
    figWidth (small, big) {
      let ratio = (+small / +big * 100).toPrecision(4)
      ratio = Math.min(ratio, 100)
      return {
        width: `${ratio}%`
      }
    },

    figLeft (small, big) {
      let left = (+small / +big * 100).toPrecision(4)
      left = Math.min(left, 100)
      return {
        left: `${left}%`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.figure-base,
.there,
.smalladding,
.goal,
.bigadding {
  height: 10px;
}

.figure-base {
  position: relative;
  background-image: url(/sraf.png);
  max-width: 600px;
  width: 100%;
}

.there,
.smalladding,
.goal,
.bigadding,
.goal-sign {
  position: absolute;
  transition: all .5s ease-in-out;
}

.there {
  background-color: @text;
  border-right: 1px solid @khaki;
}

.smalladding {
  background-color: @blue;
}

.goal {
  background-color: @blue;
  border-right: 1px solid @khaki;
}

.bigadding {
  background-color: @blue;
}

.goal-sign {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, 9px);
  height: 20px;
  .font-xs;
  line-height: 10px;
}
</style>
