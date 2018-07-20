import axios from 'axios'
import oos from 'common/js/commonApi'

// 导航数据
export function getNav () {
  let url = '/api/server'
  let dataobj = Object.assign({
    cmd: 'getnav'
  }, oos)
  return axios.get(url, {
    params: dataobj
  })
}

// 推荐列表数据与焦点图数据
export function getListData (id) {
  let url = '/api/server'
  let cmd = 'getnewslist'
  let cid = id
  if (!parseInt(cid)) { // 判断是推荐数据还是其他数据
    cmd = 'gethomelist'
    cid = ''
  }
  let dataobj = Object.assign({
    cmd: cmd,
    id: cid,
    page: 1,
    size: 20
  }, oos)
  return axios.get(url, {
    params: dataobj
  })
}
