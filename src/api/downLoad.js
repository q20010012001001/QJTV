import axios from 'axios'

export function download () {
  let navigatora = navigator.userAgent
  let timer = new Date().getTime()
  if (navigatora.indexOf('Android') > -1) {
    if (openApp('quanjiaoandroid11://host')) {
      openApp('quanjiaoandroid11://host')
    } else {
      let delay = setInterval(() => {
        let currtime = new Date().getTime()
        if (currtime - timer < 3000 && currtime - timer > 2000) {
          axios.get('/downloads').then((res) => {
            window.location.href = res.data.url
          })
        }
        if (currtime - timer >= 3000) {
          clearInterval(delay)
        }
      }, 1000)
    }
  } else if (navigatora.indexOf('iPhone') > -1) {
    window.location.href = 'http://itunes.apple.com/us/app/%E5%85%A8%E6%A4%92%E6%89%8B%E6%9C%BA%E5%8F%B0/id845039993?l=zh&ls=1&mt=8'
  }
}

function openApp (src) {
  let ifr = document.createElement('iframe')
  ifr.src = src
  ifr.style.display = 'none'
  document.body.appendChild(ifr)
  window.setTimeout(() => {
    document.body.removeChild(ifr)
  }, 2000)
}
