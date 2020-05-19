import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

    this.ItemImgListener = () => {
      // console.log('sss')
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
    console.log("代码进行混入mixin的")
  }
}

import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  method:{
    backClick() {
      console.log('ddd')
      this.$refs.scroll.scrollTo(0, 0)
    }
  },

}
