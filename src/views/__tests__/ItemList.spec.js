import { mount } from 'vue-test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item for each item in window.items', () => {
    window.items = [{}, {}, {}] // #A
    const wrapper = mount(ItemList)// #B
    expect(wrapper.findAll(Item).length).toEqual(window.items.length) // #C
  })

  test('passes an item object to each Item component', () => {
    window.items = [{}, {}, {}]
    const wrapper = mount(ItemList)
    const itemsArray = wrapper.findAll(Item) // #A
    itemsArray.wrappers.forEach((wrapper, i) => { // #B
      expect(wrapper.props().item).toBe(window.items[i]) // #C
    })
  })
})
