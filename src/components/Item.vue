<template>
  <li class="news-item">
    <span class="time">
      {{ item.time | timeAgo }} ago
    </span>
    <a :href="item.url">{{ item.title }}</a>
      {{ item.by }} <span class="host"> ({{ item.url | host }})</span> {{ item.score }}
  </li>
</template>

<script>
export default {
  name: 'news-item',
  props: ['item']
}
</script>
