import oos from 'common/js/commonApi'
import axios from 'axios'

// 图文详情页接口
export function articleAxios (id) {
  let url = '/api/server'
  let datac = Object.assign({
    'cmd': 'getdetail',
    'id': id
  }, oos)
  return axios.get(url, {
    params: datac
  })
}

// 视频详情页接口
export function videoAxios (id) {
  let url = '/api/server'
  let datac = Object.assign({
    'cmd': 'getvod',
    'id': id
  }, oos)
  return axios.get(url, {
    params: datac
  })
}

// 图集详情页接口
export function albumAxios (id) {
  let url = '/api/server'
  let datac = Object.assign({
    'cmd': 'getalbum',
    'id': id
  }, oos)
  return axios.get(url, {
    params: datac
  })
}

// 音频详情页接口
export function audioAxios (id) {
  let url = '/api/server'
  let datac = Object.assign({
    'cmd': 'getaudio',
    'id': id
  }, oos)
  return axios.get(url, {
    params: datac
  })
}
