<template>
  <div class="btn-all">
    <component-a v-for="(btn, key) in btnAType" :key="key" 
      :type="btn.type" 
      class="mb-10"
      @click="click_fun(btn.to)"
    >{{ btn.content }}</component-a>
  </div>

  <div class="data-area-all">
    <card-create  v-for="detail in cards" :key="detail.id"
      :detail="detail"
      :click-next="clickNext"
      @deleteDetail="deleteDetail"
    /> 
  </div> 
</template>

<script>
import ComponentA from '@/components/ComponentBtnA.vue';
import CardCreate from '@/components/CardCreate.vue';

export default {
  components: {
    ComponentA,
    CardCreate,
  },
  data() {
    return {
      btnAType: [
          { type: 'prev', content: '回到首頁', to: '/main',},
          { type: 'add', content: '新增', to: this.add_unit, },
          { type: 'next', content: '下一步', to: this.next_step,},
        ],
      cards: [], 
      clickNext: false, 
    }
  },
  mounted() {
      // 重新取回LocalStorage之暫存資料並設定置資料結構中
      this.localStoragePreset();
  },
  methods: {
    // 判斷是否為 function， 是則呼叫 function，
    // 判斷是否為 網址， 是則建立 router link
    click_fun: function(fun_href){ //判斷call function 或 call router
        typeof(fun_href) === 'function' ? fun_href() : 
        (fun_href ? this.$router.push(`${fun_href}`) : this.clickAlert(fun_href));
    },
    clickAlert:function() {
      alert('此處程序尚未設置，請聯絡相關單位！');
    },
    //新增一筆資料
    add_unit:function(){
      this.cards.push(
        {
          id: this.getUsedId(),
          detail: {
            stop_service: '',
            name: '',
            gender: '',
            birthday: '',
            idCode: '',
            phone: '',
            state1:'',
            textNumber1:'',
            state2:'',
            textNumber2:'',
            image: '',
            contactTime: [],
            city: '',
            address: '',
          }
        }
      )
    },
    // 取得將要設定的id
    // 沒資料直接取 1,有資料則最後一筆的 id + 1
    getUsedId() { 
      let temp = this.cards;
      let len = temp.length;
      return len > 0 ? (temp[len - 1].id + 1) : 1;
    },
    // 下一步之前檢查資料是否皆填入
    next_step() { 
      if (this.cards.length === 0) {
          return alert("無資料可以儲存資料");
      }
      if (this.checkCardsDetail()) {
        // 暫站存於localStorage
        localStorage.setItem('data', JSON.stringify(this.cards));
        this.$router.push('/card-show');
      }else{
        alert('尚有資料未填寫完整！');
      }
    },
    // 檢查每一筆資料中的每一細項
    checkCardsDetail(){
      this.clickNext = true;
      let cardAll = this.cards;
      for (let i=0; i< cardAll.length; i++){
          if (!this.checkDetail(cardAll[i].detail)) {
            return false;
          }
      }
      return true;
    },
    // 下一步之前檢查每一個個人資料是否皆填入
    checkDetail(detail) {   
      for (let key in detail){
        let item = detail[key];
        if (key === 'contactTime') {
          // 該陣列為空
          if (!item.length) { 
            return false;
          }
        // 該物件中該項目為空
        }else if(!item & item.length === 0) { 
          return false;
        }
      } 
      return true;
    },
    // 重新取回LocalStorage之暫存資料並設定置資料結構中
    localStoragePreset() {
      if (localStorage.getItem("data")) {
        let data = JSON.parse(localStorage.getItem("data"));
        this.cards = [...data];
        // 原寫法
        // data.forEach((item) => {
        //   this.cards.push(item);
        // }); 
        // 依聯絡時間排序取出資料
        this.sortLoadData();
      }
    },
    // 依聯絡時間排序取出之資料
    sortLoadData(){ 
      this.cards.forEach((detail) => {
          detail.detail.contactTime.sort(function (a, b) {
          return a - b;
        });
      });
    },
    // ==========================================================================
    // 子層呼叫父層的處理方法 放置區 必須在父層的Html有相對應的 @name="funcname(parm)"
    // ==========================================================================
    // 刪除該張資料
    deleteDetail(detailId) { 
      let loc = this.cards.findIndex(detail => detail.id == detailId);
      this.cards.splice(loc, 1);
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
    .mb-10{
    margin-top: 20px;
    }
  }
  .data-area-all {
    overflow:auto;
    display: grid;
    gap: 20px;
    padding: 27px;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    @media (max-width: 1199px) {
      padding: 20px 100px ;
      grid-template-columns: 100%;
    }
    @media (max-width: 991px) {
      padding: 20px 50px;;
    }
    @media (max-width: 575px) {
      gap: 10px;
      padding: 20px;
    }

    .btn-all {
      width: 100px;
      height: 23px;
    }
  }

</style>