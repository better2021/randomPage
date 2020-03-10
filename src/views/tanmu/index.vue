<template>
    <div>
        <div class="box">
            <el-input v-model="txt" placeholder="请输入内容" style="width:300px;margin-right:10px"></el-input>
            <el-button type="success" @click="sendMessage" round>发送</el-button>
        </div>
        <div id="tanmu" ref="tanmu"></div>
    </div>
</template>  

<script>

export default {
    data(){
        return{
            txt:'',
        }
    },
    //组件绑定mounted钩子函数内执行初始化方法，返回发送弹幕方法
    mounted(){
        this.send = this.$start(this.$refs.tanmu);
        document.onkeydown = (e)=>{
            console.log(e.keyCode)
            if(e.keyCode===13){
                this.sendMessage()
            }
        }
    },
    methods:{
       // 发送消息
       sendMessage(){
           let colors = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
           this.send({
                text:this.txt,      //发送弹幕的文字内容，默认为默认弹幕
                color:colors,     //字体颜色，默认为黑色
                speed:3,     //弹幕速度，默认为5
                // classname:"style2", //样式类名，目前有style1~3三种选择，分别代表蓝色、绿色、红色
           })
       }
    }
}
</script>

<style lang="less" scoped>
    #tanmu{
        width:1000px;
        height: 600px;
        margin: 20px auto;
        border:2px pink solid;
        font-weight: 600;
        font-size: 20px;
    }
</style>