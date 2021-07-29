/*
 * @name: Donald's 小鱼网
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    document.querySelectorAll('.author').onclick = function(){
        return false
    }

    let style = document.createElement('style')
    style.innerHTML = `
        #cwrap+div
        ,.go-app
        ,.copy_right
        {
            display: none !important;
        }
    `
    document.head.appendChild(style)
    
})();