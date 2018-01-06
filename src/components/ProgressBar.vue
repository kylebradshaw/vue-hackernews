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
      this._timer = setInterval(() => {
        this.percent++
      }, 100)
    },
    finish () {
      this.percent = 100
      this.show = false
      clearInterval(this._timer)
      this._timer = null
    },

    fail () {
      this.error = true
      this.percent = 100
    }
  }
}
</script>
