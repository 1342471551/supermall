(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b5cf356"],{"2a1a":function(t,e,n){},"2c06":function(t,e,n){},"481d":function(t,e,n){"use strict";var o=n("d23f"),a=n.n(o);a.a},"4f00":function(t,e,n){},"5cbe":function(t,e,n){t.exports=n.p+"img/recommend_bg.794b6628.jpg"},"832f":function(t,e,n){"use strict";var o=n("4f00"),a=n.n(o);a.a},"9a3a":function(t,e,n){"use strict";var o=n("2a1a"),a=n.n(o);a.a},b3d7:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[n("nav-bar",{staticClass:"home-nav"},[n("div",{attrs:{slot:"center"},slot:"center"},[t._v(" 购物街 ")])]),n("tab-control",{directives:[{name:"show",rawName:"v-show",value:t.isTabFixed,expression:"isTabFixed"}],ref:"topTab",staticClass:"tab-control1",attrs:{titles:["流行","新款","精选"]},on:{tabClick:t.tabClick}}),n("Scroll",{ref:"scroll",staticClass:"content",attrs:{"probe-type":3,"pull-up-load":!0},on:{scroll:t.contentScroll,pullingUp:t.pullingUp}},[n("home-swiper",{attrs:{banners:t.banners},on:{swiperImageLoad:t.swiperImageLoad}}),n("home-recommend-view",{attrs:{recommends:t.recommends}}),n("feature-view"),n("tab-control",{ref:"tabControl",staticClass:"tab-control",attrs:{titles:["流行","新款","精选"]},on:{tabClick:t.tabClick}}),n("goods-list",{attrs:{goods:t.showGoods}})],1),n("BackTop",{directives:[{name:"show",rawName:"v-show",value:t.isShowBackTop,expression:"isShowBackTop"}],nativeOn:{click:function(e){return t.backClick(e)}}})],1)},a=[],r=n("6b75");function s(t){if(Array.isArray(t))return Object(r["a"])(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("3ca3"),n("ddb0");function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var c=n("06c5");function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t){return s(t)||i(t)||Object(c["a"])(t)||l()}var d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Swiper",t._l(t.banners,(function(e){return n("swiper-item",[n("a",{attrs:{href:e.link}},[n("img",{attrs:{src:e.image,alt:""},on:{load:t.imageLoad}})])])})),1)},f=[],m=n("dc2c"),p={name:"HomeSwiper",components:{Swiper:m["a"],SwiperItem:m["b"]},props:{banners:{type:Array,default:function(){return[]}}},methods:{imageLoad:function(){this.isLoad||(this.$emit("swiperImageLoad"),this.isLoad=!0)}},data:function(){return{isLoad:!1}}},b=p,h=n("2877"),v=Object(h["a"])(b,d,f,!1,null,"9625bd46",null),g=v.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend"},t._l(t.recommends,(function(e){return n("div",{staticClass:"recommend-item"},[n("a",{attrs:{href:e.link}},[n("img",{attrs:{src:e.image,alt:""}}),n("div",[t._v(t._s(e.title))])])])})),0)},y=[],k={name:"HomeRecommendView",props:{recommends:{type:Array,default:function(){return null}}}},T=k,C=(n("832f"),Object(h["a"])(T,w,y,!1,null,"3e97d446",null)),$=C.exports,_=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},x=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"feature"},[o("a",{attrs:{href:"https://act.mogujie.com/zzlx67"}},[o("img",{attrs:{src:n("5cbe")}})])])}],I={name:"FeatureView"},S=I,O=(n("481d"),Object(h["a"])(S,_,x,!1,null,"9c879bf0",null)),j=O.exports,L=n("a7ac"),H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"tab-control"}},t._l(t.titles,(function(e,o){return n("div",{staticClass:"tab-control-item",class:{active:o===t.currentIndex},on:{click:function(e){return t.indexClick(o)}}},[n("span",[t._v(t._s(e))])])})),0)},G=[],B={name:"TabControl",props:{titles:{type:Array,default:function(){return[]}}},data:function(){return{currentIndex:0}},methods:{indexClick:function(t){this.currentIndex=t,this.$emit("tabClick",t)}}},E=B,A=(n("cbb6"),Object(h["a"])(E,H,G,!1,null,"6f467310",null)),F=A.exports,U=n("6d71"),V=n("5d17"),N=n("fdd6"),Y=n("1bab");function z(){return Object(Y["a"])({url:"/home/multidata"})}function J(t,e){return Object(Y["a"])({url:"/home/data",params:{type:t,page:e}})}var M=n("eecb"),R={name:"Home",components:{GoodsList:U["a"],HomeSwiper:g,HomeRecommendView:$,FeatureView:j,NavBar:L["a"],TabControl:F,Scroll:V["a"],BackTop:N["a"]},mixins:[M["a"]],data:function(){return{banners:[],recommends:[],goods:{pop:{page:0,list:[]},new:{page:0,list:[]},sell:{page:0,list:[]}},currentType:"pop",isShowBackTop:!1,tabOffsetTop:0,isTabFixed:!1,saveY:0,ItemImgListener:null}},computed:{showGoods:function(){return this.goods[this.currentType].list}},created:function(){this.getHomeMultidata(),this.getHomeGoods("pop"),this.getHomeGoods("new"),this.getHomeGoods("sell")},mounted:function(){console.log(this.$refs.tabControl.$el.offsetTop),console.log("混人home组件代码")},methods:{tabClick:function(t){switch(t){case 0:this.currentType="pop";break;case 1:this.currentType="new";break;case 2:this.currentType="sell";break}this.$refs.tabControl.currentIndex=t,this.$refs.topTab.currentIndex=t},backClick:function(){console.log("ddd"),this.$refs.scroll.scrollTo(0,0)},contentScroll:function(t){this.isShowBackTop=-t.y>1e3,this.isTabFixed=-t.y>this.tabOffsetTop},pullingUp:function(){console.log("请求服务器数据,上拉加载更多"),this.getHomeGoods(this.currentType)},swiperImageLoad:function(){this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop},getHomeMultidata:function(){var t=this;z().then((function(e){console.log(e),t.banners=e.data.banner.list,t.recommends=e.data.recommend.list}))},getHomeGoods:function(t){var e=this,n=this.goods[t].page+1;J(t,n).then((function(n){var o;(o=e.goods[t].list).push.apply(o,u(n.data.list)),e.goods[t].page+=1,e.$refs.scroll.finishPullUp()}))}},destroyed:function(){console.log("销毁")},activated:function(){this.$refs.scroll.scrollTo(0,this.saveY,0),this.$refs.scroll.refresh()},deactivated:function(){this.saveY=this.$refs.scroll.y?this.$refs.scroll.y:0,this.$bus.$off("itemImageLoad",this.ItemImgListener)}},P=R,q=(n("9a3a"),Object(h["a"])(P,o,a,!1,null,"5886878e",null));e["default"]=q.exports},cbb6:function(t,e,n){"use strict";var o=n("2c06"),a=n.n(o);a.a},d23f:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4b5cf356.e78660ae.js.map