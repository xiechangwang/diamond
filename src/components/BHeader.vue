<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="#fff" style="border-bottom: 1px solid #eee;position: relative;">
      <b-navbar-brand href="#" style="color: #444">Diamond</b-navbar-brand>
     	<div class="outHome">
     		 <div class="quit">
 						<p class="quitIcon"><img src="../assets/img/titicon.png" width="100%" /></p>
 						<div class="sub">
 								<p>{{userName}}</p>
 								<p class="out" @click="logOut">退出登录</p>
 						</div>
     		 </div>
     	</div>
    </b-navbar>
  </div>
</template>
<script>
  export default{
      name:'bHeader',
      data(){
          return{
							userName:''
          }
      },
      created(){
      	let ts=this;
      	let userData=JSON.parse(sessionStorage.getItem("userData"));
      	if(userData==null||userData==undefined||userData=="null"){
						ts.$router.push({
							path:'/'
						})
      	}else{
      		ts.userName=userData.userName;
      	}
      },
      methods:{
      	logOut(){
      		let ts=this;
      		ts.$router.replace({
      			path:'/'
      		});
      		sessionStorage.removeItem("userData");
      	}
      }
  }
</script>
<style scoped>
	.outHome{
		position: absolute;
		top: 0;
		right: 1.5%;
		z-index: 555;
		
	}
	.quitIcon{
		width: 45px;
		height: 45px;
		border-radius: 50%;
		overflow: hidden;
		margin-top: 5px;
		/*border: 2px solid #222;*/
		opacity: 0.5;
	}
	.quit{
		height: 100%;
	}
	.quit:hover .sub{
		display: block;
	}
	.sub{
		display: none;
		position:absolute ;
		top:56px ;
		right: -20px;
		width: 150px;
		background: #efefef;
		box-shadow: 0px 3px 6px #999;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		z-index: 888;
		
		
	}
	.sub:before{
    width:0;
    height:0;
    border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #eee;/*透明 透明  灰*/
    position: absolute;
    top: -8px;
    right: 25px;
		content: "";
	}
	.sub>p{
		border-bottom: 1px solid #fefefe;
		margin-bottom: 0 !important;
		line-height: 50px;
		cursor:pointer;
		text-align: center;
		color: #444;
		
	}
	.sub>p:last-child{
		border-bottom: none !important;
	}
	.out{
		background: #d9d9d9;
	}
</style>
