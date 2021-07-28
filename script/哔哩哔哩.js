/*
 * @name: Donald's 哔哩哔哩
 * @author: Donald Lin
 * @version: 1.3
 * @createdAt: 2021-7-28 15:52:53
 * @updatedAt: 2021-7-28 15:52:53
 */

(function(){
  
    // 播放页，弹幕优化
    let pathname = window.location.pathname
    let pageFilter = ''
    let list = [
        {name: '/video/', target: ',.v-affix'}
    ]
    list.some(function(item){
        if (pathname.match(item.name)) {
        pageFilter += item.target
        }
    })
    let style = `
        .player-mobile-danmaku-container {
            height: 5em !important;
        }
        .bilibili-danmaku {
            font-size: 16px !important;
            font-weight: normal !important;
        }
        .m-navbar {
            position: fixed;
            width: 100%;
            z-index: 999;
            top: 0;
        }
        .channel-menu {
            margin-top: 11.7vw;
        }
        .m-video-player {
            position: fixed;
            z-index: 999;
            margin-top: 11.73333vw;
            top: 0;
        }
        .m-video-info-new {
            margin-top: 72%;
        }
        .m-footer
        `+pageFilter+`
        {
            display: none !important;
        }
    `
    document.querySelector('style').innerText += style


    document.addEventListener('readystatechange', function(){
        if (document.readyState == 'complete') {
            clear()
            
            setTimeout(function(){
                console.log('自动播放.......')
                document.querySelector('.player-mobile-load-layer').click()
            }, 0)
            
            setTimeout(function(){
                console.log('自动跳到上次播放位置...........')
                let record = document.querySelector('.player-mobile-playtime-record')
                let mutationConfig = {attributes: true, childList: false, subtree: false}
                let observer = new MutationObserver(function(mutationList, observer){
                if (record.style.opacity == '') {
                    console.log('record jump..........')
                    document.querySelector('.player-mobile-playtime-record-jump').click()
                    observer.disconnect()
                }
                })
                observer.observe(record, mutationConfig)
            }, 0)
            
        }
    })
  
      
  
    // 首页、排行榜 新窗口打开
    function clear() {
        console.log('新窗口打开.............')
        document.querySelectorAll('.v-card').forEach(function(item){
            item.target = '_blank'
        })
        document.querySelectorAll('.v-card-single').forEach(function(item){
            item.target = '_blank'
        })
    }
    window.document.onscroll = function() {
        let t1 = 0, t2 = 0, timer
        t1 = window.document.documentElement.scrollTop
        timer = setTimeout(function(){
            t2 = window.document.documentElement.scrollTop
            // 停止滚动
            if (t1 == t2) {
                clear()
            }
        }, 100)
    }
  
  
    let origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
            clear()
        })
        origOpen.apply(this, arguments)
    }
    
    
      
    // PC版网页缩放
    let hostname = window.location.hostname
    let pcPageList = [
        'space.bilibili.com',
        't.bilibili.com'
    ]
    pcPageList.forEach(function(item){
        if (hostname.match(item)) {
            let meta = document.createElement('meta')
            meta.name = 'viewport'
            meta.content = 'width=device-width; initial-scale=1.0'
            document.head.appendChild(meta)
        }
    })


})();