/*
 * @name: 哔哩哔哩
 * @author: Donald Lin
 * @version: 10.0
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-9-8 14:26:17
 */

void function(){
    let hideList = []
    let _blankList = []
    let style = document.createElement('style')

    let isH5 = location.host.match('m.bilibili.com') || location.pathname.match('/h5/') ? true : false
    let isVideoPage = isH5 && location.pathname.match('/video/') ? true : false
    let isChannelPage = isH5 && location.pathname.match('/h5/channel/') ? true : false
    const isSpacePage = isH5 && location.pathname.match('/space/') ? true : false

    let touchstart = document.createEvent('TouchEvent')
    touchstart.initEvent('touchstart')
    let touchend = document.createEvent('TouchEvent')
    touchend.initEvent('touchend')

    /* 首页 */
    hideList.push(['div.launch-app-btn.m-nav-openapp','div.launch-app-btn.home-float-openapp', 'div.open-app-btn.home-float-openapp', 'div.open-app-btn.m-nav-openapp', 'div.list-view__state', '.m-footer',])
    _blankList.push('.v-card')

    /* 排行榜 */
    hideList.push('div.list-view__state')
    _blankList.push('.v-card-single')

    /* 播放页 */
    hideList.push(['.mplayer-ending-panel-recommend','div.mplayer-buff-app','div.mplayer-comment-text-callapp','div.mplayer-widescreen-callapp','div.mplayer-control-btn-callapp','div.player-mobile-buff-app', 'div.launch-app-btn.m-nav-openapp','div.m-video2-main-img','div.launch-app-btn.m-float-openapp','div.open-app-btn.m-nav-openapp', 'div.player-mobile-control-btn.player-mobile-control-btn-callapp.player-mobile-control-btn-speed', 'div.player-mobile-widescreen-callapp', 'div.player-mobile-control-btn.player-mobile-control-btn-callapp.player-mobile-control-btn-quality', 'div.player-mobile-comment-text-callapp.player-mobile-comment-text', 'div.player-mobile-ending-panel-recommend', 'div.m-video2-openapp-img', 'div.open-app-btn.m-float-openapp', '.open-app', 'p.copyright', 'div.up>div.follow', 'span.bvid', 'div.list-view__state', '.m-footer', 'div#commentMore',])
    style.innerHTML += `
        .mplayer-ending-panel-buttons {margin:0 auto;}
        .mplayer-danmaku-container {height: 3em !important;}
        .bilibili-danmaku {font-size: 16px !important; font-weight: normal !important;}
        div.player-mobile-control-bar-right, div.player-mobile-control-bar-top { margin-bottom: 0 !important; height: 40px !important; }
        div.player-mobile-ending-panel-buttons { color: #fb7299; border-bottom: 1px solid #fb7299; padding: 3px; margin: 0 auto;}
        div.m-video2-toolbar { pointer-events: none !important; }
        div#comment.m-video-comment.report-scroll-module { pointer-events: none !important; }
        .player-mobile .player-mobile-area.player-mobile-wide .player-mobile-box-callAppMode .player-mobile-btn-comment-middle .player-mobile-btn-comment-content { background: none !important; }
        div.mplayer-btn-comment-content {background:none !important;}
        div.mplayer-btn-comment {justify-content:left !important;}
    `
    if (isVideoPage) {
        style.innerHTML += 'body, div.v-switcher__content__item, div.m-sub-reply-preview, div.v-switcher__header__tabs__wrap, div.m-navbar, div.list-view { background-color: #eee !important; }' 
        style.innerHTML += `.m-video-new.sticky .m-video-player {top:0 !important;}`
        style.innerHTML += `.m-video-new.sticky .m-video-main-launchapp {margin-top:60vw !important;}`
        hideList.push(['div.m-navbar'])
    }

    let videoInit = ()=>{
        if (isVideoPage === false) return
        setTimeout(()=>{
            // 自动跳转评论
            let playerComment = document.querySelector('ul.v-switcher__header__tabs__list.v-switcher__header--around>li.v-switcher__header__tabs__item:not(.is-active)')
            if (playerComment) playerComment.click()
            document.querySelector('i.general_pulldown_s').click()
            // 阅后即焚，防止下拉误触发左右滑动
            let playerAboutLabel = document.querySelector('li.v-switcher__header__tabs__item')
            let mutationConfig = {attributes: true, childList: false, subtree: false}
            let obr = new MutationObserver((m, o)=>{
                if (playerAboutLabel.className.match('is-active')) {
                    let aboutContent = document.querySelector('div.m-video-related')
                    document.querySelectorAll('div.v-switcher__content__item.is-active').forEach(i=>{
                        i.remove()
                    })
                    document.querySelector('div.v-switcher__content__wrap').appendChild(aboutContent)
                }
            })
            obr.observe(playerAboutLabel, mutationConfig)
        }, 300)
    }
    let videoPageAbout = ()=>{
        document.querySelectorAll('div.launch-app-btn.v-card-toapp').forEach(i=>{
            i.firstElementChild.href = 'https://'+location.host+'/video/av'+i.dataset.aid
        })
    }
    
    /* 频道-全景视频 */
    hideList.push(['div.search-bar>div.download', 'div.subs__btn'])
    style.innerHTML += 'div.channel-banner {height: 26vw !important;}'
    let channelInit = ()=>{
        if (isChannelPage === false) return
        setTimeout(()=>{document.querySelector('a.search-box').setAttribute('href', '//m.bilibili.com/search')}, 500)
    }
    let channelList = ()=>{
        if (isChannelPage === false) return
        document.querySelectorAll('div.video-card').forEach(i=>{
            i.style.pointerEvents = 'none'
            i.parentElement.setAttribute('onclick', "window.open('//m.bilibili.com/video/av"+i.getAttribute('id').split('-')[0]+"')")
        })
    }

    /* 404页面 */
    hideList.push(['div.index__loadMore__src-noFound-recommendVideo-', 'div.index__buttonContainer__src-noFound-notFound-'])

    /* 个人空间 */
    if (isSpacePage) {
        hideList.push('div.m-navbar')
    }
    hideList.push('div.launch-app-btn.m-space-float-openapp')
    try {
        document.querySelector('.dynamic-list').style.display = 'none'
        document.querySelector('.archive-list').style.display = ''
        setTimeout(()=>document.querySelector('.tabs').lastElementChild.click(), 0)
    } catch(err) {}

    /* 相簿 */
    _blankList.push('div.waterfall-item>a')
    hideList.push(['div.app-hint', 'div.download-btn.t-center'])


    /* PC */
    let pcInit = ()=>{
        if (isH5 === false) {
            let meta = document.createElement('meta')
            meta.name = 'viewport'
            meta.content = 'width=device-width; initial-scale=0.6'
            document.head.appendChild(meta)
            style.innerHTML += `
                .v-wrap { padding:0 !important; padding-left:15px !important; margin:0 !important; }
            `
        }
    }
    
    /* 立即执行 */
    style.innerHTML += hideList.join(',') + `{
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
    }`
    document.head.appendChild(style)
    window.addEventListener('load', ()=>{
        videoInit()
        channelInit()
        pcInit()
    })

    /* 被动触发执行 */
    let _blank = ()=>{
        setTimeout(()=>{
            _blankList.forEach(item=>{
                document.querySelectorAll(item).forEach(item=>{ item.target = '_blank' })
            })
        }, 500)
    }
    let operate = ()=>{
        videoPageAbout()
        _blank()
        channelList()
    }

    operate()
    document.addEventListener('click', operate)
    document.addEventListener('touchstart', operate)
    window.addEventListener('popstate', operate)
    window.document.addEventListener('scroll', ()=>{
        let t1 = 0, t2 = 0, timer
        t1 = window.document.documentElement.scrollTop
        timer = setTimeout(()=>{
            t2 = window.document.documentElement.scrollTop
            t1 == t2 && operate()
        }, 100)
    }) 

}();