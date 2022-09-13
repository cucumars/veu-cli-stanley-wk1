<template>
  <button class="my-button">
    <img :src="iconType" alt="" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
  },

  data() {
    return {
      icon: {
        record: require('@/assets/img/button-record.svg'),
        save: require('@/assets/img/button-save.svg'),
        add: require('@/assets/img/button-add.svg'),
        export: require('@/assets/img/button-export.svg'),
        prev: require('@/assets/img/button-prev.svg'),
        next: require('@/assets/img/button-next.svg'),
      },
    };
  },

  computed: {
    iconType() {
      return this.icon[this.type || 'default'];
    },
  },
};
</script>

<style lang="scss" scoped>
  .my-button {
    width: 120px;
    height: 30px;
    margin-right: 20px;
    background-color: green;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    & > img {
      width: 20px;
      height: 23px;
    }

    &:hover {
      background-color: rgb(15, 222, 133);
      color: black;
    }
    &.mt-10 {
      margin-bottom: 10px;
    }
}
</style>
