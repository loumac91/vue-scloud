<template>
  <main class="page-container">
    <h1>Home</h1>
    <div class="card">
      <h1>Hello Vorld</h1>
    </div>
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
