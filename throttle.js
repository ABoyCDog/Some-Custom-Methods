const throttle = function(func, wait) {
    let previous = 0
    return function() {
        let nowtime = Date.now()
        if(nowtime - previous > wait) {
            func.apply(this)
            previous = nowtime
        }
    }
}

// function keyup() {
//     console.log('搜索一次！')
// }

// throttle(keyup, 1000)

export default throttle