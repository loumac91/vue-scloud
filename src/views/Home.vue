<template>
  <main class="track-container">
    <TrackGrid :tracks="tracks" />
    <div v-show="getIsMoreTracks" ref="trigger" class="scroll-trigger"></div>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { FETCH_NEXT_PAGE_URL } from "@/store/action.types";
import TrackGrid from "@/components/TrackGrid.vue";

export default {
  name: "Home",
  components: {
    TrackGrid
  },
  data() {
    return {
      scrollListener: null
    };
  },
  computed: {
    ...mapState({
      tracks: state => state.track.activeTracklist // this needs to be the search results
    }),
    ...mapGetters(["getIsMoreTracks", "getLoadingState"])
  },
  mounted() {
    this.initScrollTrigger();
  },
  beforeDestroy() {
    this.destroyScrollListener();
  },
  methods: {
    initScrollTrigger() {
      this.scrollListener = window.addEventListener("scroll", () => {
        const el = this.$refs.trigger;
        let triggerReached =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - el.offsetHeight;

        if (triggerReached && !this.getLoadingState(FETCH_NEXT_PAGE_URL)) {
          this.$store.dispatch(FETCH_NEXT_PAGE_URL);
        }
      });
    },
    destroyScrollListener() {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.track-container {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  min-width: 368px;
  max-width: $base-max-width;
  margin: 0 auto;
  align-items: center;
}

.scroll-trigger {
  height: 200px;
}
</style>
