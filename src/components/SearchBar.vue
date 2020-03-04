<template>
  <div class="search-bar">
    <form class="search-bar__form" novalidate @submit="handleSearch">
      <input
        ref="input"
        type="text"
        autocomplete="off"
        class="search-bar__form-input"
        placeholder="search tracks..."
      />
      <button type="submit" class="search-bar__form-submit">
        <i class="fa fa-search"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { FETCH_TRACKS } from "@/store/action.types";

export default {
  name: "SearchBar",
  methods: {
    handleSearch(e) {
      e.preventDefault();
      const searchQuery = this.$refs.input.value.trim();
      this.$store.dispatch(FETCH_TRACKS, searchQuery);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
}
</style>
