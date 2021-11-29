/*
 * @name: 公交路线辐射图
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-10 15:48:20
 * @updatedAt: 
 */

!function(){

    let style = document.createElement('style')
    let hideList = [
        'div.flex-ctn>div:last-child'
    ]
    style.innerHTML = hideList.join(',')+` {
            display: none !important;
            visibility: hidden !important;
            opacity: none !important;
            pointer-events: none !important;
        }`

    style.innerHTML += `
        div.panel-ctn {
            padding-bottom: 10px !important;
        }
        .main-input[data-v-553d724c], nav.flex-center[data-v-255a0450] {
            height: 2.5rem !important;
        }
    `
    document.head.appendChild(style)

    window.addEventListener('load', () => document.querySelectorAll('div.collapse-ctr-ctn')[1].click())
    
  
}();