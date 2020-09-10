function HashMap() {
    this.map = {}
}
HashMap.prototype = {
    // 向Map中添加元素 （key, value）
    put: function(key, value) {
        this.map[key] = value
    },
    // 根据键key获取值value
    get: function(key) {
        if(this.map.hasOwnProperty(key)) {
            return this.map[key]
        }
        return null
    },
    // 删除指定key的元素，成功返回true，失败返回false
    remove: function(key) {
        if(this.map.hasOwnProperty(key)) {
            return delete this.map[key]
        }
        return false
    },
    // 清空HashMap中的元素
    removeAll: function() {
        this.map = {}
    },
    // 获取HashMap中所有key的数组
    keySet: function() {
        var _keys = []
        for(let i in this.map) {
            _keys.push(i)
        }
        return _keys
    }
}
HashMap.prototype.constructor = HashMap