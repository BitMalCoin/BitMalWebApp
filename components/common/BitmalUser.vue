<template>
  <div>
    <div
      v-if="$auth.user && $auth.user.first_name"
      class="bitmal-user">
      <img
        :src="$auth.user && $auth.user.profile_picture && $auth.user.profile_picture.url"
        class="user-image"
        @error="handleImgSrcError">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link user-name">
          {{ $auth.user.first_name }} {{ $auth.user.family_name }} <i class="el-icon-caret-bottom el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          class="user-menu-container">
          <el-dropdown-item @click.native="editProfile">{{ $t('editProfile') }}</el-dropdown-item>
          <el-dropdown-item @click.native="viewHistory">{{ $t('viewHistory') }}</el-dropdown-item>
          <el-dropdown-item @click.native="manageProjects">{{ $t('manageProjects') }}</el-dropdown-item>
          <el-dropdown-item @click.native="logMeOut">{{ $t('logMeOut') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div
      v-if="$auth.user && !$auth.user.first_name"
      class="bitmal-user">
      <img
        :src="$auth.user && $auth.user.profile_picture && $auth.user.profile_picture.url"
        class="user-image"
        onerror="this.style.display='none'">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link user-name">
          {{ $t('unknownUser') }} <i class="el-icon-caret-bottom el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          class="user-menu-container">
          <el-dropdown-item @click.native="editProfile">{{ $t('fillProfile') }}</el-dropdown-item>
          <el-dropdown-item @click.native="logMeOut">{{ $t('logMeOut') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div v-if="!$auth.user">
      $t('noUser')
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "editProfile": "Edit user profile",
    "viewHistory": "View wallet and transactions",
    "manageProjects": "Manage Your Projects",
    "logMeOut": "Sign Out",
    "fillProfile": "Fill profile",
    "noUser": "No user",
    "unknownUser": "User without profile",
    "logoutSuccess": "Succesful logout",
    "logoutError": "Error during user logout"
  }
}
</i18n>

<script>
import NotificationMixin from '../NotificationMixin.js'

export default {

  mixins: [ NotificationMixin ],

  methods: {
    editProfile () {
      this.$router.push('/user/profile')
    },

    viewHistory () {
      this.$router.push('/user/transactions')
    },

    manageProjects () {
      this.$router.push('/user/projects')
    },

    async logMeOut () {
      this.$auth.logout()
        .then(() => {
          this.handleSuccess(this.$t('logoutSuccess'))
          this.$router.push('/')
        })
        .catch(error => {
          this.handleError(error, this.$t('logoutError'))
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.bitmal-user {
  display: flex;
  align-items: center;

  .user-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
    background-color: grey;
  }

  .user-name {
    .font-s;
    outline: none;
    cursor: pointer;
  }
}
</style>
