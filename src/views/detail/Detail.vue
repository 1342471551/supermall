<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="navs"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <DetailBottomBar @addToCart="addToCart"/>
    <BackTop @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import Scroll from "components/common/scroll/Scroll";
  import {itemListenerMixin} from "common/mixin";

  import {getDetail, Shop, Goods, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";

  // import Toast from "components/common/toast/Toast";

  export default {
    name: "Detail",
    components: {
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailBaseInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      DetailBottomBar,
      BackTop,
      // Toast
    },
    //使用混入把两个组件内容进行合并
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        // message: '',
        // show: false
      }
    },
    created() {
      this.iid = this.$route.params.id

      //  请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取数据
        const data = res.result

        //获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        // console.log(res)
        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 4.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //  保存商品详情
        this.detailInfo = data.detailInfo
        //  获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //  获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        //当数据渲染完毕会回调这个方法
        // this.$nextTick(() => {
        //   //dom虽然加载完毕，但是图片没有加载完成
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // })
      })

      //  获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
        // console.log(res)
      })

      //  给getThemeTopY负值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
    },
    mounted() {
      console.log("代码进行混入detail")
    },
    destroyed() {
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.ItemImgListener)
    },
    methods: {
      imageLoad() {
        // this.$refs.scroll.refresh()
        this.newRefresh()

        //图片加载完成回调的时候调用
        this.getThemeTopY()
      },
      titleClick(index) {
        console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position)
        //  获取y值
        const positionY = -position.y
        //  和主题中的y值进行对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          //使用in获取的i是一个字符传不是int类型使用普通的循环则不会
          if (this.currentIndex !== i && ((positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
            || (i === length - 1 && positionY >= this.themeTopYs[i]))
          ) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.navs.currentIndex = this.currentIndex
          }
        }
        //判断上滑按钮是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      backClick() {
        console.log('ddd')
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart() {
        //  获取购物车需要展示信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid

        //  将商品添加到购物车
        //   this.$store.commit('addCart',product)
        this.$store.dispatch('addCart', product).then(res => {
          //  添加购物车成功弹窗显示
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // }, 1500)
          this.$toast.isShow(res,1500)
        })

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
