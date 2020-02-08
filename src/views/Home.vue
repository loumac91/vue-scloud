<template>
  <main class="page-container">
    <div class="canvas">
      <div class="ds-card-container">
        <div class="ds-card drop-shadow-bottom-right">
          <div class="ds-card__image">
            <img :src="'https://unsplash.it/800/600?image=59'" />
          </div>
          <h1>HELLO</h1>
          <i class="fas fa-play"></i>
          <br />
          <i class="fas fa-pause"></i>
          <br />
          <i class="fas fa-stop"></i>
          <br />
          <i class="fas fa-step-forward"></i>
          <br />
          <i class="fas fa-step-backward"></i>
          <br />
          <i class="fas fa-plus"></i>
          <br />
          <i class="fas fa-minus"></i>
        </div>
      </div>
    </div>

    <h1>Home</h1>
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

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.card-container {
  filter: drop-shadow(-10px -10px 10px #fafbff);
}

.ds-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  background-color: $base-card-color;

  &__image {
    position: relative;
    height: auto;

    > img {
      height: auto;
      max-width: 100%;
      vertical-align: middle;
    }
  }
}

.drop-shadow-bottom-right {
  filter: drop-shadow(10px 10px 10px #a6abbd);
}

.canvas {
  border-radius: 10px;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebecf0;
}
</style>
