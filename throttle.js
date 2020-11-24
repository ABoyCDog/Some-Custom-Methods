
/**
 * 节流原理：
 * 
 * 如果你持续触发事件，每隔一段时间，只执行一次事件。
 * 
 * 根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
 * 节流主流的实现方式有两种，一是使用时间戳，二是设置定时器
 * leading代表首次是否执行，trailing为结束后是否执行。
 * 
 */

// 使用时间戳 
// 思路：当事件触发时，取出当前时间戳，然后减去之前的时间戳（最开始设置为0），
//      如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于则不执行 
const throttle = function(fn, wait) {
    let previous = 0
    let context, args

    return function() {
        let now = new Date().getTime()
        context = this
        args = arguments
        if(now - previous > wait) {
            fn.apply(context, args)
            previous = now
        }
    }
}

// 使用定时器
// 思路：触发事件时，我们设置一个定时器，再触发事件时，如果定时器存在，就不执行，
//      直到定时器执行，然后执行函数，清空定时器，这样就可以设置
const throttle = function(fn, wait) {
    let timeout
    let previous = 0
    let context, args

    return function() {
        context = this
        args = arguments
        if(!timeout) {
            timeout = setTimeout(function() {
                timeout = null
                fn.apply(context, args)
            }, wait)
        }
    }
}


// 使用两种结合，第一次能触发，停止触发的时候还能再执行一次
const throttle = function(fn, delay = 1500, mustRun = 30) {
    let timmer = null
    let start = null
    let context = this
    return function() {
      let current = +(new Date())
      let args = Array.prototype.slice.call(arguments)
      clearTimeout(timmer)
      if(start) {
        start = current
      }
      if(current - start > mustRun) {
        fn.apply(context, args)
        start = current
      } else {
        timmer = setTimeout(() => {
          fn.apply(context, args)
        }, delay)
      }
    }
  }

// 优化
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}

export default throttle