/* * @name: 伴读
 * @author: Donald Lin
 * @version: 3.0
 * @createdAt: 2021-09-05 03:03:00
 * @updatedAt: 2021-09-06 11:37:20
 */

-function(){
    const quiet = 1
    let wave = document.createElement('style')
    wave.innerHTML = `
        #waifu {left:auto !important;right:0 !important;}
        canvas#live2d {width:200px !important;height:200px !important;}
        div#waifu-tips {width:126px !important; margin:-65px 26px !important; border:none !important; background-color:rgba(236, 217, 188, .9) !important; ${quiet==1?'visibility:hidden;':''}}
        #waifu-tool {bottom:10px !important; top:auto !important; right:3px !important;}
        #waifu-tool span {color:lightpink !important; opacity:.5 !important;}
        #waifu-toggle.waifu-toggle-active {width:12px !important;left:auto !important;right:0 !important;}
    `
    document.head.appendChild(wave)

    const live2d_path = "https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/"
    function loadExternalResource(url, type) {
        return new Promise((resolve, reject) => {
            let tag
            if (type === "css") {
                tag = document.createElement("link")
                tag.rel = "stylesheet"
                tag.href = url
            } else if (type === "js") {
                tag = document.createElement("script")
                tag.src = url
            }
            if (tag) {
                tag.onload = () => resolve(url)
                tag.onerror = () => reject(url)
                document.head.appendChild(tag)
            }
        })
    }
    Promise.all([
        loadExternalResource("//cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css", "css"),
        loadExternalResource(live2d_path + "waifu.css", "css"),
        loadExternalResource(live2d_path + "live2d.min.js", "js"),
        loadExternalResource(live2d_path + "waifu-tips.js", "js")
    ]).then(() => {
        initWidget({
            waifuPath: live2d_path + "waifu-tips.json",
            cdnPath: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/"
        })
    })

}();
