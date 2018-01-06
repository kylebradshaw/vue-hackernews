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
} from '../api/api'

export default {
  name: 'item-list',
  components: {
    Item
  },

  beforeMount () {
    this.loadItems()
  },

  data () {
    return {
      displayedItems: []
    }
  },

  methods: {
    loadItems () {
      this.$bar.start()
      fetchIdsByType('top')
      .then(ids => fetchItems(ids))
      .then(items => {
        this.displayedItems = items
        this.$bar.finish()
      })
      .catch(() => this.$bar.fail())
    }
  }
}
</script>
