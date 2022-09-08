<template>
  <div class="compBtnA">
    <h1>元件 - 類型 A 按鈕</h1>
  </div>
  <div class="btn-all">
     <component-a v-for="(btn, key) in btnType" :key="key" :type="btn.type" class="mt-10">{{ btn.content}}</component-a>
  </div>
</template>

<script>
  import ComponentA from '@/components/ComponentBtnA.vue';
  export default {
    components: {
      ComponentA,
    },
    data() {
      return {
        btnType: [
          { type: 'record', content: '修改紀錄' },
          { type: 'save', content: '儲存' },
          { type: 'add', content: '新增' },
          { type: 'export', content: '匯出' },
          { type: 'prev', content: '上一步' },
          { type: 'next', content: '下一步' },
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    color: red;
  }

  .btn-all {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    flex-wrap: wrap;
  }
  .mt-10 {
    margin-bottom: 10px;
  }
</style>