<template>
	<div class="orderList">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item>订单列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="listBox" style="padding: 10px;">
			<div>
				<b-row>
					<b-col md="3" class="se_box">
						<label>起始时间:</label>
						<el-date-picker v-model="value1" type="datetime" placeholder="选择起始时间">
						</el-date-picker>
					</b-col>
					<b-col md="3" class="se_box">
						<label>结束时间:</label>
						<el-date-picker v-model="value2" type="datetime" placeholder="选择结束时间">
						</el-date-picker>
					</b-col>

					<b-col md="2" style="position: relative;">
						<b-button variant="primary" @click="filtrate">筛选</b-button>
					</b-col>
				</b-row>
			</div>
			<b-table :fields="fields" :items="list">
				<template slot="details" slot-scope="data">
					<b-button size="sm" variant="primary" @click="details(data.value)">详情</b-button>
				</template>
			</b-table>
			<el-pagination background layout="prev, pager, next" :current-page.sync="currentPage1" :page-size="pageSize" :total="pageCont"  @current-change="currentChange" style="text-align: right;">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderList',
		data() {
			return {
				value1: '',
				value2: '',
				fields: [{
						key: 'orderNum',
						label: '订单号'
					},
					{
						key: 'paymentState',
						label: '是否支付'
					},
					{
						key: 'createTime',
						label: '创建时间'
					},
					{	
						key:'totalNum',
						label:'数量'
					},
					{
						key:'totalPrice',
						label:'价格'
					},
					{
						key: 'details',
						label: '操作'
					}
				],
				list: [],
				currentPage1:1,
				pageCont: 0,
				pageIndex: 1,
				pageSize: 10,
			}
		},
		created() {
			let ts = this;
			let returnPage=sessionStorage.getItem("returnPageIndex");
			if(returnPage=="null"||returnPage==null||returnPage==undefined){
				ts.pageIndex=1; 
			}else{
				ts.pageIndex=returnPage;
			}
			ts.initialize(ts);
		},
		methods: {
			/*筛选函数*/
			filtrate() {
				let ts = this;
				ts.pageIndex=1;
				ts.$options.methods.initialize(ts,ts.pageIndex);
			},
			/*列表函数*/
			initialize(_self) {
				let startTime = _self.$options.methods.getDates(_self.value1);//起始时间
				let endTime = _self.$options.methods.getDates(_self.value2);//结束时间
				let url = '/order/getAllOrderList'; //接口
				let data = _self.$qs.stringify({
					startTime: startTime,
					endTime: endTime,
					pageIndex: _self.pageIndex,
					pageSize: _self.pageSize
				});
				_self.$axios.post(url, data).then(res => {
					let msg=res.data;
					_self.pageCont=msg.count;	//列表总条数
					_self.currentPage1=Number(_self.pageIndex)	//当前页数高亮,一定要数字类型否则会报错提示
					//添加列表数据
					let orderList=msg.list;
					let temArr=[];	
					orderList.forEach(item=>{
						temArr.push({
							orderNum:item.id,
							paymentState:item.paymentState,
							createTime:item.createTime,
							totalNum:item.totalNum,
							totalPrice:item.totalPrice,
							details:item.id
						})
					});
					_self.list=temArr
					//清除分页记录
					sessionStorage.removeItem("returnPageIndex");
				}, err => {
					console.log(err);
				})
			},
			/*获取起始、结束时间*/
			getDates(dates) {
				if(dates == "" || dates == null) {
					return	null;
				} else {
					let year = dates.getFullYear(),
						month = dates.getMonth() + 1 >= 10 ? dates.getMonth() + 1 : '0' + (dates.getMonth() + 1),
						myDate = dates.getDate(),
						hours = dates.getHours(),
						minutes = dates.getMinutes(),
						seconds = dates.getSeconds();
					return year + '-' + month + '-' + myDate + ' ' + hours + ':' + minutes + ':' + seconds;
				}
			},
			/*分页*/
			currentChange(e) {
				let ts=this;
				ts.pageIndex=e;
				ts.$options.methods.initialize(ts) 
			},
			/*详情*/
			details(d){
				let ts=this;
				var id = window.btoa(d) //编码
				ts.$router.push({
						name:'orderDetails',
						query:{
							order:id
						}
					});
				//缓存跳转时当前页数	
				sessionStorage.setItem("returnPageIndex",ts.pageIndex);
			}
		}
	}
</script>

<style scope>
	.row {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
	
	table {
		margin-top: 5px;
	}
</style>