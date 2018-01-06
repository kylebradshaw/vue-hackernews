<template>
  <div class="item-list">
    <span>{{ page }}/{{ maxPage }}</span>
    <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
    <a v-else class="disabled">&lt; prev</a>
    <span>{{ page }}/{{ maxPage }}</span>
    <router-link v-if="page < maxPage" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
    <a v-else class="disabled">more &gt;</a>

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
  watch: {
    page () {
      this.loadItems()
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return Math.ceil(this.$store.state.lists[this.type].length / 20)
    }
  },

  props: ['type'],

  methods: {
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({
        type: this.type // #A
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) { // #B
          this.$router.replace(`/${this.type}/1`) // #C
          return
        }
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }

}
</script>
