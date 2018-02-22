<template>
  <div>    
        <div  class="container">
            <div class="trigger" v-on:click="selectCollapse()" >
                <slot name="trigger"></slot>
            </div>
            <div v-show="isActive" class="content" >
                <slot name="content"></slot>
            </div>
        </div>
       
  </div>
</template>
<script>
export default {
    data(){
        return {
            isActive: false
        }
    },
    create(){
       
    },
    methods:{
        selectCollapse()
        {
          this.isActive=! this.isActive;
            
        }
    }
}
</script>
<style scoped>
div.container{
    width:100%;
    margin:5px 10px;
}
div.trigger{
    text-align:left;
    color:black;
    background-color: #e4e5e7;
    padding:10px;
    width:100%;
    /* border:1px solid black; */
    
}
div.trigger:hover{
    text-decoration:underline;
}

div.content{
    width:100%;
    padding:10px;
    background-color: #f1f3f6;
}
</style>
