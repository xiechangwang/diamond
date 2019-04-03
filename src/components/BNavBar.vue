<template>
	<div class="navMain">
		<ul class="NavList">
			<li v-for="(navItem,index) in navData" :key="index" @click="navList(index,navItem.icons)" :class="activeIndex==index?'active':''">
				<i :class="navItem.icons"></i>{{navItem.tit}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'Bnav',
		data() {
			return {
				navData: [{
					icons: 'home',
					tit: '首页'
				}, {
					icons: 'ueditor',
					tit: '新增活动页'
				}, {
					icons: 'activityList',
					tit: '活动页'
				}, {
					icons: 'addZS',
					tit: '新增钻石信息'
				}, {
					icons: 'zsList',
					tit: '钻石信息'
				}, {
					icons: 'excelZS',
					tit: 'Excel导入信息'
				},{
					icons:'orderList',
					tit:'订单列表'
				}],
				activeIndex: 0
			}
		},
		created() {
			let test = window.location.href;
			let url = test.split('/');
			let router = url[url.length - 1];
			if(router == ''||router=='homeCont') {
				return
			} else if(router == "ueditor") {
				this.activeIndex = 1;
			} else if(router == "activityList") {
				this.activeIndex = 2;
			} else if(router == "addZS") {
				this.activeIndex = 3;
			} else if(router == "zsList") {
				this.activeIndex = 4;
			} else if(router == "excelZS") {
				this.activeIndex = 5;
			} else if(router == "orderList"){
				this.activeIndex = 6;
			} else{
				this.activeIndex = Number(window.sessionStorage.getItem("active_index"));
			}
		},
		methods: {
			navList(i, e) {
				let ts = this;
				ts.activeIndex = i;
				window.sessionStorage.setItem("active_index", ts.activeIndex);
				if(e == "" || e == "home") {
					ts.$router.push({
						path: '/homeCont/'
					});
				} else {
					ts.$router.push({
						path: '/homeCont/'+e
					});
				}
			}
		}
	}
</script>
<style scoped>
	@media (max-width:1500px) {
		.navMain {
			width: 11% !important;
		}
	}
	
	@media (max-width: 1400px) {
		.navMain {
			width: 11.5% !important;
		}
	}
	
	@media (max-width: 1300px) {
		.navMain {
			width: 12% !important;
		}
	}
	
	@media (max-width: 1200px) {
		.navMain {
			width: 13% !important;
		}
	}
	
	@media (max-width: 1100px) {
		.navMain {
			width: 13.5% !important;
		}
	}
	
	.navMain {
		position: fixed;
		top: 57px;
		bottom: 0;
		left: 0;
		width: 10%;
		display: block;
		z-index: 1;
		font-weight: 200;
		background: #ffffff;
		background-size: cover;
		background-position: center center;
		border-right: 1px solid #eee;
		box-shadow: 6px 1px 20px rgba(69, 65, 78, 0.1);
	}
	
	li i {
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 6px;
	}
	
	.home {
		background: url("../assets/img/shouye.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.ueditor {
		background: url("../assets/img/fuwenben.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.activityList {
		background: url("../assets/img/huodongliebiao.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.addZS {
		background: url("../assets/img/xinzeng.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.zsList {
		background: url("../assets/img/chanpinliebiaopubuliumoshi.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.excelZS {
		background: url("../assets/img/Excel.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.orderList{
		background: url("../assets/img/orderList.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.NavList {
		margin-top: 20px;
	}
	
	.NavList li {
		display: flex;
		align-items: center;
		padding: 13px 25px;
		width: 100%;
		font-size: 14px;
		position: relative;
		margin-bottom: 5px;
		color: #83848a;
		font-weight: 700;
		cursor: pointer;
	}
	
	li:hover :before {
		background: #1d7af3;
		opacity: 1 !important;
		position: absolute;
		z-index: 1;
		width: 3px;
		height: 100%;
		content: '';
		left: 0;
		top: 0;
	}
	
	li:hover {
		background: #fbfbfb;
	}
	
	.active {
		color: #575962 !important;
	}
	
	.active:before {
		background: #1d7af3;
		opacity: 1 !important;
		position: absolute;
		z-index: 1;
		width: 3px;
		height: 100%;
		content: '';
		left: 0;
		top: 0;
	}
	
	.active>.home {
		background: url("../assets/img/shouyeActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.active>.ueditor {
		background: url("../assets/img/fuwenbenActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.active>.activityList {
		background: url("../assets/img/huodongliebiaoActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.active>.addZS {
		background: url("../assets/img/xinzengActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.active>.zsList {
		background: url("../assets/img/chanpinliebiaopubuliumoshiActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.active>.excelZS {
		background: url("../assets/img/ExcelActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	.active>.orderList{
		background: url("../assets/img/orderListActive.png")top center no-repeat;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
</style>