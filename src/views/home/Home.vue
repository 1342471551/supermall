<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control class="tab-control1" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="topTab" v-show="isTabFixed"/>
    <Scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </Scroll>
    <!--    如果要监听一个组件的点击 需要添加.native(监听组件的根元素事件)-->
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  //子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";

  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  //axios封装方法
  import {getHomeMultidata, getHomeGoods} from "network/home";

  //公共工具类
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      GoodsList,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,

      NavBar,
      TabControl,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        ItemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      //  组件创建完成调用生命周期函数请求数据
      //  1.请求首页多个数据
      this.getHomeMultidata()

      //  请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //  获取tabControl的offsetTop
      //  所以组件都有一个$el 用于获取组件中的元素
      console.log(this.$refs.tabControl.$el.offsetTop);
      console.log("混人home组件代码")
    },
    methods: {
      //事件监听相关
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabControl.currentIndex = index
        this.$refs.topTab.currentIndex = index
      },
      backClick() {
        console.log('ddd')
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //判断上滑按钮是否显示
        this.isShowBackTop = (-position.y) > 1000

        //  判断tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      pullingUp() {
        console.log("请求服务器数据,上拉加载更多");
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },

      //网络请求相关
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    //组件销毁调用
    destroyed() {
      console.log('销毁')
    },
    //返回这个组件调用(保存停留位置)
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    //离开这个组件调用(记录停留位置)
    deactivated() {
      //保存滚动到到Y值
      this.saveY = this.$refs.scroll.y ? this.$refs.scroll.y : 0
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    }
  }
</script>

<!--加上scoped 样式就只对当前页面生效-->
<style scoped>
  #home {
    /* vh是视口高度 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  /*重新造一个导航栏替代原来的 对点击数据进行同步*/
  .tab-control1 {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
