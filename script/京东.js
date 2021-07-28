/*
 * @name: Donald's 京东
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    let style = document.createElement('style')
    style.innerHTML = `
    div[id^="content_"]
    ,#m_common_tip
    ,#imk2FixedSide
    ,#imk2FixedTop
    ,#imk2FixedBottom
    {
        display: none !important;
    }
    `
    document.querySelector('head').appendChild(style)

})();