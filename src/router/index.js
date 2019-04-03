import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeCont from '@/HomeCont.vue';
import Login from '@/Login.vue';
import Home from '@/pages/Home.vue';
import ueditor from '@/pages/ueditor_demo.vue';
import ActivityList from '@/components/ActivityList.vue';
import AddZS from '@/components/AddZSInfo.vue';
import ZSList from '@/components/ZSList.vue';
import Excel from '@/components/Excel.vue';
import UpdataDiamond from '@/components/UpdataDiamond.vue';
import ActivityUpdate from '@/pages/ActivityUpdate.vue';
import OrderList from '@/components/OrderList.vue';
import OrderDetails from '@/components/OrderDetails.vue';

Vue.use(VueRouter)

export default new VueRouter({
	routes: [{
			path: '/',
			name: 'login',
			component: Login
		},
		{
			path: '/homeCont',
			name: 'homeCont',
			component: HomeCont,
			children: [{
					path: '/homeCont/',
					name: 'home',
					component: Home
				},
				{
					path: '/homeCont/ueditor',
					name: 'ueditor',
					component: ueditor
				},
				{
					path: '/homeCont/activityList',
					name: 'activityList',
					component: ActivityList
				},
				{
					path: '/homeCont/addZS',
					name: 'addZS',
					component: AddZS
				},
				{
					path: '/homeCont/zsList',
					name: 'zsList',
					component: ZSList
				},
				{
					path: '/homeCont/excelZS',
					name: 'excelZS',
					component: Excel
				},
				{
					path: '/homeCont/updataDiamond',
					name: 'updataDiamond',
					component: UpdataDiamond
				},
				{
					path: "/homeCont/activityUpdate",
					name: "activityUpdate",
					component: ActivityUpdate
				},
				{
					path: '/homeCont/orderList',
					name: 'orderList',
					component: OrderList
				},
				{
					path: '/homeCont/orderDetails',
					name: 'orderDetails',
					component: OrderDetails
				}
			]
		}

	]
})