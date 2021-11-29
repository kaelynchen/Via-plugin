/*
 * @name: vconsole
 * @author: Donald Lin
 * @version: 5.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-8-31 13:48:40
 */

void function(){
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', '//unpkg.com/vconsole/dist/vconsole.min.js')
    document.head.appendChild(script)
    script.onload = () => new VConsole()
}();