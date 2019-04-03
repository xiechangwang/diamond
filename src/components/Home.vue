<template>
 <div class="homeMain" >
			<div class="titIcon">
				<h4 class="page-title title">
					欢迎来到首页
				</h4>
				<span class="slogan">Welcome to the background management system</span>
				<div class="divL"></div>
				<div class="divR"></div>
			</div>
		</div>
</template>
<script>
  export default{
      name:'home',
      data(){
          return{

          }
      }
  }
</script>
<style scoped>
html,
		body {
			width: 100%;
			height: 100%;
			background: #f1f1f7;
		}
		.homeMain{
			/*width: 60%;*/
			height: 100%;
			text-align: center;
			margin: 0 auto 0 auto;
		}
		.titIcon{
			position: relative;
			top:calc(50% - 150px);
			width: 100%;
			height: 200px;
		}
		.title {
			position: absolute;
			top: calc(50% - 25px);
			left: calc(50% - 165px);
			font-size: 50px !important;
			line-height: 80px !important;
			color: #fff;
			letter-spacing: 5px;
			font-style: italic;
			background: url(../assets/img/titBng.png)no-repeat 0 5%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin-bottom: 0 !important;
			z-index: 3;
		}
		.slogan{
			position: absolute;
			bottom: -10px;
			right: calc(50% - 257px);
			font-family: "arial narrow";
			color: #4e83ce;
			text-shadow: 0px 5px 2px rgba(54,92,153,0.55);
			font-size: 18px;
			font-weight: bold;
			z-index: 66;
		}
		/*斜线和线框*/
		.divL{
		  position:absolute;
		  top: calc(50%);
		  left:calc(50% - 300px);
		  width:100px;
		  height:100px;
		  box-sizing:border-box;
		  line-height:200px;
		  text-indent:5px;
		  z-index: 0;
		}
		
		.divL::before{
		  content:"";
		  position:absolute;
		  left:0;
		  bottom:0;
		  width:0;
		  height:0;
		  border:49px solid transparent;
		  border-left:120px solid #9abbe6;
		  border-bottom:111px solid #9abbe6;
		 transform:translate(0px);
		}
		
		.divL::after{
		  content:"";
		  position:absolute;
		  left:0;
		  bottom:0;
		  width:0;
		  height:0;
		  border:48px solid transparent;
		  border-left:550px solid #f1f1f7;
		  border-bottom:108px solid #f1f1f7;
		  transform:translate(2px,-2px);
		}
		.divR{
		  position:absolute;
		  top: calc(50% - 4px);
		  right:calc(50% - 300px);
		  width:100px;
		  height:100px;
		  box-sizing:border-box;
		  line-height:120px;
		  text-indent:5px;
		  z-index: 0;
		}
		
		.divR::before{
		  content:"";
		  position:absolute;
		  right:0;
		  bottom:0;
		  width:0;
		  height:0;
		  border:107px solid transparent;
		  border-right:493px solid #9abbe6;
		  border-top:49px solid #9abbe6;
		 transform:translate(0px);
		}
		
		.divR::after{
		  content:"";
		  position:absolute;
		  right:0;
		  bottom:0;
		  width:0;
		  height:0;
		  border:107px solid transparent;
		  border-right:489px solid #f1f1f7;
		  border-top:49px solid #f1f1f7;
		  transform:translate(-2px,2px);
		}
</style>
