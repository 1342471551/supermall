<template>
  <div class="wrapper">
    <ul>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>
      <li>ddddddddd</li>

    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    mounted() {
      //默认BScroll不能实时的监听参数位置

      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        //probe侦测 默认0(0,1不侦测) 2(侦测 手指离开惯性不侦测) 3(侦测 只要滚动都侦测)
        probeType: 3,
        //默认使用BScroll无法监听按钮的点击事件
        click: true,
        //开启上拉加载更多
        pullUpLoad:true
      })

      //使用scroll.on可以可以监听滚动事件 (前提必须设置了probeType属性)
      this.scroll.on('scroll', (position) => {
        console.log(position);
      })

      this.scroll.on('pullingUp', () => {
        console.log("-------")
        //加载完成 进行刷新 允许下次上拉
        this.scroll.finishPullUp()
      })

    },
    data() {
      return {
        scroll: null
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    /*原生 实现局部滚动
      给定父组件高度 超出部分隐藏(实现scroll不需要hidden了自动隐藏)*/
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
