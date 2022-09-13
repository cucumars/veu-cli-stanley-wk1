<template>
	<!-- {{ detailNow }}{{clickNext }} -->
  <div class="detail-area">
		<span class="close_x" @click="deleteDetail">x</span> 
    <div class="area-up-left">
			<div class="single-line">
        <component-b :btn="btnBType[0]"
					class="btn-b"
					@updateStopService="updateStopService"/>
			</div>
			<div class="single-line">
				<label>姓名: 
					<input  type="text"  required
						v-model="detailNow.name"   
						class="my-name"
            :class="{ required: !detailNow.name && clickNext }"
					/>
				</label>
			</div>
			<div class="single-line">
					<span>性別:</span>
					<span :class="{ required: !detailNow.gender && clickNext }">
						<label><input type="radio" required value="男" v-model="detailNow.gender">&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;</label>
						<label><input type="radio" required value="女" v-model="detailNow.gender">&nbsp;女&nbsp;&nbsp;&nbsp;&nbsp;</label>
					</span>
			</div>	
			<div class="single-line">
        <label>生日: 
          <input type="date" required 
            v-model="detailNow.birthday"
						:class="{ required: !detailNow.birthday && clickNext }"
          >
        </label>
      </div>
			<div class="single-line">
				<label >身份證字號: 
					<input type="text" required 
						v-model="detailNow.idCode"
						class="id-code" 
						:class="{ required: !detailNow.idCode && idCheck && clickNext }"
						@change="idCheck"
					>			
				</label> 
			</div> 
		</div>

		<div class="area-up-right">
			<label class="file-upload" 
				:class="{ required: !detailNow.image && clickNext }">
				<span v-if="!detailNow.image">點擊放入背景照</span>
				<!-- v-on 觸發事件時，如果沒有指定參數，預設就會將 event 物件當作參數傳入： -->
				<!-- 如果在 methods 需要傳入參數的情況，則可以在模板中指定傳入 $event 來指定 event 物件： -->
				<input type="file" @change="onFileChange" />
				<img v-if="detailNow.image" :src="detailNow.image" alt="背景照" required>
			</label>
		</div>

		<div class="area-down">
			<div class="single-line"> 
				<label> 
					地址:
					<select  required
						v-model="detailNow.city"
						:class="{ required: !detailNow.city && clickNext }"
					>
						<option 
              v-for="(city, index) in cities"
              :key="index"
              :value="city">
							{{ city }}
						</option>
					</select>
					&nbsp;
					<input class="address" type="text" placeholder="詳細地址" required
            v-model="detailNow.address"
            :class="{ required: !detailNow.address && clickNext }"
          > 
				</label> 
			</div>
			<div class="single-line">
        <label>連絡電話: 
          <input type="text"
            v-model="detailNow.phone"
            required
            :class="{ required: !detailNow.phone && clickNext }"
          >
        </label> 
      </div>
			<div class="single-line  btn-b-flex">
				<component-b :btn="btnBType[1]" :btnIndex="1"
					class="btn-b"
					:class="{ required: !detailNow.textNumber1 && clickNext }"
					@updateTextNumber1="updateTextNumber1"
				/>&nbsp; &nbsp;
				<input :type="textNumberType1"
					v-model="detailNow.textNumber1"
					class="b-input"
				/>
			</div>
			<div class="single-line btn-b-flex">
        <component-b :btn="btnBType[2]" :btnIndex="2"
          :class="[ 'btn-b', { required: !detailNow.textNumber2 && clickNext } ]"
          @updateTextNumber2="updateTextNumber2"
        />&nbsp; &nbsp;
				<input :type="textNumberType2"
					v-model="detailNow.textNumber2"
					class="b-input"
				/>
      </div> 
			<div class="single-line contact-time">
        <span>可連絡時間: </span>
				<label>
            <input type="checkbox"  value="0"
              v-model="isTimeAllChecked"
							@change="getTimeAll()"/>
						都可以
        </label>
				<label>
					<input type="checkbox" value="1" v-model="checkedTimes">
					09:00 - 12:00 &nbsp;&nbsp;
				</label>
				<label>
					<input type="checkbox" value="2" v-model="checkedTimes">
					13:00 - 17:00 &nbsp;&nbsp;
				</label>
				<label>
					<input type="checkbox" value="3" v-model="checkedTimes">
					18:00 - 21:00 &nbsp;&nbsp;
				</label>		
			</div>			
		</div>
  </div>
</template>

<script>
  import ComponentB from "@/components/ComponentBtnB.vue";
	export default {
		components: {
			ComponentB,
		},
		// 接收父層的參數資訊
		props: {
			// 卡片的詳細資料
			detail: Object,
			clickNext: Boolean,
		},
		data() {
			return {
				detailNow: this.detail.detail,
        detailId: this.detail.id,
				btnBType: [
						{ type: 'stop-service', state: true,  disabled:false},
						{ type: 'number-text',  state: false, disabled:false},
						{ type: 'number-text',  state: true,  disabled:false},
				],
				cities: [
          "臺北市",
          "新北市",
          "桃園市",
          "臺中市",
          "臺南市",
          "高雄市",
          "新竹縣",
          "苗栗縣",
          "彰化縣",
          "南投縣",
          "雲林縣",
          "嘉義縣",
          "屏東縣",
          "宜蘭縣",
          "花蓮縣",
          "臺東縣",
          "澎湖縣",
          "金門縣",
          "連江縣",
          "基隆市",
          "新竹市",
          "嘉義市",
        ],
				isTimeAllChecked: false,//全部時間都可以
				allTimeArr: ["1", "2", "3"],
				checkedTimes: [], //時間選項填入陣列
				singleCheckedTimes: 3, //單項時間選擇總數
				textNumberType1: '',
				textNumberType2: '',
			}
		},
		watch: {
			//聯絡時間發生改變時
			checkedTimes() {
				// 選三個一定會變成需要選擇都可以
        if (this.checkedTimes.length === this.singleCheckedTimes) {
          this.isTimeAllChecked = true;
          this.detailNow.contactTime = ["0"]
        } else {
          this.detailNow.contactTime = [...this.checkedTimes];
					// 等效寫法
          // this.checkedTimes.forEach((item) =>
          //   this.detailNow.contactTime.push(item)
          // );
          this.isTimeAllChecked = false;
        }
      },
		},
		mounted() {
			// 初始化設定各種按鈕狀態
			this.setFunctionBtnBState();
			// 設定聯絡時間選擇	
			this.setTimeChecked();
		},
		methods:{
			// ===================================
			// mounted使用的方法 放置區
			// ===================================
			setFunctionBtnBState(){
				// 按鈕 B 中止服務
				// 原寫法 => 太多 this.this.detailNow
				// this.detailNow.stop_service.length !== 0 ? 
				// 	this.btnBType[0].state = this.detailNow.stop_service :
				// 		this.detailNow.stop_service=this.btnBType[0].state;
				let detailNow = this.detailNow;
				let btnB = this.btnBType;
				detailNow.stop_service.length !== 0 ? btnB[0].state = detailNow.stop_service : detailNow.stop_service = btnB[0].state;				
				detailNow.state1.length !== 0 ? btnB[1].state = detailNow.state1:	detailNow.state1 =  btnB[1].state;
				detailNow.state2.length !== 0 ? btnB[2].state = detailNow.state2 : detailNow.state2 = btnB[2].state;			
				// 轉換 BtnBType text or number
				this.textNumberType1 = this.checkTextNumberType(btnB[1].state);	
				this.textNumberType2 = this.checkTextNumberType(btnB[2].state);
			},
			//設定聯絡時間選擇
			setTimeChecked() {
        if (this.detailNow.contactTime) {
          if (this.detailNow.contactTime[0] === "0") {
            this.checkedTimes = [...this.allTimeArr];
          }else{
						this.checkedTimes = [...this.detailNow.contactTime];
						// 原寫法
						// this.detailNow.contactTime.forEach((item) => {
						//   this.checkedTimes.push(item);
						// });
					}
        }
      },
			// ===================================
			// 一般使用的方法 放置區
			// ===================================
			idCheck() {
				// 開頭1個英文字母(出生地),第2個1個1or2的數字(性別),其餘八個數字共十碼
        let reg = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/;
        let checkOK = reg.test(this.detailNow.idCode);
        if (!checkOK) {
          // this.detailNow.idCode = "";//不需要空白,只需要提示修改
          alert("身分證字號欄位請正確填寫！");
        } 
        return checkOK;
      },
			// 關於圖片上傳及立即顯示
			// v-on 觸發事件時，如果沒有指定參數，預設就會將 event 物件當作參數傳入：
			// 如果在 methods 需要傳入參數的情況，則可以在模板中指定傳入 $event 來指定 event 物件：
			onFileChange(e) {
				// DataTransfer 對象的 files 屬性是拖動操作中的文件列表。如果操作不包含文件，則列表為空。
				let files = e.target.files || e.dataTransfer.files;
				// 如果沒有上傳檔案(意即選擇取消)，跳出function
				if (!files.length) return;
				// 如果有上傳檔案，執行 function:createImage 讀取上傳圖片及立即顯示
				// 圖片只有一張所以files[0]
				this.createImage(files[0]);
			},
			// 讀取上傳圖片及立即顯示
			createImage(file) {
				//用來讀取file資料的FileReader
				let reader = new FileReader();
				//可以輸入file source並得到一串當下可用的URL，型式為 data:.....，存在FileReader.result中
				reader.readAsDataURL(file);
				//onload當讀取操作成功完成時調用，設定<img>的src
				// 等效寫法: addEventListener('load', (event) => { });
				reader.onload = (e) => {
					this.detailNow.image = e.target.result;
				};
			},
			//聯絡時間:都可以
			getTimeAll() {
        if (this.isTimeAllChecked) {
					// 設置只選
          this.detailNow.contactTime = ["0"];
					// 當勾選都可以時所有其它的聯絡時間自動全部取消勾選
          this.checkedTimes = [...this.allTimeArr];
        } else {
					// 當取消勾選時所有其它的聯絡時間自動全部取消勾選
          this.detailNow.contactTime = [];
					// 當取消勾選時所有其它的聯絡時間自動全部取消勾選
          this.checkedTimes = [];
        }
      },
			// 改變按鈕 B 的輸入型態 type
			checkTextNumberType(btnTypeState) {
        return btnTypeState ? 'text' : 'number';
      },
			// ======================================== 
			// 子層傳回父層的處理方法 放置區
			// ========================================
			// 按鈕 B 中止服務子層傳回父層的處理方法
			updateStopService(state){
				this.detailNow.stop_service = state;
			},
			// 按鈕 B 數字文字子層傳回父層的處理方法
			updateTextNumber1(state){
        this.detailNow.state1 = state;
				this.textNumberType1 = this.checkTextNumberType(state);			
      },
			// 按鈕 B 數字文字子子層傳回父層的處理方法
			updateTextNumber2(state){
        this.detailNow.state2 = state;
				this.textNumberType2 = this.checkTextNumberType(state);		
      },

			// 呼叫父層的處理方法 放置區
			// 刪除 此筆資料 (此張卡片)
			deleteDetail(){
        this.$emit('deleteDetail', this.detailId)
      },
		}
	}
</script>

<style lang="scss" scoped>
  .detail-area{
    position: relative;
    width: 100%;
    border: 1px white solid;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
		.required {
			border: 1px solid red;
		}
    .close_x{
      display: inline-flex;
      background-color: red;
      width:15px;
      height:15px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      position: absolute;
      top:10px;
      right:10px;
      cursor:pointer;
    }
		.single-line{
			height: 30px;
		}	

    .area-up-left{
      width: 60%;
      text-align: left;
      .my-name{
        @media (max-width:575px){
          width:130px;
        }
      }
      .id-code{
        width:90px;
      }
    }

    .area-up-right{
      width: 35%;
      height: 135px;
      text-align: left;
      border: 1px white solid;
      margin-top: 10px;

      .file-upload {
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
        color: #888;
        overflow: hidden;
        display: inline-block;
        &>span{
          position: absolute;
          top: 50%;
          left:50%;
          transform: translate(-50%, -50%);
        }
        &>input {
          width:0;
        }
        &>img {
          width:100%;
          height:100%;
        }
      }
    }
    
    .area-down{
      width: 100%;
      text-align: left;

      .address {
        width: calc(100% - 150px - 32px);
        @media (max-width:1199px){
            width: calc(100% - 150px - 44px);
        }
        @media (max-width:767px){
            width: calc(100% - 150px - 24px);
        }
        @media (max-width:576px){
            width: calc(100% - 150px);
        }
      }
      .contact-time{
        @media (max-width:1199px){
          height:40px;
        }
      }
    }
		.btn-b-flex {
			display: flex;
		}
		.btn-b {
			width:180px;
			height:25px;
		}
		.b-input{				
			width:300px;
			height:25px;
		}
    .btn-input{
      margin-top: 5px;;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }
    select{
      width:100px;
    }
  }
</style>