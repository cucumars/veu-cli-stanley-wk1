<template>

   <div class="btn-all">  
    <!-- 顯示 每一個 按鈕-->
    <component-a v-for="(btn, key) in btnAType" :key="key" 
      :type="btn.type" 
      class="mb-10"
      @click="click_fun(btn.to)"
    >{{ btn.content }}</component-a>
  </div>

  <div class="data-area-all">
    <!-- 展示每一張卡片 -->
    <card-show v-for="(detail, index) in cards"  :key="index" 
      :detail="detail"
    />
  </div>
</template>

<script>
  import ComponentA from "@/components/ComponentBtnA.vue";
  import CardShow from "@/components/CardShow.vue";
  export default {
    components: {
      ComponentA,
      CardShow,
    },
    data() {
      return {
        btnAType: [
          { type: 'prev', content: '上一步', to:'/card-create',},
          { type: 'save', content: '存儲', to:this.storeSessionStorage,},
        ],
        // 儲存從LocalStorage取回之暫存資料
        cards: [],
      }
    },
    // 一進入此頁便開始執行
    mounted() {
      //重新取回LocalStorage之暫存資料
      this.reloadLocalStorage(); 
    },
    methods: {
      // mounted 方法區
      // 重新取回LocalStorage之暫存資料
      reloadLocalStorage(){
        let data = JSON.parse(localStorage.getItem('data'));
        this.cards = [...data];
        // 原寫法
        // data.forEach((item) => {
        //   this.cards.push(item);
        // }); 
      },
      // 一般方法區
      // 判斷是否為 function， 是則呼叫 function，
      // 判斷是否為 網址，是則建立 router link
      click_fun: function(fun_href){ //判斷call function 或 call router
          typeof(fun_href) === 'function' ? fun_href() : 
          (fun_href ? this.$router.push(`${fun_href}`) : this.clickAlert(fun_href));
      },
      clickAlert:function() {
        alert('此處程序尚未設置，請聯絡相關單位！');
      },
      // 儲存到SessionStorage
      storeSessionStorage() { 
        sessionStorage.setItem('data', JSON.stringify(this.cards));
        localStorage.removeItem('data');
        // 回到首頁
        this.$router.push('/main');
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
  }
  .data-area-all {
    overflow:auto;
    display: grid;
    gap: 20px;
    padding: 50px;
    margin: auto;
    grid-template-columns: calc(25% - 15px) calc(25% - 15px) calc(25% - 15px) calc(25% - 15px) ;
    @media (max-width: 1199px) {
      grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    }
    @media (max-width: 767px) {
      grid-template-columns: 100%;
    }
  }
</style>