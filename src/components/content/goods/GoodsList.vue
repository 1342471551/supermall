<template>
  <div class="goods">
    <!--    {{goods}}-->
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "goodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    /*使用flax布局 使用wrap属性设置不包裹 在item中设置宽度就可以根据宽度进行均分*/
    display: flex;
    flex-wrap: wrap;
    /*让内容进行中间均等分*/
    justify-content: space-around;
    padding: 1px;
  }

</style>
