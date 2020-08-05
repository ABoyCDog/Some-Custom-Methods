// 版本一
// 最简易版本
const denounce1 = function(fn, delayTime) {
    var timeout
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(fn, delayTime)
    }
}


// 版本二
// 修复两个小问题
// 1、this指向   2、event对象(事件处理函数会提供事件对象event，使用args接收剩余参数)
const debounce2 = function(fn, delayTime) {
    let timeout
    return function() {
        let context = this, args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            fn.apply(context, args)
        }, delayTime)
    }
}


// 版本三
// 第一次触发就执行，且在 immediate 为 true 的时候返回函数的执行结果 result
const debounceImmediate = function(fn, delayTime, immediate) {
    var timeout, result
    return function() {
        var context = this
        var args = arguments

        if(timeout) clearTimeout(timeout)

        if(immediate) {
            // 已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, delayTime)
            if(callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timeout = setTimeout(function() {
                fn.apply(fn, args)
            }, delayTime)
        }
        return result
    }
}


// 版本四
// 取消防抖
const debounce = function(fn, delayTime, immediate) {
    var timeout, result

    var debounced = function() {
        var context = this
        var args = arguments

        if(timeout) clearTimeout(timeout)
        if(immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, delayTime)
            if(callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timeout = setTimeout(function() {
                fn.apply(context, args)
            }, delayTime)
        }
        return result
    }

    debounced.cancle = function() {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}

export default debounce

// function btnClick() {
//     console.log('发送一次请求！')
// }

// debounce(btnClick, 3000)
