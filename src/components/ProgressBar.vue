<template>
  <div class="progress" :style="{
    'width': `${percent}%`
  }"></div>
</template>

<script>
export default {
  name: 'progress-bar',
  data: () => ({
    percent: 0
  })
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 0;
  background-color: #ffca2b;
  z-index: 999999;
}
.show {
  opacity: 1;
}
.error {
  background-color: #ff0000;
}
</style>
