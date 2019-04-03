<template>
	<div class="addZS">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item>新增钻石信息</el-breadcrumb-item>
		</el-breadcrumb>
		<b-form inline style="padding: 10px;" @submit.prevent="submit" method="post" enctype="multipart/form-data" action="">
			<b-row>
				<b-col md="9" class="inp_box ">
					<label>钻石主图:</label>
					<p v-for="(item,index) in imgSrcArr" class="fileBox">
						<b-form-file plain name="product" placeholder="选择上传图片" @change="changeImage($event,index)" style="width: 100%;display: inline-block;"></b-form-file>
						<img :src="item.src" width="100%" />
					</p>
				</b-col>
				<b-col md="3" class="inp_box ">
					<label>证书：</label>
					<p class="fileBox">
						<b-form-file plain name="cert" placeholder="选择上传图片" @change="changeImageZS" style="width: 50%;display: inline-block;"></b-form-file>
						<img :src="ZSurl" width="100%" />
					</p>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石类型:</label>
					<b-form-select v-model="selected" :value="selected" :options="options" class="mb-3" />
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石价格:</label>
					<b-form-input v-model='inpTxt.price' type="number"></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻重:</label>
					<b-form-input v-model='inpTxt.weight'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石颜色:</label>
					<b-form-input v-model='inpTxt.color'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石净度:</label>
					<b-form-input v-model='inpTxt.neatness'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石编号:</label>
					<b-form-input v-model='inpTxt.serial_number'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>对称:</label>
					<b-form-input v-model='inpTxt.symmetry'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>内含物:</label>
					<b-form-input v-model='inpTxt.inclusion'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>底尖:</label>
					<b-form-input v-model='inpTxt.vertex'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>到货天数:</label>
					<b-form-input v-model='inpTxt.arrive_days'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>钻石形状:</label>
					<b-form-input v-model='inpTxt.shape'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>是否上架:</label>
					<b-form-select v-model="sele_online" :value="sele_online" :options="online" class="mb-3" />
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>启用或者删除:</label>
					<b-form-select v-model="sele_enabled" :value="sele_enabled" :options="enabled" class="mb-3" />
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>证书id:</label>
					<b-form-input v-model='inpTxt.certificate'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>所在地:</label>
					<b-form-select v-model="selectedLocation" :value="selectedLocation" :options="location" class="mb-3" />
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>白钻/彩钻:</label>
					<b-form-select v-model="isWhite" :value="isWhite" :options="options_isWhite" class="mb-3" />
				</b-col>

			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>切工等级:</label>
					<b-form-input v-model='inpTxt.cut_grade'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>抛光:</label>
					<b-form-input v-model='inpTxt.polish'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>透明度:</label>
					<b-form-input v-model='inpTxt.clarity'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>availability:</label>
					<b-form-input v-model='inpTxt.availability'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>荧光强度:</label>
					<b-form-input v-model='inpTxt.fluorescence_intensity'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>荧光颜色:</label>
					<b-form-input v-model='inpTxt.fluorescence_color'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>measurements:</label>
					<b-form-input v-model='inpTxt.measurements'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>证书机构:</label>
					<b-form-input v-model='inpTxt.lab'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>证书编码:</label>
					<b-form-input v-model='inpTxt.report'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>treatment:</label>
					<b-form-input v-model='inpTxt.treatment'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>rapnet_price:</label>
					<b-form-input v-model='inpTxt.rapnet_price' type="number"></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>rapnet_discount:</label>
					<b-form-input v-model='inpTxt.rapnet_discount' type="number"></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>cash_price:</label>
					<b-form-input v-model='inpTxt.cash_price' type="number"></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>cash_price_discount:</label>
					<b-form-input v-model='inpTxt.cash_price_discount' type="number"></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>花型颜色:</label>
					<b-form-input v-model='inpTxt.fancy_color'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>饱和度:</label>
					<b-form-input v-model='inpTxt.fancy_color_intensity'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>伴色:</label>
					<b-form-input v-model='inpTxt.fancy_color_overtone'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>depth:</label>
					<b-form-input v-model='inpTxt.depth'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>table:</label>
					<b-form-input v-model='inpTxt.table'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>girdle_thin:</label>
					<b-form-input v-model='inpTxt.girdle_thin'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>girdle_thick:</label>
					<b-form-input v-model='inpTxt.girdle_thick'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>girdle:</label>
					<b-form-input v-model='inpTxt.girdle'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>girdle_condition:</label>
					<b-form-input v-model='inpTxt.girdle_condition'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>culet_size:</label>
					<b-form-input v-model='inpTxt.culet_size'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>culet_condition:</label>
					<b-form-input v-model='inpTxt.culet_condition'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>crown_height:</label>
					<b-form-input v-model='inpTxt.crown_height'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>crown_angle:</label>
					<b-form-input v-model='inpTxt.crown_angle'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>pavilion_depth:</label>
					<b-form-input v-model='inpTxt.pavilion_depth'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>pavilion_angle:</label>
					<b-form-input v-model='inpTxt.pavilion_angle'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>laser_inscription:</label>
					<b-form-input v-model='inpTxt.laser_inscription'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>cert_comment:</label>
					<b-form-input v-model='inpTxt.cert_comment'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>country:</label>
					<b-form-input v-model='inpTxt.country'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>state:</label>
					<b-form-input v-model='inpTxt.state'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>city:</label>
					<b-form-input v-model='inpTxt.city'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>is_matched_pair_separable:</label>
					<b-form-input v-model='inpTxt.is_matched_pair_separable'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>pair_stock:</label>
					<b-form-input v-model='inpTxt.pair_stock'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>allow_rapLink_feed:</label>
					<b-form-input v-model='inpTxt.allow_rapLink_feed'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>parcel_tones:</label>
					<b-form-input v-model='inpTxt.parcel_tones'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>report_filename:</label>
					<b-form-input v-model='inpTxt.report_filename'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>sarine_loupe:</label>
					<b-form-input v-model='inpTxt.sarine_loupe'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>trade_show:</label>
					<b-form-input v-model='inpTxt.trade_show'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>key_to_symbols:</label>
					<b-form-input v-model='inpTxt.key_to_symbols'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>shade:</label>
					<b-form-input v-model='inpTxt.shade'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>star_length:</label>
					<b-form-input v-model='inpTxt.star_length'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>center_inclusion:</label>
					<b-form-input v-model='inpTxt.center_inclusion'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>black_inclusion:</label>
					<b-form-input v-model='inpTxt.black_inclusion'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>milky:</label>
					<b-form-input v-model='inpTxt.milky'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>open_inclusion:</label>
					<b-form-input v-model='inpTxt.open_inclusion'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>member_comment:</label>
					<b-form-input v-model='inpTxt.member_comment'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>report_issue_date:</label>
					<b-form-input v-model='inpTxt.report_issue_date'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>report_type:</label>
					<b-form-input v-model='inpTxt.report_type'></b-form-input>
				</b-col>

				<b-col sm="6" md="3" class="inp_box">
				
					<label>lab_location:</label>
					<b-form-input v-model='inpTxt.lab_location'></b-form-input>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>brand:</label>
					<b-form-input v-model='inpTxt.brand'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>seller_spec:</label>
					<b-form-input v-model='inpTxt.seller_spec'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>eye_lean:</label>
					<b-form-input v-model='inpTxt.eye_lean'></b-form-input>
				</b-col>
				<b-col sm="6" md="3" class="inp_box">
				
					<label>stock:</label>
					<b-form-input v-model='inpTxt.stock'></b-form-input>
				</b-col>
			</b-row>
			<input type="submit" value="提交" class="btn btn-primary" />
		</b-form>
	</div>
</template>
<script>
	export default {
		name: 'addZS',
		data() {
			return {
				inpTxt: {},
				imgSrcArr: [{
					src: require("../assets/img/icon-tjtp.png"),
					id: "null"
				}],
				hide: false,
				show: true,
				ZSurl: require("../assets/img/icon-tjtp.png"),
				selected: null,
				options: [{
						value: null,
						text: '请选择类型'
					}, {
						value: "glo",
						text: '全球钻'
					},
					{
						value: 'pre',
						text: '现选钻'
					}
				],
				selectedLocation: null,
				location: [{
						value: null,
						text: '请选择所在地'
					}, {
						value: "china",
						text: '国内'
					},
					{
						value: 'foreign',
						text: '国外'
					}
				],
				sele_enabled: null,
				enabled: [{
						value: null,
						text: '请选择是否启用'
					}, {
						value: "1",
						text: '启用'
					},
					{
						value: '0',
						text: '删除'
					}
				],
				sele_online: null,
				online: [{
						value: null,
						text: '请选择是否上架'
					}, {
						value: "1",
						text: '上架'
					},
					{
						value: '0',
						text: '不上架'
					}
				],
				isWhite: null,
				options_isWhite: [{
						value: null,
						text: '请选择白钻或彩钻'
					},
					{
						value: 'white',
						text: '白钻'
					},
					{
						value: 'colour',
						text: '彩钻'
					}
				]

			}
		},
		created() {

		},
		methods: {
			submit(evt) {
				let ts = this;
				ts.inpTxt.type = this.selected;
				ts.inpTxt.location = this.selectedLocation;
				ts.inpTxt.online_state = this.sele_online;
				ts.inpTxt.enabled = this.sele_enabled;
				ts.inpTxt.isWhite = this.isWhite;

				let fd = new FormData(evt.target);
				let data = JSON.stringify(ts.inpTxt);
				fd.set("diamond", data);
//								console.log(data)
				let url = '/diamond/createDiamond';
				ts.$axios.post(url, fd).then(res => {
					console.log(res);
					let msg = res.data;
					if(msg.code == "OK") {
						ts.$message({
							type: "success",
							message: "新增成功!"
						})
					}
				}, err => {
					console.log(err);
				})
			},

			//上传图片
			changeImage(e, index) {
				let file = e.target.files[0];
				if(file) {
					this.file = file
					let reader = new FileReader()
					let that = this
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 这里的this 指向reader
						if(that.imgSrcArr.length > 4) {
							that.imgSrcArr.splice(that.imgSrcArr.length - 1, 1);
						} else if(that.imgSrcArr[index].id != "null") {
							that.imgSrcArr[index].src = this.result;
						} else {
							that.imgSrcArr.unshift({
								src: this.result,
								id: 0
							});
							console.log(that.imgSrcArr)
						}

					}
				}
			},
			//上传证书
			changeImageZS(e) {
				let file = e.target.files[0];
				if(file) {
					this.file = file
					let reader = new FileReader()
					let that = this
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						that.ZSurl = this.result;

					}
				}
			}

		}
	}
</script>
<style scoped>
	.inp_box {
		display: flex;
		margin: 2px 0;
	}
	
	.inp_box>label {
		width: 120px;
	}
	
	.row {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
		margin-top: 8px;
	}
	
	.btn {
		margin: 15px auto 0 auto;
	}
	
	.fileBox {
		margin-bottom: 0 !important;
		width: 120px;
		height: 152px;
		border: 1px dashed #9c9c9c;
		position: relative;
		margin-right: 18px;
	}
	
	.fileBox>img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;
	}
	
	input[type=file] {
		border: none;
		color: transparent;
		display: inline-block;
		height: 100%;
		opacity: 0;
		width: 100%;
	}
	.mb-3, .my-3{
		margin-bottom: 0 !important;
	}
</style>