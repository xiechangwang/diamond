<template>
	<div class="a_list">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item>活动页</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="listBox">
			<div>
				<b-row>
					<b-col md="3"  class="se_box">
						<label>是否启用:</label>
						<b-form-select v-model="sele_enabled" :options="enableds" :value="sele_enabled" class="allSelect" />
					</b-col>
					<b-col md="3"  class="se_box">
						<label>是否上架:</label>
						<b-form-select v-model="sele_onlineState" :options="onlineState" :value="sele_onlineState" class="allSelect" />
					</b-col>
					<b-col md="2" style="position: relative;">
						<b-button variant="primary" @click="filtrate">筛选</b-button>
					</b-col>
				</b-row>
			</div>
			<b-table :fields="fields" :items="list">
				<template slot="relativeUrl" slot-scope="data">
					<img :src="data.value" width="50" />
				</template>
				<template slot="a_id" slot-scope="data">
					<b-button size="sm" variant="primary" @click="update(data.value)">修改</b-button>
					<b-button size="sm" variant="danger" @click="activity(data.value,data.index)">删除</b-button>
				</template>
			</b-table>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'a_list',
		data() {
			return {
				fields: [{
						key: 'title',
						label: '标题'
					},
					{
						key: 'relativeUrl',
						label: '图片'
					},
					{
						key: 'createTime',
						label: '时间'
					},
					{
						key: 'a_id',
						label: '操作'
					}
				],
				list: [],
				sele_enabled: "1",
				enableds: [{
					value: null,
					text: "选择是否上架"
				}, {
					value: "1",
					text: "是"
				}, {
					value: "0",
					text: "否"
				}],
				sele_onlineState: "1",
				onlineState: [{
					value: null,
					text: "选择启用或删除"
				}, {
					value: "1",
					text: "启用"
				}, {
					value: "0",
					text: "删除"
				}]
			}
		},
		created() {
			let ts = this;
			ts.initialize(ts);
		},
		methods: {
			//删除活动
			activity(e, i) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$options.methods.deleteActivity(e, i, this);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//修改活动
			update(id) {
				let a_id = window.btoa(id) //编码
				this.$router.push({
					name: 'activityUpdate',
					query: {
						activity: a_id
					}
				});
			},
			filtrate() {
				let ts = this;
				ts.$options.methods.initialize(ts)
			},
			initialize(_self) {
				let url = '/activity/getActivityList';
				let datas = _self.$qs.stringify({
					enabled: _self.sele_enabled,
					onlineState: _self.sele_onlineState
				})
				_self.$axios.post(url, datas).then(res => {
					let msg = res.data,
						activityArr = [];
					msg.forEach(item => {
						activityArr.push({
							title: item.title,
							relativeUrl: item.relativeUrl,
							createTime: item.createTime,
							a_id: item.id
						});
					});
					_self.list = activityArr;
				}, err => {
					console.log(err);
				})
			},
			deleteActivity(e, i, _this) {
				let d_url = "/activity/deleteActivity",
					datas = _this.$qs.stringify({
						activityId: e
					})
				_this.$axios.post(d_url, datas).then(res => {
					let msg = res.data;
					if(msg.code == "OK") {
						//弹窗
						_this.$message({
							type: 'success',
							message: '删除成功!'
						});
						_this.list.splice(i, 1);
					}
					console.log(msg)
				}, err => {

				})
			}
		}
	}
</script>
<style scoped>
	.listBox {
		padding: 10px;
	}
	
	.se_box {
		padding: 0 8px !important;
		margin-bottom: 10px;
	}
	
	.se_box label {
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
</style>