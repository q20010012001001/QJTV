import axios from 'axios'
export function searchajax () {
  let url = '/search?size=10&search=%E5%85%A8%E6%A4%92&offset=0'
  let obj = Object.assign({}, {
    // size: 10,
    // search: '全椒',
    // offset: 0
  })
  return axios.get(url, {
    params: obj
  })
}
