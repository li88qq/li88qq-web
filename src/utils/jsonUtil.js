
const sep = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

// t,s,k,m,v,p
export const buildObject = (s, k, m, data, d) => {
    let obj, t, v, d2, k2, v2
    let arr = []
    let s2 = s + sep
    let c = Object.keys(data).length
    let start = initObj('start', s, k, m, '{', '', 'Object{' + c + '}')
    arr.push(start)
    for (let i in data) {
        d2 = ''
        if (c > 1) {
            d2 = ','
        }
        c--
        v2 = data[i]
        t = getType(v2)
        k2 = '"' + i + '"'
        if (t === 'object') {
            v = buildObject(s2, k2, ':', v2, d2).v
            obj = initObj(t, s2, '', '', v, d, '')
        } else if (t === 'array') {
            v = buildArr(s2, k2, ':', v2, d2).v
            obj = initObj(t, s2, '', '', v, d, '')
        } else {
            v = v2
            if (t === 'string') {
                v = '"' + v + '"'
            }
            if (t === 'null') {
                v = 'null'
            }
            obj = initObj(t, s2, k2, ':', v, d2, '')
        }
        arr.push(obj)
    }
    let end = initObj('end', s, '', '', '}', d, '')
    arr.push(end)

    obj = initObj('object', s, '', '', arr, '', '')
    return obj
}

// t,s,k,m,v,p
export const buildArr = (s, k, m, data, d) => {
    let obj, t, v, d2
    let arr = []
    let c = data.length
    let s2 = s + sep
    let start = initObj('start', s, k, m, '[', '', 'Array[' + c + ']')
    arr.push(start)
    for (let i in data) {
        d2 = ''
        if (c > 1) {
            d2 = ','
        }
        c--
        t = getType(data[i])
        if (t === 'object') {
            v = buildObject(s2, '', '', data[i], d2).v
            obj = initObj(t, s2, '', '', v, d, '')
        } else if (t === 'array') {
            v = buildArr(s2, '', '', data[i], d2).v
            obj = initObj(t, s2, '', '', v, d, '')
        } else {
            v = data[i]
            if (t === 'string') {
                v = '"' + v + '"'
            }
            if (t === 'null') {
                v = 'null'
            }
            obj = initObj(t, s2, '', '', v, d2, '')
        }
        arr.push(obj)
    }
    let end = initObj('end', s, '', '', ']', d, '')
    arr.push(end)
    obj = initObj('array', s, '', '', arr, '', '')
    return obj
}

export const getType = (obj) => {
    let type = typeof (obj)
    if (type === 'object') {
        return obj === null ? 'null' : Array.isArray(obj) ? 'array' : 'object'
    }
    return type
}

// 类 隔离 键 冒号 值 逗号 折叠后说明,只有start有
const initObj = (t, s, k, m, v, d, r) => {
    let obj = {
        t: t,
        s: s,
        k: k,
        m: m,
        v: v,
        d: d,
        r: r
    }
    return obj
}