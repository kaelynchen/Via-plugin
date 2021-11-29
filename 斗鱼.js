/*
 * @name: 斗鱼
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-17 14:06:03
 */

void function(){
    let style = document.createElement('style')
    let hideList = []

    /* 首页 */
    hideList.push([
        'a.DownloadBtn',
        'div.HomeHeader-openAppB',
    ])

    /* 播放页 */
    hideList.push([
        'div.item.follow',
        'div.btn-open-app',
        'span.open-btn-more.btn-open-app',
    ])

    style.innerHTML = hideList.join(',')+`
    {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    `

    document.head.appendChild(style)

}();