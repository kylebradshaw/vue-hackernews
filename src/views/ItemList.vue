<template>
  <div class="item-list">
    <item
      v-for="item in displayedItems"
      :key="item.id"
      :item="item"
    />
  </div>
</template>


<script>
import Item from '../components/Item.vue'

export default {
  name: 'item-list',
  components: {
    Item
  },
  data () {
    return {
      displayedItems: window.items // #B
    }
  }
}
</script>
