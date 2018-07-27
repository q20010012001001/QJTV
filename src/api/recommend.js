import axios from 'axios'
import oos from 'common/js/commonApi'

// 导航数据
export function getNav () {
  let url = '/api/server'
  let dataobj = Object.assign({}, {
    cmd: 'getnav'
  }, oos)
  return axios.get(url, {
    params: dataobj
  })
}

// 推荐列表数据与焦点图数据
export function getListData (obj) {
  let url = '/api/server'
  let cmd = 'getnewslist'
  let cid = obj.id
  let page = obj.page
  console.log(cid)
  if (!parseInt(cid)) { // 判断是推荐数据还是其他数据
    cmd = 'gethomelist'
    cid = ''
  } else if (cid === '321200') {
    cmd = 'getcate'
  } else if (cid === '33') {
    cmd = 'getlivelist'
    cid = null
  }
  let dataobj = Object.assign({}, {
    cmd: cmd,
    id: cid,
    page: page
  }, oos)
  return axios.get(url, {
    params: dataobj
  })
}
