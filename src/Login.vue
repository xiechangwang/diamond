<template>
	<div class="login">
		
		<div class="content">
			<div class="header">
       			<h3>Diamond</h3>
    		</div>
			<div class="login-box">
					<div class="tit-icon"></div>
					<div class="inp-box">
						<p class="name clear">
							<span class="userIcon">
								<img src="./assets/img/userIcon.png"  style="vertical-align:middle;"/>
							</span>
							<input id="username" type="text" v-model="userName" value="" name="username" placeholder="请输入用户名" />
						</p>
						<p class="password clear">
							<span class="passIcon">
								<img src="./assets/img/passIcon.png" width="65%" style="vertical-align: middle;"/>
							</span>
							<input id="password" type="password" v-model="passWord" value="" name="password" placeholder="请输入密码" />
						</p>
						<p class="tipinfo"><span class="namecue">{{errUserName}}</span><span class="passcue">{{errUserPass}}</span></p>

					</div>
					<p class="Login-btn"><input type="button" value="登录" @click="loginBtn" /></p>
					<!--<div class="forgot-pw">
						<a href="#">忘记密码？</a>
					</div>-->
			</div>
			<footer>Diamond background technical support</footer>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				userName:'',
				passWord:'',
				errUserName:'',
				errUserPass:''
			}
		},
		methods:{
			loginBtn(){
				let ts=this;
				let name=ts.userName,
					pass=ts.passWord;
				let datas=ts.$qs.stringify({
					userName:name,
					password:pass
				});
				if(name!=""&&pass!=""){
					ts.initLogin(ts,datas);	
				}else{
					ts.errUserName="输入用户名或密码";
					setTimeout(()=>{ts.errUserName=""},1300);
				}
				
			},
			initLogin(_self,datas){
				let loginUrl="/UserController/adminLogin";
				_self.$axios.post(loginUrl,datas).then(res=>{
					let msg=res.data;
					if(msg=="用户名错误"){
						_self.errUserName="用户名错误";
						setTimeout(()=>{
							_self.errUserName="";
						},1000)
					}else if(msg=="密码错误"){
						_self.errUserPass="密码错误";
						setTimeout(()=>{
							_self.errUserPass="";
						},1000)
					}else if(msg=="OK"){
						let userMsg={
							userName:_self.userName,
							passWord:_self.passWord
						}
						let userData=JSON.stringify(userMsg);
						sessionStorage.setItem("userData",userData);
						_self.$router.push({
							path:"/homeCont"
						})
					}
				},err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	@media (max-width: 1600px) {
    .login-box{
        width: 22% !important;
        
    }
}
@media (max-width: 1500px) {
    .login-box{
        width: 24% !important;
        right: calc(50% - 12%)!important;
    }
    .header h3{
        width: 9.5% !important;
    }
}
@media (max-width:1400px) {
    .login-box{
        width: 26% !important;
        right: calc(50% - 13%)!important;
    }
    .header h3{
        width: 9.8% !important;
    }
    .inp-box{
        padding-bottom: 2.5vh !important;
    }
}
@media (max-width:1300px) {
    .login-box{
        width: 28% !important;
        right: calc(50% - 14%)!important;
    }
    .header h3{
        width: 10% !important;
    }
    .inp-box{
        padding-bottom: 3vh !important;
    }
}
@media (max-width:1200px) {
    .login-box{
        width: 30% !important;
        right: calc(50% - 15%)!important;
    }
    .header h3{
        width: 10.5% !important;
    }
}
@media (max-width:1100px) {
    .login-box{
        width: 32% !important;
        right: calc(50% - 16%)!important;
    }
    .header h3{
        width: 11% !important;
    }
}
@media (max-width:960px) {
    .login-box{
        width: 36% !important;
        right: calc(50% - 18%)!important;
    }
}
	
	*{
		margin: 0;
		padding: 0;
	}
	/*header部分*/
.header{
    width: 100%;
    height: 79px;
    /*background: #fff;*/
   background:rgba(255,255,255,0.2) ;
}
.header h3{
    font-weight: normal;
    width: 9%;
    line-height: 79px;
    margin-left: 10%;
    color: #fff;
}
.header h3 img{
    vertical-align: middle;
}
/*登录框部分*/
.content {
    position: relative;
    width: 100%;
   /* height: calc(100vh - 160px);*/
  	height: 100vh;
    background: url(./assets/img/bg.png)left no-repeat, linear-gradient(-135deg, #48C8FF, #54B7FE);
    background-size: 100% 100%;
}
.login-box {
    position: absolute;
   	right: calc(50% - 11%);
    top: calc(50% - 25%);
    width: 22%;
    background: #fff;
    border-radius: 5px;
    /*box-shadow: 0px 0px 10px #1585c5 inset, 0px 0px 5px #1585c5;*/
   
    box-shadow: 0px 0px 10px #1585c5;
    padding: 3.5vh 0 9vh 0;
}
.login-box form {
    width: 100%;
}
.login-box .tit-icon{
    width: 8vh;
    height: 8vh;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    background: url("./assets/img/titicon.png")top center no-repeat;
    background-size: cover;
    opacity: 0.5;
    /*border: 2px solid #222;*/
}
.inp-box{
    position: relative;
    width: 100%;
    padding-top: 1vh;
    padding-bottom: 2vh;
}
.inp-box .name,.inp-box .password{
    width: 75%;
    margin: 2vh auto;
    line-height: 40px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #c4c4c4;
}
.name span,.password span{
    display: block;
    float: left;
    width: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 22px;
    color: #757575;
    background: #f4f4f4;
    border-right: 1px solid #c4c4c4;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.name input,.password input{
    width: calc(100% - 40px);
    float: left;
    padding-left: 2%;
    height: 40px;
    border: none;
}
input[type=text],input[type=password]{
	border:1px rgba(255,255,255,0) solid;
	outline:none;
}
.tipinfo{
    position: absolute;
    width: 75%;
    line-height: 21px;
    bottom: 2px;
    left: calc(50% - 37.5%);
    background: #ffe6d7;
    border-radius: 4px;
    color: #e28859;
    margin-bottom:0.5rem ;
}
.tipinfo label{
    font-size: 12px;
    color: #e28859;
}
.Login-btn{
    width: 75%;
    margin: 0 auto;
}
.Login-btn input[type=button]{
    width: 100%;
    line-height: 42px;
    border-radius: 4px;
    background: #01aeef;
    color: #fff;
    font-size: 16px;
    text-align: center;
    border: none;
    -webkit-box-shadow: 0 0 6px #aaa;
    -moz-box-shadow: 0 0 6px #aaa;
    box-shadow: 0 0 6px #aaa;
    cursor: pointer;
}
.Login-btn>input:hover{
	background: #00a2df;
}
.forgot-pw{
    position: relative;
    width: 75%;
    margin: 0 auto;
    line-height: 20px;
}
.forgot-pw a{
    position: absolute;
    right:0;
    font-size: 12px;
    color: #666;
}
.userIcon>img,.passIcon>img{
	float: left;
	padding: 20%;
	height: 40px;
	width: 40px;
}
footer{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
	color: #eee;
	line-height: 50px;
	font-size: 14px;
}
</style>