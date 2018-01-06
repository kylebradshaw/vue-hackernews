import ItemList from '../views/ItemList.vue'

export default [
  { path: '/top/:page?', component: ItemList, props: {type: 'top'} }, // #A
  { path: '/new/:page?', component: ItemList, props: {type: 'new'} }, // #B
  { path: '/show/:page?', component: ItemList, props: {type: 'show'} },
  { path: '/ask/:page?', component: ItemList, props: {type: 'ask'} },
  { path: '/job/:page?', component: ItemList, props: {type: 'job'} },
  { path: '/', redirect: '/top' }
]
