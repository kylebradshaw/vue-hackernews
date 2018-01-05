<template>
  <div class="progress"
    :class="{
    show: show,
    error: error
  }"
  :style="{
    'width': `${percent}%`
  }"></div>
</template>

<script>
export default {
  name: 'progress-bar',
  data: () => ({
    percent: 0,
    error: false,
    show: false
  }),
  methods: {
    start () {
      this.show = true
      this.percent = 0
    },
    finish () {
      this.show = false
      this.percent = 100
    },
    fail () {
      this.error = true
      this.percent = 100
    }
  }
}
</script>
