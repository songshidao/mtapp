let skipNum = 0

function getData() {
    //AJAX1：
    const http = new XMLHttpRequest()
    http.open('POST', '/load-more', true)
    http.onreadystatechange = function() {
        console.log(this.status)
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText)
            console.log(data)
            let html = ''
            for (let i = 0; i < data.length; i++) {
                html += `

                    <div class="restaurant-card">
                        <a href='/restaurants/${data[i]._id}'>
                            <div class="item-wrapper">
                                    <div class="item-info">
                                        <div class="item-img-wrapper">
                                            <img src="${data[i].image}" alt="">
                                        </div>
                                        <div class="item-info-wrapper">
                                            <h4 class="info-name">${data[i].name}</h4>
                                            <p class="info-stars"><span>${data[i].stars}</span>
                                            <span>${data[i].address}</span></p>
                                            <p class="info-featured">${data[i].featured}</p>
                                            <p class="info-averagecost">${data[i].averageCost}元/人</p>
                                            
                                        </div>
                                    </div>
                                    <div class='maidian'>
                                        <p class="cut">限时减30<p>
                                        <p class="info-promotion">${data[i].promotion}</p>
                                    </div>
                            </div>
                        </a>
                    </div>
                
                `
            }
            document.querySelector('#restaurants').innerHTML += html
            skipNum += 5
            document.querySelector('.loader').classList.remove('show')
        }
    }
    const formData = new FormData()
    formData.append('skipNum', skipNum)
    http.send(formData)
}
//页面加载完成时加载getData()：初始化
window.addEventListener('load', function() {
        getData()
    })
    //上滑到底时加载getData()
window.addEventListener('scroll', function() {
    const {
        clientHeight,
        scrollTop,
        scrollHeight
    } = document.documentElement
        // console.log({clientHeight, scrollTop, scrollHeight })
        //视口高：clientHeight 滚动条滚动距离：scrollTop 内容高：scrollHeight
    if (clientHeight + scrollTop >= scrollHeight) {
        console.log('到底')
        showloader()
    }
})

function showloader() {
    document.querySelector('.loader').classList.add('show')
    setTimeout(function() {
        getData()
    }, 1000)
}

function setRem() {
    const scale = document.documentElement.clientWidth / 375
    document.documentElement.style.fontSize = scale + 'px'
}
setRem()
window.addEventListener('resize', setRem)