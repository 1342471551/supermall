//防止抖动函数 func为原来的参数，delay是时间
export function debounce(func,delay) {
    let timer=null
    return function (...args) {
      //如果timer有时间了但是没有到delay这个时间就清空timer
      if (timer) clearTimeout(timer)
      timer =setTimeout(()=>{
        //如果超过了等待时间就执行传入的函数
        func.apply(this,args)
      },delay)
    }
}
