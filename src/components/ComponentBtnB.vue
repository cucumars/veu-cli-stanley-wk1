<template>
   <!-- {{btn}}<br>{{btn.type}} -->
  <div class="btn-all ">
    <input type="checkbox" v-model="iconType.state"/>
    <div class="btn-button left-off" @click="changeState('left')">{{ iconType.left }}</div>
    <div class="btn-button right-on" @click="changeState('right')">{{ iconType.right }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      btn: Object,
      btnIndex: Number,
    },
    data() {
      return {
          iconBType: {
              'stop-service': {left:'中止', right:'服務', state:this.btn.state, disabled:this.btn.disabled},
              'number-text': {left:'數字', right:'文字', state:this.btn.state, disabled:this.btn.disabled},
            },
          state:false,
      }
    },
    computed: {
      iconType() {
        return this.iconBType[this.btn.type || 'default'];
      },
    },
    watch: {
      btn: {
        deep: true,
        // 代表在watch裡聲明了btn這個方法之後立即先去執行handler方法
        // immediate: true,
        handler: function(btn) {
           this.iconType.state = btn.state
        }
      },
    },
    methods: {
      changeState(btnwhich){
        if (!this.iconType.disabled) {
          // 按服務不切換中止，按中止不                                                                    切換服務
          if ((btnwhich === 'left' && this.iconType.state) || 
            (btnwhich === 'right' && !this.iconType.state)){
            this.iconType.state = !this.iconType.state;
            // 中止服務按鈕狀態傳回父層
            this.btn.type == 'stop-service' ? 
              this.changeStopService(this.iconType.state) :
                this.changeTextNumber(this.iconType.state) ;
              // this.$emit('updateStopService',this.iconType.state) : 
              //   this.btn.type == 'number-text' ? changeTextNumber() : '';
            return this.iconType.state;
          }
        }
      },
      changeStopService(state) {
        this.$emit('updateStopService',state); 
      },
      changeTextNumber(state){
        this.btnIndex === 1 ? this.$emit('updateTextNumber1', state) :
          this.$emit('updateTextNumber2', state);
      },
    }
  }
</script>
<style lang="scss" scoped>
  .btn-all { 
    display: flex;
    width: 100%;
    background-color: grey;
    border-radius: 30px;
    padding: 3px;
    cursor:pointer;

    .btn-button {
      width: 50%;
      height:100%;
      border-radius: 30px;
      display:flex;
      justify-content: center;
      align-items: center;
      transition: 0.3s;
      font-weight: bold;
    }
    
    &.mt-10{
      margin-bottom: 10px;
    }
    
    input{
      display:none;
    }
    input:not(checked) ~ .left-off, input:checked ~ .right-on{
      background-color:rgb(88, 238, 208);
    }

    input:checked ~ .left-off, input:not(checked) ~ .right-on{
      background-color:grey;
    }
  }
</style>