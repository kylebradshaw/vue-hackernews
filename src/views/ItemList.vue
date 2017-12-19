<template>
  <div class="news-view">
    <div class="news-list-nav">
<router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
<a v-else class="disabled">&lt; prev</a>
<span>{{ page }}/{{ maxPage }}</span>
<router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
<a v-else class="disabled">more &gt;</a>
    </div>
      <div class="news-list">
          <item
          v-for="item in displayedItems"
          :key="item.id"
          :item="item" />
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Item from '../components/Item.vue'

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  name: 'item-list',

  title () {
    return `${capitalizeFirstLetter(this.type)}`
  },

  components: {
    Item
  },

  beforeMount () {
    this.loadItems()
  },

  data () {
    return {
      displayedItems: null
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return Math.ceil(this.$store.state.lists[this.type].length / 20)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  props: ['type'],

  watch: {
    page () {
      this.loadItems()
    }
  },

  methods: {
    ...mapActions(['fetchListData']),
    loadItems () {
      this.$bar.start()
      this.fetchListData({
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.type}/1`)
          return
        }
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>

<style>
.news-view {
	padding-top: 45px;
}

.news-list-nav,
.news-list {
	background-color: #fff;
	border-radius: 2px;
}

.news-list-nav {
	padding: 15px 30px;
	position: fixed;
	text-align: center;
	top: 55px;
	left: 0;
	right: 0;
	z-index: 998;
	box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.news-list-nav a {
	margin: 0 1em;
}

.news-list-nav .disabled {
	color: #ccc;
}

.news-list {
	position: absolute;
	margin: 30px 0;
	width: 100%;
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.news-list ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.slide-left-enter,
.slide-right-leave-to {
	opacity: 0;
	transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter {
	opacity: 0;
	transform: translate(-30px, 0);
}

.item-move,
.item-enter-active,
.item-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item-enter {
	opacity: 0;
	transform: translate(30px, 0);
}

.item-leave-active {
	position: absolute;
	opacity: 0;
	transform: translate(30px, 0);
}

@media (max-width: 600px) {
	.news-list {
		margin: 10px 0;
	}
}
</style>
