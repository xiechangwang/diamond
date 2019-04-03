<template>
	<div class="zsList">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item>钻石信息</el-breadcrumb-item>
		</el-breadcrumb>
		 
  		
		<div style="padding: 10px;">
			<div>
				<b-row>
					<b-col md="2" class="se_box">
						<label>价格:</label>
						<b-form-select v-model="sele_prices" :options="prices" :value="sele_prices" class="allSelect" size="sm" />
					</b-col>
					<b-col md="2" class="se_box">
						<label>钻重:</label>
						<b-form-select v-model="sele_weights" :options="weights" :value="sele_weights" class="allSelect" size="sm" />
					</b-col>
					<b-col md="2" class="se_box">
						<label>颜色:</label>
						<b-form-select v-model="sele_colors" :options="colors" :value="sele_colors" class="allSelect" size="sm" />
					</b-col>
					<b-col md="2" class="se_box">
						<label>净度:</label>
						<b-form-select v-model="sele_neatness" :options="neatness" :value="sele_neatness" class="allSelect" size="sm" />
					</b-col>
					<b-col md="2" style="position: relative;">
						<b-button variant="primary" size="sm" @click="filtrate">筛选</b-button>
						<p v-b-toggle.collapse1 style="position: absolute;left:100px;top:calc(50% - 25%);font-size: 12px;color: #9a9a9a;cursor: pointer;background: #eee;border-radius: 5px;padding: 3px 3px 3px 4px;">展开筛选项<img src="../assets/img/qiehuan.png" width="18" /></p>
					</b-col>
					<b-col md="2" style="text-align: center;">
						<b-button variant="danger" size="sm" @click="batchDelete">批量删除</b-button>
						<b-button variant="success" size="sm" @click="batchUp">批量上架</b-button>
						<b-button variant="warning" size="sm" @click="batchDown">批量下架</b-button>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<b-collapse id="collapse1" class="mt-2">
							<b-card style="padding: 10px;margin-bottom: 5px;background: #efefef;">
								<b-row>
									<b-col md="2" class="se_box">
										<label>切工:</label>
										<b-form-select v-model="sele_cutGrade" :options="cut_grade" :value="sele_cutGrade" class="allSelect" size="sm" />
									</b-col>
									<b-col md="2" class="se_box">
										<label>类型:</label>
										<b-form-select v-model="sele_types" :options="types" :value="sele_types" class="allSelect" size="sm" />
									</b-col>
									<b-col md="2" class="se_box">
										<label>形状:</label>
										<b-form-select v-model="sele_shapes" :options="shapes" :value="sele_shapes" class="allSelect" size="sm" />
									</b-col>
									<b-col md="2" class="se_box">
										<label>证书:</label>
										<b-form-select v-model="sele_certificate" :options="certificate" :value="sele_certificate" class="allSelect" size="sm" />
									</b-col>
									<b-col md="2" class="se_box">
										<label>所在地:</label>
										<b-form-select v-model="sele_location" :options="location" :value="sele_location" class="allSelect" size="sm" />
									</b-col>

								</b-row>
								<b-row>
									<b-col md="2" class="se_box">
										<label>是否上架:</label>
										<b-form-select v-model="sele_onlineState" :options="onlineState" :value="sele_onlineState" class="allSelect" size="sm" />
									</b-col>
									<b-col md="3" class="se_box">
										<label style="width: 100px;">启用或删除:</label>
										<b-form-select v-model="sele_enableds" :options="enableds" :value="sele_enableds" class="allSelect" size="sm" />
									</b-col>
									<b-col md="3" class="se_box">
										<label>到货天数:</label>
										<b-form-input v-model="sele_days" type="number" placeholder="输入到货天数" class="allSelect" size="sm"></b-form-input>
									</b-col>
								</b-row>

							</b-card>
						</b-collapse>
					</b-col>

				</b-row>
			</div>
			<b-table :fields="fields" :items="list" class="_table">
				<template slot="check" slot-scope="data">
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(checkedCities,$event)">
						<el-checkbox :label="data.value" :key="data.value" class="checkLabel"></el-checkbox>
					</el-checkbox-group>
				</template>
				<img slot="icons" slot-scope="data" :src="data.value" width="50" />
				<!-- A virtual column -->
				<template slot="diamondId" slot-scope="data">
					<b-button size="sm" variant="primary" @click="updataDiamond(data.value)">修改</b-button>
					<b-button size="sm" variant="danger" :diamondId="data.value" @click="deleteActivity(data.value,data.index)">删除</b-button>
				</template>
			</b-table>
			<el-pagination background layout="prev, pager, next" :total="pageCont" @current-change="currentPage" style="text-align: right;">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	export default {
		name: 'zsList',
		data() {
			return {
				fields: [{
						key: 'check',
						label: '选择'

					}, {
						key: 'enabled',
						label: '启用/删除'
					}, {
						key: 'onlineState',
						label: '上架/下架'
					}, {
						key: 'icons',
						label: '图片'
					},
					{
						key: 'weight	',
						label: '钻重'
					},
					{
						key: 'color',
						label: '颜色'
					},
					{
						key: 'neatness	',
						label: '净度'
					},
					{
						key: 'cutGrade',
						label: '切工'
					},
					{
						key: 'price',
						label: '价格'
					},
					{
						key: 'diamondId',
						label: '操作'
					}

				],
				list: [{
					icons: "null",
					weight: "null",
					color: "null",
					neatness: "null",
					cutGrade: "null",
					price: "null"
				}],
				pageCont: 15,
				pageIndex: 1,
				pageSize: 9,
				//筛选
				sele_prices: null,
				prices: [{
						value: null,
						text: "选择价格"
					},
					{
						value: "0-10000",
						text: "0-10000元"
					},
					{
						value: "10000-20000",
						text: "10000-20000元"
					},
					{
						value: "20000-30000",
						text: "20000-30000元"
					},
					{
						value: "30000-40000",
						text: "30000-40000元"
					},
					{
						value: "40000-50000",
						text: "40000-50000元"
					},
					{
						value: "50000-5000000",
						text: "50000元以上"
					}
				],
				sele_weights: null,
				weights: [{
						value: null,
						text: "选择钻重"
					},
					{
						value: "0.30-0.39",
						text: "0.30-0.39ct"
					},
					{
						value: "0.40-0.49",
						text: "0.40-0.49ct"
					},
					{
						value: "0.50-0.59",
						text: "0.50-0.59ct"
					},
					{
						value: "0.60-0.69",
						text: "0.60-0.69ct"
					},
					{
						value: "0.70-0.79",
						text: "0.70-0.79ct"
					},
					{
						value: "0.80-0.99",
						text: "0.80-0.99ct"
					},
					{
						value: "1.00-1.19",
						text: "1.00-1.19ct"
					},
					{
						value: "1.20-1.99",
						text: "1.20-1.99ct"
					},
					{
						value: "2.00-10",
						text: "2.00ct以上"
					}
				],
				sele_colors: null,
				colors: [{
						value: null,
						text: "选择颜色"
					},
					{
						value: "D",
						text: "D色"
					},
					{
						value: "E",
						text: "E色"
					},
					{
						value: "F",
						text: "F色"
					},
					{
						value: "G",
						text: "G色"
					},
					{
						value: "H",
						text: "H色"
					},
					{
						value: "I",
						text: "I色"
					}
				],
				sele_neatness: null,
				neatness: [{
						value: null,
						text: "选择净度"
					},
					{
						value: "FL",
						text: "FL"
					},
					{
						value: "IF",
						text: "IF"
					},
					{
						value: "VVS1",
						text: "VVS1"
					},
					{
						value: "VVS2",
						text: "VVS2"
					},
					{
						value: "VS1",
						text: "VS1"
					},
					{
						value: "VS2",
						text: "VS2"
					},
					{
						value: "SI1",
						text: "SI1"
					},
					{
						value: "SI2",
						text: "SI2"
					}
				],
				sele_cutGrade: null,
				cut_grade: [{
						value: null,
						text: "选择切工"
					},
					{
						value: "Ideal",
						text: "Ideal"
					},
					{
						value: "EX",
						text: "EX"
					},
					{
						value: "VG",
						text: "VG"
					},
					{
						value: "GD",
						text: "GD"
					}
				],
				sele_types: null,
				types: [{
						value: null,
						text: "选择类型"
					},
					{
						value: "glo",
						text: "全球钻"
					}, {
						value: "pre",
						text: "现选钻"
					}
				],
				sele_shapes: null,
				shapes: [{
						value: null,
						text: "选择形状"
					}, {
						value: "圆形",
						text: "圆形"
					},
					{
						value: "公主方",
						text: "公主方"
					},
					{
						value: "祖母绿",
						text: "祖母绿"
					},
					{
						value: "橄榄形",
						text: "橄榄形"
					},
					{
						value: "椭圆形",
						text: "椭圆形"
					},
					{
						value: "雷地恩",
						text: "雷地恩"
					},
					{
						value: "心心相印",
						text: "心心相印"
					},
					{
						value: "梨形",
						text: "梨形"
					},
					{
						value: "三角形",
						text: "三角形"
					}, {
						value: "火焰玫瑰",
						text: "火焰玫瑰"
					}
				],
				sele_onlineState: null,
				onlineState: [{
					value: null,
					text: "选择是否上架"
				}, {
					value: "1",
					text: "是"
				}, {
					value: "0",
					text: "否"
				}],
				sele_enableds: null,
				enableds: [{
					value: null,
					text: "选择启用或删除"
				}, {
					value: "1",
					text: "启用"
				}, {
					value: "0",
					text: "删除"
				}],
				sele_certificate: null,
				certificate: [{
						value: null,
						text: "选择证书"
					},
					{
						value: "gia",
						text: "gia"
					}, {
						value: "ags",
						text: "ags"
					}
				],
				sele_location: null,
				location: [{
						value: null,
						text: "选择所在地"
					},
					{
						value: "china",
						text: "国内"
					}, {
						value: "foreign",
						text: "国外"
					}
				],
				sele_days: "",
				checkedCities: [],
				selectedItem: ''

			}
		},
		created() {
			let ts = this;
			//初始化列表
			ts.initialize(ts, ts.pageIndex, ts.pageSize);
		},
		methods: {
			//获取选中的id
			handleCheckedCitiesChange(value, e) {
				let valArr = value;
				this.selectedItem = '';
				valArr.forEach(item => {
					this.selectedItem += item + ',';
				})
			},
			//批量删除
			batchDelete() {
				let ts = this,
					select_item = ts.selectedItem;
				select_item = select_item.substr(0, select_item.length - 1);
				ts.$options.methods.batchOperation(ts, select_item, 'delete')
			},
			//批量上架
			batchUp() {
				let ts = this,
					select_item = ts.selectedItem;
				select_item = select_item.substr(0, select_item.length - 1);
				ts.$options.methods.batchOperation(ts, select_item, 'up')
			},
			//批量下架
			batchDown() {
				let ts = this,
					select_item = ts.selectedItem;
				select_item = select_item.substr(0, select_item.length - 1);
				ts.$options.methods.batchOperation(ts, select_item, 'down')
			},
			//删除
			deleteActivity(d_id, i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$options.methods.deletdDiamdond(this, d_id, i);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//修改
			updataDiamond(up_id) {
				let _self = this;
				var id = window.btoa(up_id) //编码
				_self.$router.push({
					name: 'updataDiamond',
					query: {
						diamond: id
					}
				});
			},
			//分页函数
			currentPage(e) {
				let ts = this;
				ts.pageIndex = e;
				ts.$options.methods.initialize(ts, ts.pageIndex, ts.pageSize);
			},
			//列表渲染
			initialize(ts, pageI, pageS) {
				let datas = ts.$qs.stringify({
					type: ts.sele_types,
					price: ts.sele_prices,
					weight: ts.sele_weights,
					color: ts.sele_colors,
					neatness: ts.sele_neatness,
					cutGrade: ts.sele_cutGrade,
					shape: ts.sele_shapes,
					lab: ts.sele_certificate,
					location: ts.sele_location,
					arriveDays: ts.sele_days,
					onlineState: ts.sele_onlineState,
					enabled: ts.sele_enableds,
					pageIndex: pageI,
					pageSize: pageS
				});
				ts.$axios.post('/diamond/getDiamondListForPC', datas).then(res => {
					let msg = res.data;
					ts.pageCont = msg.count;
					//添加列表数据
					let ZSList = msg.list;
					let arr = [],
						chackArr = [];
					let num = 0;
					ZSList.forEach(item => {
						let enabledTit = item.enabled == "0" ? '删除' : '启用';
						let onlineStateTit = item.onlineState == "0" ? "下架" : "上架";
						arr.push({
							icons: require("../assets/img/1.jpg"),
							weight: item.weight,
							color: item.color,
							neatness: item.neatness,
							cutGrade: item.cutGrade,
							price: item.price,
							diamondId: item.id,
							check: item.id,
							enabled: enabledTit,
							onlineState: onlineStateTit

						});
					})
					ts.list = arr;
				}, err => {
					console.log(err);
				})
			},
			//删除函数
			deletdDiamdond(_self, d_id, i) {
				let deleteUrl = '/diamond/deleteDiamond';
				let delete_data = _self.$qs.stringify({
					diamondId: d_id //钻石id
				})
				//删除请求	
				_self.$axios.post(deleteUrl, delete_data).then(res => {
					let msg = res.data;
					if(res.status == 200) {
						if(msg.code == "OK") {
							_self.list.splice(i, 1)
							//弹窗
							_self.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					}
				}, err => {
					console.log(err);
				})
			},
			//筛选列表
			filtrate() {
				let that = this;
				let datas = that.$qs.stringify({
					type: that.sele_types,
					price: that.sele_prices,
					weight: that.sele_weights,
					color: that.sele_colors,
					neatness: that.sele_neatness,
					cutGrade: that.sele_cutGrade,
					shape: that.sele_shapes,
					lab: that.sele_certificate,
					location: that.sele_location,
					arriveDays: that.sele_days,
					onlineState: that.sele_onlineState,
					enabled: that.sele_enableds,
					pageIndex: 1,
					pageSize: that.pageSize
				});
				let url = "/diamond/getDiamondListForPC";
				that.$axios.post(url, datas).then(res => {
					let msg = res.data;
					that.pageCont = msg.count;
					//添加列表数据
					let ZSList = msg.list;
					let arr = [];
					ZSList.forEach(item => {
						arr.push({
							icons: require("../assets/img/1.jpg"),
							weight: item.weight,
							color: item.color,
							neatness: item.neatness,
							cutGrade: item.cutGrade,
							price: item.price,
							diamondId: item.id
						})
					})
					that.list = arr;
				}, err => {
					console.log(err);
				})
			},
			//批量操作；删除、上架、下架
			batchOperation(_self, deleteId, f) {
				let dFUrl = "/diamond/deleteDiamondList";
				let datas = _self.$qs.stringify({
					flag: f, //delete-批量删除按钮，up-批量上架，down-批量下架
					diamondIds: deleteId //选中的钻石主键id
				});
				let f_name = "";
				switch(f) {
					case 'delete':
						f_name = "批量删除成功"
						break;
					case 'up':
						f_name = "批量上架成功"
						break;
					default:
						f_name = '批量下架成功'

				}
				_self.$axios.post(dFUrl, datas).then(res => {
					let msg = res.data;
					if(msg.code == 'OK') {
						_self.$message({
							type: 'success',
							message: f_name,
							duration: '2000'
						})
						setTimeout(function() {
							_self.$options.methods.initialize(_self, 1, _self.pageSize);
						}, 2000)
					} else {
						_self.$message({
							type: 'error',
							message: "操作失败",
							duration: '2000'
						})
					}
				}, err => {
					console.log(res);
				});
			}
		}
	}
</script>
<style scoped>
	.se_box {
		padding: 0 8px !important;
		margin-bottom: 0px;
	}
	
	label {
		/*width: 70px;*/
		text-align: right;
		display: inline-block;
	}
	
	.allSelect {
		display: inline-block;
		width: auto;
	}
	
	.row {
		margin-left: 0;
		margin-right: 0;
	}
	
	.card-body {
		padding: 0 !important;
	}

</style>
<!--以下是修改ui框架的自带样式-->
<style>
	.el-checkbox__label {
		display: none !important;
	}
	
	.table th,
	.table td {
		vertical-align: middle !important;
		padding: 0.6rem !important;
	}
	
	.checkLabel {
		text-align: left !important;
	}
</style>