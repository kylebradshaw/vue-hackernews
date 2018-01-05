<template>
  <div class="progress" :style="{
    'width': `${percent}%` //#A
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
