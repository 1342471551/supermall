//防止抖动函数 func为原来的参数，delay是时间
export function debounce(func,delay=50) {
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

//格式化时间
export function formatDate(date, fmt) {
  //获取年份 +:至少一个多了不限 *:可有可无多了不限 ?:可有可无最多一个
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


