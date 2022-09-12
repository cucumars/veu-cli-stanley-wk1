<template>
  <div>
    <h1>Hollow World</h1>
  </div>
  <div class="btn-all">
    <component-a v-for="(btn, key) in btnType" :key="key" 
      :type="btn.type"
      class="mt-10" 
      @click="click_fun(btn.to)"
    >{{ btn.content }}</component-a>
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
        { type: 'record', content: '紀錄', to:this.showSessionStorage },
        { type: 'export', content: '匯出', to: this.downloadSessionStorageToTextFile, },
        { type: 'next', content: '開始填寫',   to: this.startToCreate, },
      ]
    }
  },

  methods: {
    // 判斷是否為 function， 是則呼叫 function，
    // 判斷是否為 網址， 是則建立 router link
    click_fun: function(fun_href){ //判斷call function 或 call router
        typeof(fun_href) === 'function' ? fun_href() : 
        (fun_href ? this.$router.push(`${fun_href}`) : this.clickAlert(fun_href));
    },
    clickAlert:function() {
      alert("此處程序尚未設置，請聯絡相關單位！");
    },
    //開始填寫
    startToCreate() {
      this.$router.push('/card-create'); 
    },
  }

}
</script>
<style lang="scss" scoped>
  .btn-all{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height: 60px;
    margin-top:100px;
  }
  .mt-10{
    margin-top: 20px;
  }
</style>

