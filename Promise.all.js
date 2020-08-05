// 第一遍
function Promiseall(promises) {
    // 先判断参数是否可遍历，也就是有无iterator接口
    const iterator = Symbol.iterator
    if(!promises[iterator]) return
    return new Promise((resolve, reject) => {
        const resolvearr = []
        const rejectarr = []
        for(let i of promises) {
            // 如果不是promise实例，则使用Promsie.resolve()函数将其转换为promise实例
            if(!(i instanceof Promise)) {
                i = Promise.resolve(i)
            }
            i.then(res => { // 成功，将返回放进resolvearr数组
                resolvearr.push(res)
            }).catch( err => { // 报错，将错误放进rejectarr数组
                rejectarr.push(err)
            })
        }
        setTimeout(() => {
            // 判断rejectarr长度
            // 如果为0, 则返回resolve(resolvearr);
            // 如果不为0，则表示有一个实例报错，所以将报错的那一个示例返回
            return rejectarr.length === 0?resolve(resolvearr) : reject(rejectarr[0])
        })
    })

}
// test
const p1 = new Promise(res => res(1))
const p2 = new Promise((res,rej) => rej(2))
const p3 = new Promise((res,rej) => rej(3))
const p4 = '4'
const result = Promiseall([p1,p2,p3,p4])
                .then(res => {console.log(res)})
                .catch(rej => {console.log(rej)})
console.log(result)

// 优化
// all时Promise的静态方法
Promise.all = function(promises) {
    // 1、先判断是否iterator；2、非promise实例进行Promise.resolve()
    const iterator = Symbol.iterator
    if(!promises[iterator]) return
    return new Promise((resolve, reject) => {
        const resolveArr = []
        for(let i = 0; i < promises.length; i++) {
            if(!promises[i] instanceof Promise) {
                promises[i] = Promise.resolve(promises[i])
            }
            promises[i].then(res => {
                // 如何保证获取到的res是顺序的？
                resolveArr.push(res)
                // 长度判断?核心？判断arr与参数长度
                if(resolveArr.length === promises.length) {
                    return resolve(resolveArr)
                }
            }).catch(err => {
                return reject(err)
            })
        }
    })
}

// 别直接用all，有可能会被Promise自身的all覆盖
Promise.alll = function(promises) {
    // 1、先判断是否iterator；2、非promise实例进行Promise.resolve()
    const iterator = Symbol.iterator
    if (!promises[iterator]) return
    let count = 0
    // 返回的是一个Promise实例，所以没有.then或.catch
    return new Promise((resolve, reject) => {
        // 定义数组接收每一个Promise实例的返回
        const resolveArr = []
        for (let i = 0; i < promises.length; i++) {
            // 判断参数是否为Promise实例，不是则使用Promise.resolve()将其转换为实例
            if (!(promises[i] instanceof Promise)) {
               promises[i] = Promise.resolve(promises[i])
            }
            promises[i].then(res => {
                // 不使用push，是因为要保证按顺序输出
                resolveArr[i] = res
                count++
                // 长度判断?核心？判断arr与参数长度
                if (count === promises.length) {
                  return resolve(resolveArr)
                }
            }).catch(err => {
                // 注意返回的是Promise实例，所以要调用reject方法，而不是直接return err
                return reject(err)
            })
        }
    })
}
// test
// test
let p1 = new Promise(res => res(1))
let p2 = new Promise((res,rej) => res(2))
let p3 = new Promise((res,rej) => rej(3))
let p4 = '4'
let result = Promise.alll([p1,p2,p3,p4])
                .then(res => {console.log(res)})
                .catch(rej => {console.log(rej)})
