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
import { mapActions } from 'vuex'

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
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({
        type: 'top'
      }).then(() => {
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>
