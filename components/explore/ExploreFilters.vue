<template>
  <el-row
    :gutter="20"
    class="exp-filter-holder">
    <el-col :span="calcSpan">
      <el-input
        v-model="q"
        :placeholder="$t('searchPlaceholder')"
        autofocus
        class="bitmal-input searchbox">
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"/>
      </el-input>
    </el-col>
    <el-col :span="calcSpan">
      <bit-filter-obj
        :value="''"
        :options="getTypes('sc_marketPlaceCategory')"
        :action="'explore/selectCategory'"
        class="cause hundred" />
    </el-col>
    <el-col :span="calcSpan">
      <bit-filter-obj
        :value="activeLocationId"
        :options="getTypes('sc_marketPlaceLocations')"
        :action="'explore/selectLocation'"
        class="cause hundred" />
    </el-col>
    <el-col :span="calcSpan">
      <bit-filter-obj
        :value="''"
        :options="getTypes('sorts')"
        :action="'explore/selectSort'"
        class="types hundred" />
    </el-col>
  </el-row>
</template>

<i18n>
{
  "en": {
    "searchPlaceholder": "Search..."
  }
}
</i18n>

<script>
import BitFilter from '../common/BitFilter.vue'
import BitFilterObj from '../common/BitFilterObj.vue'
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import slugify from 'slugify'

let self

export default {
  components: { BitFilter, BitFilterObj },

  data () {
    return {
      q: ''
    }
  },

  computed: {
    ...mapGetters({
      getTypes: 'types/getTypes',
      activeLocationId: 'explore/getActiveLocationId',
      getLocationFromId: 'types/getLocationFromId'
    }),

    calcSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 4
      }[this.$mq]
    }
  },

  watch: {
    q: debounce((val) => {
      self.search(val)
    }, 600),

    activeLocationId (val) {
      const slug = slugify(this.getLocationFromId(val).name)
      this.$router.replace({ ...this.$route, query: { location: slug } })
    }
  },

  created () {
    self = this
  },

  methods: {
    ...mapActions({
      search: 'explore/search'
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.exp-filter-holder {
  padding: 80px 0 24px;
  border-bottom: 1px solid @ui;

  .el-col {
    margin-bottom: 8px;
  }

  .searchbox {
    .font-m;
  }
}
</style>
