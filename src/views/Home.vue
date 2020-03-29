<template>
  <main class="page-container">
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
  computed: {
    ...mapState({
      tracks: state => state.track.tracks
    }),
    ...mapGetters(["getIsMoreTracks", "getLoadingState"])
  },
  mounted() {
    this.initScrollTrigger();
  },
  methods: {
    initScrollTrigger() {
      window.onscroll = () => {
        const el = this.$refs.trigger;
        let triggerReached =
          document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - el.offsetHeight;

        if (triggerReached && !this.getLoadingState(FETCH_NEXT_PAGE_URL)) {
          this.$store.dispatch(FETCH_NEXT_PAGE_URL);
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-trigger {
  height: 200px;
}
</style>
