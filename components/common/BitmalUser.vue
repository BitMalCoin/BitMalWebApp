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
          <el-dropdown-item @click.native="editAccount">Edit User Profile</el-dropdown-item>
          <el-dropdown-item @click.native="viewHistory">View Transaction History</el-dropdown-item>
          <el-dropdown-item @click.native="manageProjects">Manage Your Projects</el-dropdown-item>
          <el-dropdown-item @click.native="logMeOut">Sign Out</el-dropdown-item>
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
          Mockuser <i class="el-icon-caret-bottom el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          class="user-menu-container">
          <el-dropdown-item @click.native="editAccount">Fill profile</el-dropdown-item>
          <el-dropdown-item @click.native="logMeOut">Sign Out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div v-if="!$auth.user">
      No user
    </div>
  </div>
</template>

<script>
import NotificationMixin from '../NotificationMixin.js'

export default {

  mixins: [ NotificationMixin ],

  methods: {
    editAccount () {
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
          console.log('Succesful logout')
          this.$router.push('/')
        })
        .catch(error => {
          console.warn('Logout error', error)
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
