<template>
  <main class="page-container">
    <TrackGrid :tracks="getTracks" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import TrackGrid from "@/components/TrackGrid.vue";

export default {
  name: "Home",
  components: {
    TrackGrid
  },
  computed: {
    ...mapGetters(["getTracks"])
  }
};
</script>

<style lang="scss" scoped></style>
