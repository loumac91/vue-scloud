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
      <IconButton :icon="'Search'" :type="submit" :neumorphic="true" />
    </form>
  </div>
</template>

<script>
import IconButton from "@/components/IconButton.vue";
import { FETCH_TRACKS } from "@/store/action.types";

export default {
  name: "SearchBar",
  components: {
    IconButton
  },
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
@import "@/styles/variables.scss";

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  flex: 1;

  &__form {
    display: flex;
    width: 100%;
    margin: 0 8px;
    box-shadow: none;
    border-radius: 8px;
    transition: all 0.1s ease-out 0s;
    padding: 2px 4px;

    // border-radius: 8px;
    // background: linear-gradient(145deg, #dbdde9, #b9bac4);
    // box-shadow: 11px 11px 23px #c7c9d3, -11px -11px 23px #d3d5e1;

    > input {
      outline: none;
      border: 0;
      padding: 0;
      width: 100%;
      color: #f0f0f0;
      font-family: inherit;
      font-size: 1.875rem;
      font-weight: 300;
      background: transparent;
      -webkit-font-smoothing: antialiased;
    }
  }
}
</style>
