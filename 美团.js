/*
 * @name: 美团
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-10-16 13:59:42
 */

-function(){
    let css = document.createElement('style')
    let hidden = []

    hidden.push(['.banner-download'])

    css.innerHTML += `${hidden.join(',')}\n{display:none !important; opacity:0 !important; pointer-events:none !important;}\n`
    document.head.appendChild(css)

}();

