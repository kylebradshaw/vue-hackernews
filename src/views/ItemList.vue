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
import {
  fetchIdsByType,
  fetchItems
} from '../api/api'// #A

export default {
  name: 'item-list',
  components: {
    Item
  },

  beforeMount () {
    this.loadItems() // #B
  },

  data () {
    return {
      displayedItems: [] // #C
    }
  },

  methods: {
    loadItems () { // #D
      this.$bar.start() // #E
      fetchIdsByType('top') // #F
      .then(ids => fetchItems(ids)) // #G
      .then(items => {
        this.displayedItems = items // #H
        this.$bar.finish() // #I
      })
      .catch(() => this.$bar.fail()) // #J
    }
  }
}
</script>
