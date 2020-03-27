<template>
  <div class="ticker">
    <template v-for="index in valueLength">
      <ul :key="index" class="ticker__digit" :style="getMarginTop(index - 1)">
        <template v-for="(n, key) in numbers">
          <li :key="key">{{ n }}</li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: "Ticker",
  props: {
    initialValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      numbers: [...Array(10).keys()],
      valueLength: this.maxValue.toString().length
    };
  },
  computed: {
    getValueObj() {
      return `${"0".repeat(this.valueLength - 1)}${this.initialValue}`.slice(
        -this.valueLength
      );
    },
    getTickerHeight() {
      return {
        height: `${this.itemHeight}em`
      };
    }
  },
  methods: {
    getMarginTop(index) {
      const v = this.getValueObj[index];
      const leftToIndex = this.getValueObj.substring(0, index + 1);
      const override = [...leftToIndex].every(n => n == "0");
      return {
        marginTop: override ? "1em" : `-${v}em`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.ticker {
  height: 1em;
  overflow: hidden;
  display: flex;
  flex-direction: row;

  &__digit {
    width: 1em;
    list-style-type: none;
    font-size: 1em;
    line-height: 1em;
    transition: margin-top 200ms cubic-bezier(0.4, 0, 0.2, 1);

    > * {
      display: inline-block;
    }
  }
}
</style>
