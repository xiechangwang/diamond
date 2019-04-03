<template>
	<div id="app">
		<el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 10px;margin-bottom:8px;border-bottom: 1px solid #eee;background: #eee;">
			<el-breadcrumb-item :to="{ path: '/homeCont/activityList' }">活动页</el-breadcrumb-item>
			<el-breadcrumb-item>修改活动页</el-breadcrumb-item>
		</el-breadcrumb>
		<div>
			<form @submit.prevent="submit" method="post" enctype="multipart/form-data" action="">
				<b-row>
					<b-col md='5' sm='4'>
						<label>活动图片：</label>
						<b-form-file name="picture" placeholder="选择上传图片" @change="changeImage" style="width: 50%;display: inline-block;"></b-form-file>
					</b-col>
					<b-col md='4' sm='4'>
						<label>活动名：</label>
						<b-form-input v-model="title" type="text" placeholder="活动名" style="width: 50%;display: inline-block;"></b-form-input>

					</b-col>
					<b-col md="2" sm="3" style="text-align: right;">
						<input type="submit" value="提交" class="btn btn-primary" />
					</b-col>
				</b-row>
				<b-row style="margin-bottom: 10px;">
					<b-col md='4' sm='5'>
						<label>活动图片：</label>
						<img :src="pic_url" width="120" />
					</b-col>
				</b-row>
				<UEditor :config="config" ref="ueditor" style="width: 96% !important;margin: 0 auto 10px auto;"></UEditor>
			</form>
		</div>
	</div>
</template>

<script>
	import UEditor from '@/components/ueditor/ueditor2.vue'
	export default {
		name: 'hello',
		components: {
			UEditor
		},
		data() {
			return {
				config: {
					autoHeightEnabled: false,
					autoFloatEnabled: true,
					initialContent: '请输入内容', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
					autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
					initialFrameWidth: null,
					initialFrameHeight: null,
					BaseUrl: '',
					UEDITOR_HOME_URL: 'static/ueditor/'
				},
				addFormVisible: false,
				file: '',
				pic_url: "",
				title: "",
				content:"",
				id:""
			}
		},
		watch:{
			content(){	//监听数据变化
				let that=this;
				that.$nextTick(function(){
					setTimeout(function(){
						that.$refs.ueditor.setUEContent(that.content);
					},1000)
				})
			}
		},
		mounted(){
			let a_id=window.atob(this.$route.query.activity);
			this.initFun(this,a_id)
		},
		methods: {
			//获取文档内容
			submit(evt) {
				let fd = new FormData(evt.target);
				let content = this.$refs.ueditor.getUEContent();
				let activity=JSON.stringify({
					content:content,
					title:this.title,
					id:this.id
				})
				fd.set("activity", activity);
				this.$axios.post("/activity/updateActivity", fd).then(res => {
					let msg=res.data;
					if(msg.code=="OK"){
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
					}
				}, err => {
					console.log(err);
				});
			},
			//上传图片
			changeImage(e) {
				let file = e.target.files[0];
				if(file) {
					this.file = file
					let reader = new FileReader()
					let that = this
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 这里的this 指向reader
						that.pic_url = this.result
					}
				}
			},
			//初始化数据
			initFun(that,id){	
				let datas=that.$qs.stringify({
					activityId:id
				})
				this.$axios.post("/activity/getActivity",datas).then(res => {
					let msg=res.data;
					console.log(msg);
					that.title=msg.title;
					that.pic_url=msg.relativeUrl;
					that.id=msg.id;
					that.content=msg.content;
				}, err => {
					console.log(err);
				});
			}
			
		}
	}
</script>
<style scoped>
	.btn {
		border: none;
		font-size: .875rem;
		line-height: 1.5;
		border-radius: .2rem;
		color: #fff;
		background-color: #007bff !important;
		border-color: #007bff !important;
		margin-bottom: 20px;
		/*margin-left: 10px;*/
	}
	
	.row {
		margin-left: 0;
		margin-right: 0;
	}
	
	label {
		width: 100px;
		text-align: right;
		display: inline-block;
	}
</style>