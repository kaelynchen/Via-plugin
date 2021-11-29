/*
 * @name: 京东
 * @author: Donald Lin
 * @version: 2.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-8-25 10:16:02
 */

void function(){

    let style = document.createElement('style')
    let hideList = []

    // 首页
    hideList.push([
        'div#m_common_tip',
    ])

    // 搜索结果页
    hideList.push('div#mDownload')

    // 其他
    hideList.push([
        'div[id^="content_"]',
        '#imk2FixedSide',
        '#imk2FixedTop',
        '#imk2FixedBottom',
    ])

    style.innerHTML = `${hideList.join(",\n")} {display:none !important; visibility: hidden !important; opacity:0 !important; pointer-events:none !important;} `
    document.querySelector('head').appendChild(style)

}();