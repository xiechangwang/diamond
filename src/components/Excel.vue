<template>
	<div class="excels">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item>Excel导入信息</el-breadcrumb-item>
		</el-breadcrumb>
		 <form @submit.prevent="submit" method="post" enctype="multipart/form-data" action="">
			<b-row>
		        <b-col md='3' sm='4'>
		        	<b-form-file state="Boolean" placeholder="选择上传文件"
						@change="importfxx(this)"
						accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
						name="excel"
						></b-form-file>	
		        </b-col>
		        <b-col><!--<b-button type="submit" variant='primary'>上传</b-button>-->
		        	<input type="submit" value="提交" class="btn btn-primary" />
		        </b-col>
	   		</b-row>
		</form>
		<div class="showTable">
			<b-table hover :items="tdArr"></b-table>
		</div>	
	</div>
</template>

<script>
	export default{
		name:'excels',
		data(){
			return{
				tdArr: []
			}
		},
		methods: {
			importfxx(obj) {
				let _this = this;
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据

				this.file = event.currentTarget.files[0];

				var rABS = false; //是否将文件读取为二进制字符串
				var f = this.file;

				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {
				FileReader.prototype.readAsBinaryString = function(f) {
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串
					var pt = this;
					var wb; //读取完成的数据
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for(var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						var XLSX = require("xlsx");
						if(rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), {
								//手动转化
								type: "base64"
							});
						} else {
							wb = XLSX.read(binary, {
								type: "binary"
							});
						}
						outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
						let keyVal=Object.keys(outdata[0]);	//获取表头key值
						_this.thArr=keyVal;								
						_this.tdArr=outdata;
						
					};
					reader.readAsArrayBuffer(f);
				};
				if(rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}
			},
			submit (evt) {
				let formData=new FormData(evt.target)
				this.$axios.post('/diamond/importDiamondExcel',formData).then(res=>{
					if(res.data.code=="OK"){
						this.$message({
							type: 'success',
							message: '上传成功!'
						});
						setTimeout(()=>{
//							window.location.reload();
							this.tdArr=[];
						},600)
					}
				},err=>{
					alert("上传失败")
				})
    		}
		}
		
	}
</script>

<style scoped>
.showTable{
	margin-top: 10px;
	width: 90%;
	height: 100%;
	overflow-y: visible;
}
.row{
	margin-left: 0 !important;
	margin-right: 0 !important;
}
</style>