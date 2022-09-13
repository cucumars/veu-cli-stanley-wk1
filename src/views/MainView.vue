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
          { type: 'export', content: '匯出', to: this.downloadSessionStorageToTextFile_Ch_Tw, },
          // 原來使用
          // { type: 'export', content: '匯出', to: this.downloadSessionStorageToTextFile, },
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
      // 匯出SessionStorage資料下載成文字檔.csv格式
      downloadSessionStorageToTextFile_Ch_Tw(){
        if (this.cards.length !== 0) {
          this.buildDataAndDownloadCSV();
        }else{
          alert('目前並無任何紀錄可供匯出！');
        }
      },
      // 建立csv資料結構並輸出csv檔
      buildDataAndDownloadCSV() {
        // 所有的 key值 資料會存在這
        let csvTitle = `id,${Object.keys(this.cards[0].detail).toString()}\n`;
        csvTitle = csvTitle.replace(',image','');
        console.log('ccc2',csvTitle);
        // 所有的 value 資料會存在這
        let arrayData = [];
        this.cards.forEach((detail) => {
          arrayData.push(detail.id)
          for (let key in detail.detail){
            console.log('xxx', detail.detail);
            if (key === 'contactTime') {
              // let x = detail.detail[key].toString().replace(',',';');
              arrayData.push(`[${detail.detail[key].toString().replace(',',';')}],`);
            }else {
              arrayData.push(`${detail.detail[key]},`);
            }
          }
          arrayData.push("\n");
        })
        // arrayTitle.push("\n");
        // console.log( 'arrayTitle =>', arrayTitle);
        console.log('arrayData =>', arrayData);
        this.downloadCSV(csvTitle, arrayData);
      },
      downloadCSV(csvTitle,arrayData) {
        let csvContent = csvTitle + arrayData.join(''); 
        // console.log(arrayTitle.join(','), arrayData.join(','),csvContent);
        // 下載的檔案名稱
        let fileName = 'SessionRecord下載資料_' + (new Date()).getTime() + '.csv';
        // 建立一個 a，並點擊它
        const link = document.createElement("a");
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
        link.setAttribute('download', fileName);
        link.click();
      },

      // 建立csv資料結構並輸出csv檔
      buildDataAndDownloadCSV2() {
        // 所有的 key值 資料會存在這
        let csvTitle = `id,${Object.keys(this.cards[0].detail).toString()}\n`;
        console.log('ccc',csvTitle);
        // 所有的 value 資料會存在這
        let csvData = '';
        this.cards.forEach((detail) => {
          csvData += `${detail.id},${Object.values(detail.detail).toString()}\n`;
          console.log('ddd',`${detail.id},${Object.values(detail.detail).toString()}\n`);
        })
        this.downloadCSV(csvTitle,csvData);
      },
      // 下載csv檔案
      downloadCSV2(arrayTitle,arrayData) {
        let csvContent = arrayTitle + arrayData; 
        // 下載的檔案名稱
        let fileName = 'SessionRecord下載資料_' + (new Date()).getTime() + '.csv';
        // 建立一個 a，並點擊它
        const link = document.createElement("a");
        // data:text/csv;charset=utf-8,%EF%BB%BF 這段就是讓 CSV 的編碼是 UTF-8 BOM
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
        link.setAttribute('download', fileName);
        link.click();
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
    margin-top:100px;
  }
  .mt-10{
    margin-top: 20px;
  }
</style>

