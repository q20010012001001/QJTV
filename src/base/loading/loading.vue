<template>
    <div class="loading-wrap">
        <svg v-if="state"
         class="loading" viewBox="0 0 44 44">
            <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
        </svg>
        <div v-if="!state" class="loadingText flex flex-align-center flex-pack-center">
            <div class="loading-text">没有更多数据了</div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    state: { // 数据状态,没有数据为false,有数据为true
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
@import '~common/less/common.less';
.loading-wrap{
    height:100/@rem;
}
.loading{
width:100/@rem;
height:100/@rem;
}
.loadingText{
    height:100/@rem;
}
.loading-wrap {
        text-align: center;
    }
    .loading-text {
        color: #6e6e6e;
        // padding: 25/@rem 0;
    }
    .loading {
        animation: rotator 1.4s linear infinite;
    }
    @keyframes rotator {
        0% {
            transform: scale(0.5) rotate(0deg);
        }
        100% {
            transform: scale(0.5) rotate(270deg);
        }
    }
    .loading .path {
        stroke: #6e6e6e;
        stroke-dasharray: 126;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: dash 1.4s ease-in-out infinite;
    }
    @keyframes dash {
        0% {
            stroke-dashoffset: 126;
        }
        50% {
            stroke-dashoffset: 63;
            transform: rotate(135deg);
        }
        100% {
            stroke-dashoffset: 126;
            transform: rotate(450deg);
        }
    }

</style>
