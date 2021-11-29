/*
 * @name: taptap
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-9 15:59:19
 * @updatedAt: 
 */

(function(){
    let style = document.createElement('style')
    let hideList = []

    /* 首页 */
    hideList.push('section#downloadBanner')

    /* 详情页 */
    hideList.push([
        'button.open-app.open-app__default',
        'button.tap-button',
        'div.app-detail-button__wrap',
        'div.review-more-wrapper',
    ])

    /* 话题 */
    hideList.push('a.open-app-button')

    /* 用户设置 */
    hideList.push('section#topBanner.taptap-top-banner-xz')

    style.innerHTML = hideList.join(',')+`
    {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
    `

    document.head.appendChild(style)

})();