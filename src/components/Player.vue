<template>
  <div v-if="showPlayer" class="v-scloud-player">
    <p>player</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Player",
  computed: {
    ...mapState(["showPlayer"])
  }
};
</script>

<style lang="scss" scoped>
.v-scloud-player {
  // grid-area: f;
  position: fixed;
  bottom: 0px;
}
</style>
