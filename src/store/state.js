const state = {
  navdata: [],
  titlecolor: sessionStorage.getItem('newsid') ? JSON.parse(sessionStorage.getItem('newsid')).id : []
}

export default state
