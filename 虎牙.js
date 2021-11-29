/*
 * @name: 虎牙
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-17 13:53:05
 */

-function(){
    let css = document.createElement('style')
    let hidden = []

    /* 首页 */
    hidden.push('a.header-app-btn')

    /* 播放页 */
    hidden.push(['.huya-header','#js-pauseWrap>.dtip','#videoBlueBtn','#js-blueRayWrap','span.start-btn','span.subcribe_btn','a.show_more','div#template'])
    css.innerHTML += `.danmu-wrap {height: 3em !important;}`

    css.innerHTML += `${hidden.join(',')}\n{display:none !important; opacity:0 !important; pointer-events:none !important;}\n`
    css.innerHTML += `
        div.live_tab>ul {width: 100% !important;}
    `
    document.head.appendChild(css)

    window.addEventListener('load', () => document.querySelector('div#chatArea').style.height = document.querySelector('div#chatArea').clientHeight + 53 + 'px')

}();
