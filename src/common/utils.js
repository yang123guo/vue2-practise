

/**
 * 解析url的插叙参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
const urlParse = function () {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

/**
 * 根据id存储localstorage
 * @param    id : 对象的id     key ：id下面对象的key    value： id下面对象的value
 * @return 空
 */
const saveToLocal =    function (id, key, value) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
};


/**
 * 根据id取得localstorage
 * @param    id : 对象的id     key ：id下面对象的key    def ：没有根据id或者key存储，取不出时值 default(false)
 * @return 空
 */
const loadFromLocal = function (id, key, def) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
};

/**
 * 解析整个url
 * @param  url
 * @return Object{略}
 */
// const parseURL = function (url) {
//     var a = document.createElement('a');
//     a.href = url;
//     return {
//         source: url,
//         protocol: a.protocol.replace(':', ''),
//         host: a.hostname,
//         port: a.port,
//         query: a.search,
//         params: (function () {
//             var ret = {},
//             seg = a.search.replace(/^\?/, '').split('&'),
//             len = seg.length, i = 0, s;
//             for (; i < len; i++) {
//                 if (!seg[i]) {
//                     continue;
//                 }
//                 s = seg[i].split('=');
//                 ret[s[0]] = s[1];
//             }
//             return ret;
//         })(),
//         file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
//         hash: a.hash.replace('#', ''),
//         path: a.pathname.replace(/^([^\/])/, '/$1'),
//         relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
//         segments: a.pathname.replace(/^\//, '').split('/')
//     };
// }

export default {
    urlParse,
    saveToLocal,
    loadFromLocal,
}