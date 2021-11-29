/*
 * @name: 知乎
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-17 14:22:55
 */

void function(){
    Object.defineProperties(window.navigator, {
        'userAgent': {
            enumerable: true,
            value: 'Mozilla/5.0 (Windows Phone 10)'
        },
        'appVersion': {
            enumerable: true,
            value: '5.0 (Windows Phone 10)'
        },
        'platform': {
            enumerable: true,
            value: 'Win32'
        }
    });


    let style = document.createElement('style')
    let hideList = []
    let styleList = []

    // 首页
    hideList.push([
        'a.MobileAppHeader-downloadLink',
        'div.Card.DownloadGuide.DownloadGuide-block',
        'div.ContentItem-actions>span',
        'div.Pc-feedAd-container',
    ])
    styleList.push('span.MobileAppHeader-expandBtn {margin-right: 10px !important;}')
    styleList.push('.TopstoryItem-isRecommend {padding-bottom: 11px !important;}')
    styleList.push('.ContentItem-action {margin-left: 0 !important; padding-right: 24px !important;}')

    // 添加收藏页
    styleList.push('div.Favlists-items {margin: 15px !important;}')

    // 详情页
    hideList.push([
        'div.HotQuestions-bottomButton',
        'a.MBannerAd',
        'a.MHotFeedAd'
    ])

    // 搜索页
    hideList.push([
        'span.MobileAppHeader-expandBtn'
    ])

    style.innerHTML = hideList.join(',')+` {display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;}\r\n`
    style.innerHTML += styleList.join("\r\n")
    document.head.appendChild(style)
    document.querySelector('div#root').style.overflow = 'hidden'


    
    /* 初始化队列 */
    let addSearchBtn = () => {
        if (document.querySelector('input[type=search]') !== null) return
        let searchBtn = document.createElement('a')
        searchBtn.href = '//www.zhihu.com/search'
        searchBtn.innerText = '搜索'
        document.querySelector('div.MobileAppHeader-actions').insertBefore(searchBtn, document.querySelector('a.MobileAppHeader-downloadLink'))
    }
    let autoExpand = () => {
        let expandNode = document.querySelector('div.RichContent-inner.RichContent-inner--collapsed')
        expandNode && expandNode.click()
    }
    let activateSearchBox = () => {
        let searchBox = document.querySelector('label.MobileAppHeader-searchBox')
        if (searchBox !== null) {
            searchBox.classList.add('is-focus')
            searchBox.click()
        }
    }
    setTimeout(()=>{
        addSearchBtn()
        autoExpand()
        activateSearchBox()
    }, 0)


    /* 被动触发 */
    let delPurchase = () => {
        setTimeout(()=>{
            document.querySelectorAll('span.KfeCollection-PurchaseBtn-text').forEach(i=>i.closest('div.List-item').parentNode.removeChild(i.closest('div.List-item')))
        }, 500)
    }
    let clickEvent = () => {
        delPurchase()
    }
    document.addEventListener('click', clickEvent)

}();