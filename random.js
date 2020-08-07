// 生成一个随机数
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


// 生成一个随机数字或字母
// 大写：65-90 小写：97-122
function randomNumAndLetter() {
    const num = Math.floor(Math.random() * 62)
    if (num < 10) return num
    if (num >= 10 && num <= 35) return String.fromCharCode(num + 55)
    else return String.fromCharCode(num + 61)
}