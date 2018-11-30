<template>
  <div class="proj-task">
    <div class="task-title">{{ task.title }}</div>
    <p class="task-description">{{ task.description }}</p>
    <div class="task-details">
      <div class="task-detail-row">
        <img
          class="left-icon"
          src="/date.png"
          alt="calendar icon">
        <div class="task-detail-text">Expected delivery by {{ formatDate(task.expected) }}</div>
      </div>
      <div class="task-detail-row">
        <img
          class="left-icon"
          src="/users.png"
          alt="volunteers icon">
        <div class="task-detail-text">{{ task.volunteersNeeded }} volunteers needed</div>
      </div>
      <div class="task-detail-row">
        <img
          class="left-icon"
          src="/billet.png"
          alt="bitmal icon">
        <div class="task-detail-text">{{ task.reward }} Bitmals reward</div>
      </div>
    </div>
    <button class="btn btn-dark btn-fullwidth">apply to this task</button>
  </div>
</template>

<script>
import formatDateFns from 'date-fns/format'

export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },

  methods: {
    formatDate (date) {
      return formatDateFns(date, 'MMMM D, YYYY')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.proj-task {
  padding-bottom: 24px;
  border-bottom: 1px solid @ui;

  .task-title {
    .bold;
    .font-m;
    margin: 18px 0 12px;
  }

  .task-description {
    .font-m;
  }

  .task-details {
    margin: 12px 0 18px;
    .task-detail-row {
      display: flex;
      align-items: center;
      height: 30px;
      .left-icon {
        width: 20px;
        margin-right: 6px;
      }

      .task-detail-text {
        .font-s;
      }
    }
  }
}
</style>
