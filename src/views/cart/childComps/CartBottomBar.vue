<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return "¥" + this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          let aa = new RegExp("¥")
          return preValue + (item.price).replace(aa, "") * item.count
        }, 0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        return !(this.$store.state.cartList.find(item => !item.checked))
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          //  全部选中 变成不选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eeeeee;
    position: relative;
    line-height: 40px;
    display: flex;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 2px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 120px;
  }

  .price {
    margin-left: 90px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>
