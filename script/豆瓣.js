/*
 * @name: Donald's 豆瓣
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    let styleText = `
        html {
            padding-bottom: 0px !important;
        }
        .oia-wrap
        ,.oia
        ,.opreations
        ,.read-all
        ,.hidden-content
        {
            display: none !important;
        }
        .TalionNav-static{
            height: 0px !important;
        }
        .download-app
        ,.TalionNav-static
        {
            opacity: 0;
        }
        .note-content.paper {
            max-height: none !important;
        }
    `
    document.querySelector('head').innerHTML += '<style>'+styleText+'</style>'

    let showAll = document.querySelector('.show-all>a')
    showAll.onclick = function() {
        document.querySelector('.to_pc').click()
        return false
    }
    showAll.innerText = showAll.innerText.replace('· 打开App', '')
  
})();