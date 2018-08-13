import {mapState, mapMutations} from 'vuex'
const video = 0 // 视频
const article = 1 // 图文
const album = 2 // 图集
const audio = 3 // 音频
const advertisement = 4 // 广告
export default {
  props: ['tuijianlist'],
  computed: {
    ...mapState({
      'sessionlist': state => state.titlecolor
    })
  },
  filters: {
    splittimer (val) {
      return val.split(' ')[0]
    }
  },
  mounted () {
    setTimeout(() => {
      this.$emit('listscrollrefsh')
    }, 20)
  },
  methods: {
    ...mapMutations([
      'TITLECOLOR'
    ]),
    // 点击标题或图片
    linkrouter (val) {
      this.TITLECOLOR(val.id)
      if (parseInt(val.type) === article) { // 图文
        this.$router.push({
          name: 'article',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (parseInt(val.type) === video) { // 视频
        this.$router.push({
          name: 'video',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (parseInt(val.type) === album) { // 图集
        this.$router.push({
          name: 'album',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (parseInt(val.type) === audio) { // 音乐
        this.$router.push({
          name: 'audio',
          query: {
            id: val.id,
            uid: val.uid
          }
        })
      } else if (parseInt(val.type) === advertisement) { // 链接
        location.href = val.url
      }
    }
  }
}
