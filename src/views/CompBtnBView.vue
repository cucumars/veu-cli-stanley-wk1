<template>
  <div>
    <h1>元件B - 類型 B 按鈕</h1>
  </div>
  <div class="display-btn-all">
    <component-b v-for="(btn, key) in btnType" :key="key" :btn="btn" class="mt-10 btn" />
  </div>
</template>
<script>
  import ComponentB from "@/components/ComponentBtnB.vue";
  export default {
    components: {
      ComponentB,
    },
    data() {
      return {
        btnType: [
          { type: 'stop-service', keyx: 1, state: true, disabled:false },
          { type: 'stop-service', keyx: 2, state: false, disabled:false  },
          { type: 'number-text', keyx: 3, state: true, disabled:false  },
          { type: 'number-text', keyx: 4, state: false, disabled:false  },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    color: red;
  }
  .display-btn-all {
    width:50%;
    height:300px;
    min-width: 350px;
    max-width: 500px;
    border:1px solid white;
    margin:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
  }

  .btn {
    width: 200px;
    height:40px;
  }
  .mt-10{
    margin-top: 20px;
  }
</style>

