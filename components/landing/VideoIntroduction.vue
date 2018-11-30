<template>
  <div class="intro-holder">
    <div class="stretch-1 video-container">
      <no-ssr>
        <iframe
          src="https://www.youtube.com/embed/0J-phNIau78?wmode=transparent&rel=0&controls=0&showinfo=0"
          frameborder="0"
          wmode="Opaque"
          allow="autoplay; encrypted-media"
          allowfullscreen />
      </no-ssr>
    </div>
    <div class="stretch-2">
      <div class="intro-text">BitMal is a social market place where every one can contribute to the community. Backed by an innovative system where your efforts will be transformed into a social positive change.</div>
      <div class="buttons">
        <nuxt-link
          to="/submit"
          tag="button"
          class="btn btn-dark mr-12">submit a project</nuxt-link>
        <form action="mailto:info@bitmail.org">
          <button class="btn btn-dark">contact us</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.intro-holder {
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  padding: 12px 0;
}

.intro-text {
  .font-xl;
  margin-bottom: 12px;
}

.buttons form {
  display: inline-block;
}

.video-container {
  position: relative;
  margin-right: 12px;
  min-height: calc(3 * 97vw / 16);
  max-height: 220px;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: calc(3 * 97vw / 16);
  max-height: 220px;
}

@media only screen and (max-width: 900px) {
  .intro-holder {
    flex-direction: column;
    align-items: stretch;
  }

  .intro-text {
    .font-m;
  }

  .video-container {
    margin-right: 0;
    height: calc( 9 * 100vw / 16);
    max-height: 506px;
  }

  .video-container iframe,
  .video-container object,
  .video-container embed {
    height: calc( 9 * 97vw / 16);
    width: 100%;
    max-height: 506px;;
  }
}
</style>
