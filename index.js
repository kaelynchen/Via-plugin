let lang = {install: '安装', uninstall: '卸载'}
let scriptList = [
    {
        name: '哔哩哔哩',
        id: 100,
        status: 0,
        url: 'bilibili.com',
    }, {
        name: '豆瓣',
        id: 101,
        status: 0,
        url: 'm.douban.com',
     }, {
        name: '京东',
        id: 102,
        status: 0,
        url: 'm.jd.com',
     }, {
        name: '拼多多',
        id: 102,
        status: 0,
        url: 'yangkeduo.com, pinduoduo.com'
     }, {
        name: '手机网页调试',
        id: 102,
        status: 0,
        url: '*',
    }, {
        name: '微博',
        id: 103,
        status: 0,
        url: 'm.weibo.cn',
    }, {
        name: '小鱼网',
        id: 104,
        status: 0,
        url: 'bbs.xmfish.com',
    },
]
scriptList.forEach(item=>{
    try {
        let installedAddonId = JSON.parse(window.via.getInstalledAddonID())
        for (id of installedAddonId) {
            if (id == item.id) {
                item.status = 1
            }
        }
    } catch {
        console.log('get installed plugins error')
    }
    let div = document.createElement('div')
    div.setAttribute('class', 'item')
    div.innerHTML = `
        <div>`+item.name+`</div>
        <a 
            id="addon-`+item.id+`" 
            data-id="`+item.id+`"
            data-name="Donald's `+item.name+`"
            data-author="Donald.Lin"
            data-url="`+item.url+`"
            onclick="operate('`+item.name+`', this)" 
            href="javascript:;">`
        + (item.status == 0 ? lang.install : lang.uninstall)
        + `</a>
    `
    document.querySelector('#app').append(div)
})

function operate(fileName, t) {
    if (!window.via) {
        alert('您的浏览器暂不支持安装插件')
        return false
    }
    fetch('./script/'+fileName+'.js').then(res=>{
        return res.text()
    }).then(content=>{
        content = (new Base64).encode(content)
        let str = JSON.stringify({
            id: t.dataset.id,
            name: t.dataset.name,
            author: t.dataset.author,
            url: t.dataset.url,
            code: content
        })
        let result = (new Base64).encode(str)
        try {
            window.via.addon(result)
            t.innerText = t.innerText == lang.install ? lang.uninstall : lang.install
        } catch {
            console.log('error')
        }
    })
}









// Via function for encode from https://app.viayoo.com/addons/
function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    this.encode = function(t) {
        var r, a, n, e, o, d, c, i = "",
        h = 0;
        for (t = _utf8_encode(t); h < t.length;) e = (r = t.charCodeAt(h++)) >> 2,
        o = (3 & r) << 4 | (a = t.charCodeAt(h++)) >> 4,
        d = (15 & a) << 2 | (n = t.charCodeAt(h++)) >> 6,
        c = 63 & n,
        isNaN(a) ? d = c = 64 : isNaN(n) && (c = 64),
        i = i + _keyStr.charAt(e) + _keyStr.charAt(o) + _keyStr.charAt(d) + _keyStr.charAt(c);
        return i
    },
    this.decode = function(t) {
        var r, a, n, e, o, d, c = "",
        i = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < t.length;) r = _keyStr.indexOf(t.charAt(i++)) << 2 | (e = _keyStr.indexOf(t.charAt(i++))) >> 4,
        a = (15 & e) << 4 | (o = _keyStr.indexOf(t.charAt(i++))) >> 2,
        n = (3 & o) << 6 | (d = _keyStr.indexOf(t.charAt(i++))),
        c += String.fromCharCode(r),
        64 != o && (c += String.fromCharCode(a)),
        64 != d && (c += String.fromCharCode(n));
        return c = _utf8_decode(c)
    },
    _utf8_encode = function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var r = "",
        a = 0; a < t.length; a++) {
            var n = t.charCodeAt(a);
            n < 128 ? r += String.fromCharCode(n) : (127 < n && n < 2048 ? r += String.fromCharCode(n >> 6 | 192) : (r += String.fromCharCode(n >> 12 | 224), r += String.fromCharCode(n >> 6 & 63 | 128)), r += String.fromCharCode(63 & n | 128))
        }
        return r
    },
    _utf8_decode = function(t) {
        for (var r = "",
        a = 0,
        n = c1 = c2 = 0; a < t.length;)(n = t.charCodeAt(a)) < 128 ? (r += String.fromCharCode(n), a++) : 191 < n && n < 224 ? (c2 = t.charCodeAt(a + 1), r += String.fromCharCode((31 & n) << 6 | 63 & c2), a += 2) : (c2 = t.charCodeAt(a + 1), c3 = t.charCodeAt(a + 2), r += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3), a += 3);
        return r
    }
}
