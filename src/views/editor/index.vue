<template>
    <div class="box">
        <div class="editor" id="editor" ref="editor"></div>
        <button class="btn" @click="handleClick">确认</button>
    </div>
</template>    

<script type="text/javascript">
import E from "wangeditor";

export default {
    data(){
        return{
            editor: null, // 存放实例化的wangEditor对象，在多个方法中使用
            editorContent:"" // 输入的值
        }
    },
    mounted(){
         this.editor = new E("#editor"); //new即可
  
         // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.editorContent = html;
            // console.log(html)
        };   
         this.editor.create(); // 创建富文本实例
    },
    methods:{
        handleClick(){
            console.log(this.editorContent)
        }
    }
}
</script>  

<style lang="less" scoped>
    .box{
        width: 1000px;
        height: 500px;
        text-align:left;
        margin: 20px;
        .btn{
            width: 60px;
            height: 30px;
            margin-top:20px;
            background: pink;
            outline: none;
            border: none;
        }
    }
</style>