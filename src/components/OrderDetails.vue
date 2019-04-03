<template>
	<div class="orderDetails">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item :to="{ path: '/homeCont/orderList' }">订单列表</el-breadcrumb-item>
			<el-breadcrumb-item>订单详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="detailsCont">
			<div>
				<div class="siteBox">
					<div class="userBox" v-if="isNoAddressId">
						<p>
							<label>客户姓名:</label>
							<span class="u_name">{{userName}}</span>
						</p>
						<p>
							<label>联系电话:</label>
							<span class="phoneNum">{{phone}}</span>
						</p>
					</div>
					<div v-if="isNoAddressId">
						<label>收货地址:</label>
						<span class="siteMsg">{{siteCont}}</span>
					</div>
					<div class="takeBox" v-else="isNoAddressId">
						<ul v-for="take in takeTheir" :class="take.className">
							<li><label>{{take.name}}:</label><span>{{take.nameText}}</span></li>
							<li><label>{{take.phone}}</label><span>{{take.phoneNum}}</span></li>
						</ul>
						<div>
							<label>取货体验中心地址:</label>
							<span class="">{{takeAddress}}</span>
						</div>

					</div>

				</div>
				<div class="orderInformationBox">
					<label>订单信息</label>
					<div class="orderInfo">
						<b-table :fields="fields" :items="list">
							<template slot="orderIcon" slot-scope="data">
								<img :src="data.value" width="50" />
							</template>
						</b-table>
					</div>
					<div class="amountBox">
						<span>订单总额:</span>
						<small class="amountNum">￥{{amount}}</small>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderDetails',
		data() {
			return {
				userName: '',
				phone: '',
				siteCont: '',
				orderId: '',
				amount: '',
				fields: [{
						key: 'orderIcon',
						label: '商品图片'
					}, {
						key: 'order',
						label: '商品信息'
					}, {
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
						key: 'totalNum',
						label: '数量'
					},
					{
						key: 'totalPrice',
						label: '价格'
					}
				],
				list: [],
				isNoAddressId: false,
				takeAddress: '',
				takeTheir: [{
					name: '订货人姓名',
					nameText: '',
					phone: '订货人电话',
					phoneNum: '',
					className: 'orderGoods'
				}, {
					name: '取货人名字',
					nameText: '',
					phone: '取货人电话',
					phoneNum: '',
					className: 'takeGoods'
				}]
			}
		},
		created() {
			let ts = this;
			ts.orderId = window.atob(ts.$route.query.order);
			ts.initialize(ts);
		},
		methods: {
			/*详情渲染*/
			initialize(_self) {
				let url = '/order/getMyOrder';
				let datas = _self.$qs.stringify({
					orderId: _self.orderId
				});
				_self.$axios.post(url, datas).then(res => {
					let msg = res.data;
					//					console.log(msg)
					//判断是自提还是快递
					let takeOrExpress = msg.order.addressId;
					if(takeOrExpress == null || takeOrExpress == "" || takeOrExpress == 'null') { //自提
						_self.isNoAddressId = false
						let myOrder = msg.order;
						_self.takeAddress = myOrder.experienceCenterAddress; //自提地址
						let arrJson = [{
								text: myOrder.orderByName,
								pNum: myOrder.orderByPhone
							},
							{
								text: myOrder.pickerName,
								pNum: myOrder.pickerPhone
							}
						];
						arrJson.forEach(function(item, i) {
							_self.takeTheir[i].nameText = item.text;
							_self.takeTheir[i].phoneNum = item.pNum;
						})

					} else { //快递
						_self.isNoAddressId = true;
						//地址(省市区),客户姓名、电话
						let address = msg.address;
						if(address != null) {
							let site = address.province + address.city + address.district + address.detailAddress
							_self.siteCont = site;
							_self.userName = address.orderName;
							_self.phone = address.receiverMphone;
						}
					}

					//订单详情
					let comDetails = [];
					let orderDetails = msg.order;
					msg.products.forEach(function(item) {
						let detailMsg = item.diamondPojo.diamond;
						let weight = detailMsg.weight == "" || detailMsg.weight == 'null' || detailMsg.weight == undefined ? "" : detailMsg.weight,
							self_clarity = detailMsg.clarity == "" || detailMsg.clarity == 'null' || detailMsg.clarity == undefined ? "" : detailMsg.clarity,
							self_shape = detailMsg.shape == "" || detailMsg.shape == 'null' || detailMsg.shape == undefined ? "" : detailMsg.shape,
							self_color = detailMsg.color == "" || detailMsg.color == "null" || detailMsg.color == undefined ? "" : detailMsg.color;
						let diamondInfo = weight + "克拉" + self_color + "色" + self_clarity + "" + self_shape + "钻石"; //钻石信息

						//钻石主图
						let diamondIcon = item.diamondPojo.diamondPics[0];
						let relativeUrl = "";
						if(diamondIcon != undefined && diamondIcon.picType == "prod") {
							relativeUrl = diamondIcon.relativeUrl;
						}

						comDetails.push({
							orderIcon: relativeUrl,
							order: diamondInfo,
							orderNum: orderDetails.id,
							paymentState: orderDetails.paymentState,
							createTime: orderDetails.createTime,
							totalNum: "1",
							totalPrice: item.product.unitPrice
						});

					})
					_self.list = comDetails; //订单信息
					_self.amount = orderDetails.totalPrice; //订单总额
				}, err => {
					console.log(err);
				})
			}
		}
	}
</script>
<style scoped>
	ul li {
		list-style: none;
	}
	
	.orderGoods,
	.takeGoods {
		display: flex;
		margin-bottom: 0 !important;
	}
	
	.orderGoods>li:first-child,
	.takeGoods>li:first-child {
		width: 30%;
	}
	
	.orderGoods>li,
	.takeGoods>li {
		text-align: left;
	}
	
	.userBox {
		display: flex;
	}
	
	.userBox>p {
		width: 30%;
		margin-bottom: 0 !important;
	}
	
	.amountBox {
		font-size: 16px;
		color: #666;
		line-height: 50px;
		font-weight: bold;
		text-align: right;
		padding-right: 1.5%;
		padding-bottom: 15px;
	}
	
	.amountNum {
		font-size: 16px;
		color: #f00;
	}
	
	li {
		text-align: center;
		cursor: pointer;
		position: relative;
	}
	
	.active:after {
		width: 100%;
		content: "";
		height: 2px;
		background: red;
		position: absolute;
		bottom: 0;
		left: 0;
		transition: all 0.4s;
	}
	
	label {
		font-size: 15px;
		font-weight: bold;
		line-height: 50px;
		padding-left: 10px;
		color: #343434;
	}
</style>
<style>
	.detailsCont {
		width: 95%;
		margin: 10px auto;
		border: 1px solid #AEC7E5;
	}
	
	.siteBox {
		position: relative;
	}
	
	.siteBox:after {
		content: "";
		width: 99%;
		position: absolute;
		bottom: 0;
		left: 0.5%;
		height: 1px;
		background: #AEC7E5;
	}
	
	.orderInfo {
		width: 98%;
		margin-left: 1%;
		border: 1px solid #AEC7E5;
		margin-bottom: 1rem;
	}
	
	.orderInfo>table {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
	}
	
	.orderInfo>table>thead>tr>th {
		background: #e8f2ff;
		font-weight: normal;
		border-bottom: none;
		border-top: none;
	}
</style>