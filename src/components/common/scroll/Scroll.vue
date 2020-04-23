<template>
  <!--  ref/children 拿到子组件-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        //默认使用BScroll无法监听按钮的点击事件
        click: true,
        //开启上拉加载更多
        pullUpLoad: this.pullUpLoad
      })

      //  2.监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.进行上拉加载更多
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          // console.log("-------")
          //加载完成 进行刷新 允许下次上拉
        })
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        //在执行刷新之前scroll对象还没有初始化完成
        console.log('执行scroll刷新');
        this.scroll && this.scroll.refresh()
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    /*overflow: hidden;*/
  }
</style>
