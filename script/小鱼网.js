/*
 * @name: Donald's 小鱼网
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    /*
        document.querySelector('head').innerText += `
        <style>
            #cwrap+div
            ,.go-app
            ,.copy_right
            {
                  display: none !important;
            }
        </style>
    `
    */
    document.querySelector('#cwrap+div').style.display = 'none'
    
    document.querySelector('.go-app').style.display = 'none'

    document.querySelector('.copy_right').style.display = 'none'

    document.querySelectorAll('.author').onclick = function(){
        return false
    }
    
})();