/*
 * @name: Donald's 手机网页调试
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    let vconsole_script = document.createElement('script')
    vconsole_script.setAttribute('type', 'text/javascript')
    vconsole_script.setAttribute('src', 'https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js')

    let vconsole_instance = document.createElement('script')
    vconsole_instance.innerHTML = `
        setTimeout(function(){
            let vConsole = new VConsole();
        }, 1000)
    `
    document.head.appendChild(vconsole_script)
    document.head.appendChild(vconsole_instance)

})();