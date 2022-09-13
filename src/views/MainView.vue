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
        { type: 'record', content: '紀錄', to: this.showSessionStorage },
        { type: 'export', content: '匯出', to: this.downloadSessionStorageToTextFile, },
        { type: 'next', content: '開始填寫', to: this.startToCreate, },
      ],
      cards: [],
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
    // 開始填寫
    startToCreate() {
      this.$router.push('/card-create'); 
    },
    // 展示紀錄
    showSessionStorage() {
      let data = JSON.parse(sessionStorage.getItem('data')); 
      console.log('data=>',data);
      if (data) {
        this.cards = [...data];
        // 原寫法
        // data.forEach((item) => this.cards.push(item));
        let recordSession = JSON.stringify(this.cards);
        alert(recordSession);
      }else{
        alert('目前並無任何紀錄！')
      }
    },
    //匯出SessionStorage資料下載成文字檔
    downloadSessionStorageToTextFile() {
      if (this.cards.length != 0) {
        const content = JSON.stringify(this.cards);
        const fileName = "SessionRecord.csv"; //匯出的檔名
        const data = content;
        const blob = new Blob([data], {
          type: "application/octet-stream",
        });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = href;
        link.download = fileName;
        link.click();
      }else{
        alert('目前並無任何紀錄可供匯出！');
      }
    },
  },
  downloadSessionStorageToTextFile_Ch_Tw(){
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

