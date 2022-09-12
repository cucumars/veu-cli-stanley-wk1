<template>
  <div class="detail-area"> 
    <div>ID:<span>{{ detail.id }}</span></div>           
    <div>狀態:
      <span v-if="detailNow.stop_service">服務</span>
      <span v-else>中止</span>
    </div>
    <div>姓名:<span>{{ detailNow.name }}</span></div>
    <div>性別:<span>{{ detailNow.gender }}</span></div>
    <div>生日:<span>{{ detailNow.birthday }}</span></div>
    <div>身分證字號:<span>{{ detailNow.idCode }}</span></div>
    <div>地址:<span>{{ detailNow.city }}{{ detailNow.address }}</span></div>
    <div>電話:<span>{{ detailNow.phone }}</span></div>
    <div>備註1: <span>{{ detailNow.textNumber1 }} </span></div>
    <div>狀態:
      <span v-if="detailNow.state1">文字</span>
      <span v-else>數字</span>
    </div>
    <div>備註2:<span>{{ detailNow.textNumber2 }}</span></div>
    <div>狀態:
        <span v-if="detailNow.state2">文字</span>
        <span v-else>數字</span>
    </div>
    <div class="contact-time">
      可聯絡時間:
      <span v-for="(i, index) in detailNow.contactTime" :key="index">
        <span v-if="i === '0'"> 都可以 </span>
        <span v-if="i === '1'"> 09:00 - 12:00 &nbsp; </span>
        <span v-if="i === '2'"> 13:00 - 17:00 &nbsp; </span>
        <span v-if="i === '3'"> 18:00 - 21:00 &nbsp; </span>
      </span>
    </div>
    <img class="up-img-preview" :src="detailNow.image" alt="" width="100%" />
  </div>
</template>

<script>
  export default {
    
    props: {
      detail: Object,
    },

    data() {
      return {
        detailNow: this.detail.detail,
      }
    }
  }
</script>


<style lang="scss" scoped>
  .detail-area{
    width: calc(100% - 10px);
    // background-color: aliceblue;
    border: 1px solid white;
    margin-right: 20px;
    padding: 10px;
    text-align: left;
    & div {
      line-height: 30px;
    
      & > p {
        display: flex; 

        & > span{
          margin: auto;
        }
      }
    }
    .up-img-preview {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
</style>