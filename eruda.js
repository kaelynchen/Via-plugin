/*
 * @name: eruda
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-8-31 13:55:55
 */

-function(){
    let script = document.createElement('script')
    script.src="//cdn.jsdelivr.net/npm/eruda"
    document.head.appendChild(script)
    script.onload = () => eruda.init()
}();