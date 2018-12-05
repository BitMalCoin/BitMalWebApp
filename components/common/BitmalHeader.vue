<template>
  <nav v-scroll-class:scrolled="1">
    <div class="nav-mid">
      <nuxt-link
        :to="localePath('explore')"
        tag="button"
        class="btn btn-borderless">{{ $t('explore') }}</nuxt-link>

      <img
        src="/logo.png"
        alt="Bitmal logo"
        @click="goHome">

      <bitmal-user v-if="$auth.loggedIn" />
      <div v-if="!$auth.loggedIn">
        <nuxt-link
          :to="localePath('login-request')"
          tag="button"
          class="btn mr-12">{{ $t('login') }}</nuxt-link>
        <nuxt-link
          :to="localePath('signup')"
          tag="button"
          class="btn btn-dark">{{ $t('signup') }}</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<i18n>
{
  "en": {
    "explore": "explore",
    "login": "sign in",
    "signup": "sign up"
  }
}
</i18n>

<script>
export default {

}
</script>

<style>

</style>

<script>
import BitmalUser from '../common/BitmalUser'
import VueScrollClass from 'vue-scroll-class'

export default {
  directives: { 'scroll-class': VueScrollClass },
  components: { BitmalUser },

  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/variables.less';

nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: @headerHeight;
  background-color: @khaki;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0) 0px 8px 12px 0px;
  transition: box-shadow .25s;
  z-index: 1; // needed to let the youtube iframe scroll under it...

  &.scrolled {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 8px 12px 0px;
  }

  .nav-mid {
    flex: 1;
    max-width: @appWidthMaxLimit;
    margin: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 45px;
      width: 160px;
      cursor: pointer;
    }
  }
}

</style>
