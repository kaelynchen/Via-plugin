/*
 * @name: 小鱼网
 * @author: Donald Lin
 * @version: 3.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-9-17 00:43:00
 */

-function(){
    let css = document.createElement('style')
    let hidden = []
    let noEvent = []

    hidden.push(['.swipe-wrap','#cwrap+div','.go-app','.copy_right'])
    noEvent.push('.fl.author')

    css.innerHTML = `
        ${hidden.join(',')} {display: none !important;}\n
        ${noEvent.join(',')} {pointer-events: none !important;}
    `
    document.head.appendChild(css)
    
}();
