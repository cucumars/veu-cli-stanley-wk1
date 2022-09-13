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
    <div class="data-area-all">
    <card-show v-for="(detail, index) in cards"  :key="index" 
      :detail="detail"
    />
  </div>
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
          { type: 'prev', content: '上一步', to:'/card-show',},
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
      // 判斷是否為 function， 是則呼叫 function，
      // 判斷是否為 網址， 是則建立 router link
      click_fun: function(fun_href){ //判斷call function 或 call router
          typeof(fun_href) === 'function' ? fun_href() : 
          (fun_href ? this.$router.push(`${fun_href}`) : this.clickAlert(fun_href));
      },
      clickAlert:function() {
        alert("此處程序尚未設置，請聯絡相關單位！");
      },
      //重新取回LocalStorage之暫存資料
      reloadLocalStorage(){
        let data = JSON.parse(localStorage.getItem("data"));
        data.forEach((item) => {
          this.cards.push(item);
        });
      }
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
</style>