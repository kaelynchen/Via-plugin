/*
 * @name: 浏览助手
 * @author: Donald Lin
 * @version: 20.0
 * @createdAt: 2021-08-23 10:24:43
 * @updatedAt: 2021-10-16 14:11:36
 */

-function(){
    const themeColor =  'orange'
    const step = window.screen.height / 3
    const delay = 200
    const orangeWidth = 80
    const radius = 12
    const lureTime = 0.5
    const orangeX = `left: ${localStorage.getItem('orange_x') || 0}px`
    const orangeY = `top: ${localStorage.getItem('orange_y') || window.screen.height-orangeWidth*4}px`
    // if (['m.weibo.cn'].indexOf(location.host) === -1) document.documentElement.style.scrollBehavior = 'smooth'

    /* 破蛋 */
    let orange = document.createElement('div')
    orange.id = 'orange'
    orange.style = `opacity:.8;font-size:smaller;width:${orangeWidth}px;height:${orangeWidth*2}px;position:fixed;${orangeX};${orangeY};text-align:center;color:white;user-select:none;z-index:9999999;border-radius:${radius}px;background-color:${themeColor};`
    let up = document.createElement('div')
    up.innerText = document.documentElement.scrollHeight
    up.style = `width:100%;height:50%;line-height:${orangeWidth}px;border-bottom:1px solid white;`
    let dn = document.createElement('div')
    dn.innerText = 'ᶫᵒᵛᵉᵧₒᵤ'
    dn.style = `width:100%;height:50%;line-height:${orangeWidth}px;`
    orange.appendChild(up)
    orange.appendChild(dn)
    let call = setInterval(()=>{
        if(document.querySelector('#orange')==null) document.body.appendChild(orange)
        else clearInterval(call)
    },100)


    /* 跟随 */
    followInit(window.document)
    let exc = {weibo: '.pannelwrap'}
    for (let i in exc) {
        if (location.host.match(i)) {
            let intervalLimit = 0
            let interval = setInterval(()=>{
                if(document.querySelector(exc[i])) {
                    followInit(document.querySelector(exc[i]))
                    clearInterval(interval)
                }
                ++intervalLimit > 10 && clearInterval(interval)
            }, 300)
            break
        }
    }
    function followInit(node) {
        node.addEventListener('touchmove', lure)
        function lure(e) {
            if (e.srcElement.parentElement.id === 'orange') return false
            if (e.touches[0].clientY < 220) return false
            orange.style.transition = `all ${lureTime}s ease-in-out 0s`
            if (e.touches[0].clientX < window.screen.width/8 && orange.offsetLeft > window.screen.width/2) {
                follow(e, 0)
            } else if (e.touches[0].clientX > window.screen.width/8*7 && orange.offsetLeft < window.screen.width/2) {
                follow(e, window.screen.width-orangeWidth)
            }
        }
        function follow(e, x) {
            orange.style.left = x + 'px'
            localStorage.setItem('orange_x', x)
            let y = e.touches[0].clientY-orangeWidth
            if (y<0) y = 0
            else if (y > window.screen.height-orangeWidth*2) y = window.screen.height-orangeWidth*2
            orange.style.top = y + 'px'
            localStorage.setItem('orange_y', y)
            node.removeEventListener('touchmove', lure)
            node.addEventListener('touchend', resumeLure)
        }
        function resumeLure() {
            setTimeout(()=>node.addEventListener('touchmove', lure), lureTime*1000-100)
        }
    }


    /* 翻页 */
    let upT
    up.addEventListener('touchstart', () => {
        orange.style.transition = null
        if (window.scrollY < step+100)  window.scrollTo(0, 0)
        else window.scrollTo(0, window.scrollY-step)
        upT = setTimeout(() => window.scrollTo(0, 0), delay)
    })
    up.addEventListener('touchend', () => clearTimeout(upT))
    let dnT
    dn.addEventListener('touchstart', () => {
        orange.style.transition = null
        window.scrollTo(0, window.scrollY+step)
        dnT = setTimeout(() => window.scrollTo(0, document.documentElement.scrollHeight), delay)
    })
    dn.addEventListener('touchend', () => clearTimeout(dnT))

    /* 海拔 */
    scrollTop()
    document.addEventListener('scroll', scrollTop)
    let obj = new window.MutationObserver(scrollTop)
    obj.observe(document.documentElement, {childList:false, attributes:true, subtree:true})
    function scrollTop(e) {
        let maxScrollTop = document.documentElement.scrollHeight - outerHeight
        if (window.scrollY == 0) up.innerText = document.documentElement.scrollHeight
        else up.innerText = (window.scrollY / maxScrollTop * 100).toFixed() + ' %'
    }

    /* 走路 */
    let move = 0
    let offsetX, offsetY
    orange.addEventListener('touchstart', touchHandler)
    function touchHandler(e) {
        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - orange.offsetLeft
            offsetY = e.touches[0].clientY - orange.offsetTop
            orange.addEventListener('touchmove', touchHandler)
            orange.addEventListener('touchend', touchHandler)
        } else if (e.type === 'touchmove') {
            e.preventDefault()
            clearTimeout(upT)
            clearTimeout(dnT)
            if (e.changedTouches[0].clientX - offsetX + orangeWidth > window.screen.width) orange.style.left = window.screen.width-orangeWidth+'px'
            else if (e.changedTouches[0].clientX - offsetX < 0) orange.style.left = '0px'
            else orange.style.left = e.changedTouches[0].clientX - offsetX + 'px'
            if (e.changedTouches[0].clientY - offsetY < 0) orange.style.top = '0px'
            else if (e.changedTouches[0].clientY - offsetY + orangeWidth*2 > window.screen.height) orange.style.top = window.screen.height-orangeWidth*2+'px'
            else orange.style.top = e.changedTouches[0].clientY - offsetY + 'px'
            move = 1
        } else if (e.type === 'touchend') {
            orange.removeEventListener('touchmove', touchHandler)
            orange.removeEventListener('touchend', touchHandler)
            if (move == 1) {
                localStorage.setItem('orange_x', orange.offsetLeft)
                localStorage.setItem('orange_y', orange.offsetTop)
            }
            move = 0
        }
    }

    window.addEventListener('load', ()=>{
        if (document.documentElement.scrollHeight <= window.screen.height) orange.style.display = 'none'
    })
}();
