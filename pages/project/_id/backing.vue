<template>
  <div class="project-backing">
    <project-header
      v-if="project"
      :project="project" />

    <div class="sixh">
      <title-wrapper :title="$t('projBalance')">
        <div class="nrs">
          <div class="bignr">{{ thousandSep(project.backing.pledged + amountToPass, ',') }}</div>
          <div class="goalnr">OF {{ project.backing.goal }} GOAL</div>
        </div>
        <project-funding-figure
          :there="there"
          :adding="amountToPass"
          :goal="goal" />
      </title-wrapper>

      <div class="twins">
        <title-wrapper :title="$t('yourContrib')">
          <el-input-number
            v-model="amount"
            :min="0"
            :max="$auth.user.balance || 500"
            controls-position="right"
            type="number"
            class="bitmal-input amount-input hundred" />
        </title-wrapper>

        <title-wrapper :title="$t('yourBalance')">
          <div class="bignr">{{ thousandSep($auth.user.balance || 500, ',') }}</div>
        </title-wrapper>
      </div>

      <div class="horizontal">
        <button
          class="btn btn-dark"
          @click="submit">{{ $t('continue') }}</button>
        <div class="flex-1 action-description">{{ $t('info') }}</div>
      </div>
    </div>

    <div class="stretch-1" />

    <bitmal-footer />
  </div>
</template>

<i18n>
{
  "en": {
    "projBalance": "project bitmal wallet balance",
    "yourContrib": "your bitmal contribution",
    "yourBalance": "your bitmal wallet balance",
    "continue": "continue",
    "info": "This will launch metamask gentrify heirloom meditation sriracha swag chambray skateboard gochujang portland blue bottle whatever..."
  }
}
</i18n>

<script>
import ProjectHeader from '../../../components/project/ProjectHeader'
import TitleWrapper from '../../../components/common/TitleWrapper'
import ProjectFundingFigure from '../../../components/project/ProjectFundingFigure'
import BitmalFooter from '../../../components/common/BitmalFooter'
import { mapActions } from 'vuex'

import { thousandSep } from '../../../utils/utils'

export default {
  components: {
    ProjectHeader,
    TitleWrapper,
    ProjectFundingFigure,
    BitmalFooter
  },

  data () {
    return {
      amount: 0,
      there: 200,
      yours: 100,
      goal: 500,

      // mock until wallet API is ready
      project: {
        backing: {
          pledged: 200,
          goal: 500
        }
      }
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('projectDetail/loadProject', params.id)
  },

  computed: {
    // ...mapGetters({
    //   project: 'projectDetails/getProject'
    // }),

    amountToPass () {
      return +this.amount || 0
    }
  },

  methods: {
    ...mapActions({
      loadProject: 'project/loadProject'
    }),

    submit () {
      alert('TODO: submit this amount:' + this.amount)
    },

    thousandSep: thousandSep
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/main.less';

.project-backing {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 96px);
  justify-content: space-between;

  .sixh {
    align-self: center;
  }

  .bignr {
    .bold;
    .font-xl;
  }

  .nrs {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goalnr {
      .font-xs;
    }
  }

  .twins {
    margin: 36px 0;
  }

  .amount-input {
    input {
      display: none;
    }
  }

  .horizontal {
    margin-top: 12px;
    display: flex;
    align-items: center;

    .action-description {
      padding-left: 18px;
      font-style: italic;
      color: @text-light;
    }
  }
}

</style>
