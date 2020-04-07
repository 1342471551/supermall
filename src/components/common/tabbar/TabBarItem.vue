<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive">
      <slot name="item-icon">

      </slot>
    </div>
    <div v-else>
      <slot name="item-icon-active">

      </slot>
    </div>
<!--    因为插槽会被替换，写在插槽中的样式可能无法生效 所以需要在插槽外面包裹一层div-->
    <div :style="activeStyle">
      <slot name="item-text">

      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    methods: {
      itemClick() {
        //当点击当时候进行路由跳转 路由index中控制的是这个链接对应组件 app.vue中使用router.view判断显示位置
        this.$router.push(this.path)
      }
    },
    computed: {
      isActive() {
        //判断当前通过props传过来的path和当前路由的path是否相同
        //相同返回true不相同false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //动态绑定属性把class放到计算属性中 如果isActive为true则把color样式填充，否则没有样式
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
