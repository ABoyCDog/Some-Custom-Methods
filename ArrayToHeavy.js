/**
 * 一维数组去重
 * 例如: [[1,2], [3,4], [1,2]] 去重后为 [[1,2], [3,4]]
 * 因为数组没法直接判断元素相等，即[1,2] === [1,2] 为false
 * */ 


// 主要目标 数组元素是纯数组的去重，例如: [[1,2], [3,4], [1,2]] 去重后为 [[1,2], [3,4]]
function uniqueByHash(arr) {
    // 利用对象的键不会重复特性，hash
    const hash = {}
    const res = []
    // 遍历后随意赋值value无所谓，主要是想拿key
    for(let i = 0; i < arr.length; i++) hash[arr[i]] = i 
    // 遍历完后，hash的键就是想要的结果，不过此时是字符串，需要转回数组;而转回数组后，元素仍为字符串，需要转类型
    for(let i of hash) res.push(i.split(',').map(Number))
    return res
}
// let arr = [[1,2], [2,3], [1,2],[2,3],[1,2],[1],[2]]
// uniqueByHash(arr)




// 顺带  数组元素是纯基本类型的去重

// 1、es6 set去重  缺点：无法去重里面的相同数组
function uniqueBySet(arr) {
    return Array.from(new Set(arr))
}
// let arr = [1,1,'1','1',true,true,undefined,undefined,{},{},0,0,null,null]
// uniqueBySet(arr)

// 2、Map数据结构
function uniqueByMap(arr) {
    let map = new Map()
    let res = []
    for(let i = 0; i < arr.length; i++) {
        if(map.has(arr[i])) {
            map.set(arr[i], true) // 有key值
        } else {
            map.set(arr[i], false) // 无key值
            res.push(arr[i])
        }
    }
    return res
}
// let arr = [1,1,'1','1',true,true,undefined,undefined,{},{},0,0,null,null]
// uniqueByMap(arr)

// 3、for套餐
function uniqueByFor(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j, i)
                j--
            }
        }
    }
    return arr
}

// 4、reduce reducer也就是第一个函数参数有四个参数(accumulator,curValue,curIndex,sourceArr)
function uniqueByReduce(arr) {
    return arr.reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, cur], [])
}
// let arr = [1,1,'1','1','asda']
// uniqueByReduce(arr)



/**
 * 二维数组去重
 */
const towArrayToHeavy = function(arr) {
    let result = arr.reduce((() => {
        let map = {}
        return function(res, next) {
            let key = next[0]
            if(!map[key]) {
                map[key] = true
                res.push(next)
            }
            return res
        }
    })(), [])
    return result
}

// var arr = [['a', 1], ['b', 2], ['a', 2]]
// console.log(towArrayToHeavy(arr))
