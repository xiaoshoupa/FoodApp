<template>
  <div id="app">
    <v-header></v-header>
    
    <div class="tab">
        <div class="tab-item">
           <router-link to='/goods'>商品</router-link>  
        </div>
        <div class="tab-item">
          <router-link to='/ratings'>评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to='/seller'>商家</router-link>
        </div>
    </div> 
    <keep-alive>
      <router-view></router-view>  
    </keep-alive>
    <shopcar></shopcar>
  </div>

</template>

<script>
  import headerNew from './components/header/header.vue'
  import shopcar from './components/shopcar/shopcar.vue'
  export default {
    components: {
      'v-header': headerNew,
      shopcar
    },
    watch:{
      $route(n,o){
        if(n.path==='/ratings'){
            setTimeout(()=>{
              this.$store.dispatch('getRatings');
            },10);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    #app .tab{
      display: flex;
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      border-bottom: 0.01rem solid rgba(7,17,27,0.1);
      .tab-item{
        flex:1;
        text-align: center;
        & > a{
          font-size: 0.24rem;
          display: block;
          &.active{
            color:#ff7300;
          }
        }
    }
  }
</style>
