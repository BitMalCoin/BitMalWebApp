<template>
  <div class="proj-comments">

    <div
      v-if="$auth.loggedIn"
      class="c-comment">
      <div class="c-writer-img-holder">
        <img
          :src="$auth.user.profile_picture.url"
          class="c-writer-img"
          alt="user profile">
      </div>
      <div class="c-text-holder">
        <textarea
          ref="newCommentInput"
          v-model="newComment"
          class="c-textarea"
          placeholder="Add a comment here..." />
        <button
          class="btn btn-mid post-btn"
          @click="postComment">post comment</button>
      </div>
    </div>

    <div
      v-for="comment in orderedComments"
      :key="comment.id"
      :class="['c-comment', { owners: project.owner.id === comment.owner.id }]">
      <div class="c-writer-img-holder">
        <img
          v-if="comment.owner.profile_picture && comment.owner.profile_picture.url"
          :src="comment.owner.profile_picture.url"
          class="c-writer-img"
          alt="commenter profile">
      </div>
      <div class="c-text-holder">
        <div
          class="c-text"
          v-html="comment.message" />
        <div class="c-writer">{{ comment.owner.first_name }} {{ comment.owner.family_name }} • {{ countDistance(comment.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { mapActions } from 'vuex'

// From https://codepen.io/vsync/pen/czgrf
function autosize () {
  var el = this
  setTimeout(function () {
    el.style.cssText = `height: ${el.scrollHeight - 8}px`
  }, 0)
}

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      newComment: ''
    }
  },

  computed: {
    orderedComments () {
      return this.project.comments.data.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    }
  },

  mounted () {
    if (this.$auth.loggedIn) {
      this.$refs.newCommentInput.addEventListener('keydown', autosize)
    }
  },

  beforeDestroy () {
    if (this.$auth.loggedIn) {
      this.$refs.newCommentInput.removeEventListener('keydown', autosize)
    }
  },

  methods: {
    ...mapActions({
      postCommentAction: 'projectDetail/postComment'
    }),

    countDistance (date) {
      return distanceInWordsToNow(date, { includeSeconds: true, addSuffix: true })
    },

    async postComment () {
      await this.postCommentAction({
        projectId: this.project.id,
        message: this.newComment
      })
      this.newComment = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.c-comment {
  display: flex;
  align-content: start;

  .c-writer-img-holder {
    height: 75px;
    min-width: 75px;
    width: 75px;
    margin-bottom: 48px;
    margin-right: 24px;
    background-color: @overlay;
    border-radius: 50%;

    img.c-writer-img {
      height: 75px;
      width: 75px;
      border-radius: 50%;
    }
  }

  .c-text-holder {
    width: 100%;

    .c-textarea {
      width: calc(100% - 18px);
      border: 1px solid @ui;
      background-color: @khaki;
      margin-top: 22px;
      .font-m;
      font-style: italic;
      padding: 4px 8px;
      resize: none;
      height: 23px;
      ::placeholder {
        color: @text-light;
      }
    }

    .post-btn {
      float: right;
      margin-top: 6px;
    }

    .c-text {
      margin-top: 22px;
      display: block;
      font-style: italic;
      background-color: @overlay;
      .font-m;
      padding: 4px 8px;
    }
    .c-writer {
      margin-top: 4px;
      .font-s;
    }
  }

  &.owners {
    .c-text {
      background-color: @active-bg;
    }
    .c-writer {
      color: @active-text;
    }
  }
}

</style>
