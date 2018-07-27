import axios from 'axios'
export function searchajax () {
  let url = '/search'
  let obj = Object.assign({}, {
    size: 10,
    search: '全椒',
    offset: 0
  })
  return axios.get(url, {
    params: obj
  })
}
