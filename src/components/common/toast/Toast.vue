<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // show: {
      //   type: Boolean,
      //   default: false
      // }
    },
    methods: {
      isShow(message, duration = 2000) {
        this.show = true
        this.message = message
        setTimeout(() => {
          this.show = false
          this.message = ''
        }, duration)
      }
    },
    data() {
      return {
        message: '',
        show: false
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 999;

    color: #eeeeee;
    background-color: rgba(0, 0, 0, .6);
  }
</style>
