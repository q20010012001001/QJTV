import oo from '@/common/js/commonApi.js'
import axios from 'axios'

// 获取用户的发布新闻列表
export function userlistAxios (uid, page) {
  let cmd = 'getdiarylist'
  let url = '/api/server'
  let id = uid
  let obj = Object.assign({}, oo, {
    cmd,
    id,
    page
  })
  return axios.get(url, {
    params: obj
  })
}

// 获取用户详细信息
export function userdetailAxios (sid) {
  let url = '/api/user'
  let cmd = 'getuserinfo'
  let obj = Object.assign({}, oo, {
    cmd,
    sid
  })

  return axios.get(url, {
    params: obj
  })
}
