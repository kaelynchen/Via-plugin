/*
 * @name: acfun
 * @author: Donald Lin
 * @version: 3.0
 * @createdAt: 2021-9-17 00:22:12
 */

-function(){
    let css = document.createElement('style')
    let hidden = []
    let noEvent = []
    const isVideoPage = location.pathname.match('/v/') ? true : false
    const isSpacePage = location.pathname.match('/upPage/') ? true : false
    const isCommunityPage = location.pathname.match('/communityCircle/') ? true : false

    /* 首页 */
    hidden.push(['div#js-profit-fixed','div.open-app-btn','div.header-ico','div#scroll_space'])

    /* 播放页 */
    if (isVideoPage) {
        hidden.push(['.download-btn','#header','#common_invoke_panel','.down-app-button','.more-main-comment','.recommend-open-app','.editor-region'])
        noEvent.push(['.h5c-toolbar'])
        css.innerHTML += `
        html,body,.h5-comment-container,.h5c-sublist {background-color:#eee !important;}
        .only-normal-head+* {margin-top: 0 !important;}
        .player-container {position:fixed;top:0;z-index:1000;}
        `
        document.querySelector('.content').style.marginTop = '4.3rem'
        window.addEventListener('load', ()=>{
            setTimeout(()=>document.querySelector('.video-title').click(), 300)
            let recLoad = setInterval(()=>{
                if (document.querySelector('.img-cover-pic')) {
                    clearInterval(recLoad)
                    document.querySelectorAll('.img-cover-pic').forEach(i=>{
                        i.addEventListener('click', e=>{
                            e.stopPropagation();
                            location.href = `/v/?ac=${e.path[2].attributes.ac.nodeValue}`;
                        })
                    })
                    document.querySelectorAll('.item-title').forEach(i=>{
                        i.addEventListener('click', e=>{
                            e.stopPropagation();
                            location.href = `/v/?ac=${e.srcElement.parentNode.attributes.ac.nodeValue}`;
                        })
                    })
                }
            }, 300)
        })
    }

    /* 个人空间 */
    if (isSpacePage) {
        hidden.push(['.focus-btn'])
        let upPageOb = new window.MutationObserver(upPageVideo)
        upPageOb.observe(document.body, {childList:false, attributes:true, subtree:true})
        function upPageVideo() {
            document.querySelectorAll('.article-item').forEach(i=>{
                i.addEventListener('click', e=>{
                    e.stopPropagation()
                    location.href = `/v/?ac=${e.path[1].attributes[1].nodeValue}`;
                })
            })
            document.querySelectorAll('.video-item').forEach(i=>{
                i.addEventListener('click', e=>{
                    e.stopPropagation()
                    location.href = `/v/?ac=${e.path[2].attributes[1].nodeValue}`;
                })
            })
        }
        setTimeout(()=>upPageVideo(), 0)
    }

    /* 话题 */
    if (isCommunityPage) {
        hidden.push(['.filter','.focus-btn','.attention-btn','.resources-base'])
        noEvent.push(['.tag-container','.video-title'])
        let commOb = new window.MutationObserver(comm)
        commOb.observe(document.body, {childList:false, attributes:true, subtree:true})
        function comm() {
            document.querySelectorAll('.cover-horizontal').forEach(i=>{
                i.addEventListener('click', e=>{
                    e.stopPropagation()
                    location.href = `/v/?ac=${e.path[2].attributes[3].nodeValue}`;
                })
            })
        }
        setTimeout(()=>comm(), 300)
    }

    /* 文章-更多评论 */
    if (location.pathname.match('/comment/')) {
        hidden.push(['.to-app-region', '.to-app-region-comment'])
    }

    css.innerHTML += `${hidden.join(',')}\n{display:none !important; opacity:0 !important; pointer-events:none !important;}\n`
    css.innerHTML += `${noEvent.join(',')}\n{pointer-events:none !important;}\n`
    document.head.appendChild(css)


}();
