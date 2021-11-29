/*
 * @name: 豆瓣
 * @author: Donald Lin
 * @version: 1.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){

    /* PC页面 */
    if (location.host.match('m.douban.com') === null) {
        document.head.querySelector('meta[name=viewport]').content = 'initial-scale=1.0'
        return
    }

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
    document.head.innerHTML += '<style>'+styleText+'</style>'

    let showAll = document.querySelector('.show-all>a')
    if (showAll) {
        showAll.onclick = function() {
            document.querySelector('.to_pc').click()
            return false
        }
        showAll.innerText = showAll.innerText.replace('· 打开App', '')
    }

  
})();