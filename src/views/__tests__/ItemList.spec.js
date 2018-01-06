jest.mock('../../api/api.js') // #A

import { shallow } from 'vue-test-utils'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import { fetchItems } from '../../api/api' // #B

describe('ItemList.vue', () => {
  test('renders an Item for each item returned by fetchItems', async () => { // #C
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [ {}, {} ]
    fetchItems.mockImplementation(() => Promise.resolve(items)) // #D
    const wrapper = shallow(ItemList, {mocks: {$bar}})
    await flushPromises() // #E
    expect(wrapper.findAll(Item).length).toEqual(items.length) // #F
  })

  test('passes an item object to each Item component', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    fetchItems.mockImplementation(() => Promise.resolve(items))
    const wrapper = shallow(ItemList, {mocks: {$bar}})
    await flushPromises()
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallow(ItemList, {mocks: {$bar}})
    expect($bar.start).toHaveBeenCalled()
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    fetchItems.mockImplementation(() => Promise.reject()) // #G
    shallow(ItemList, {mocks: {$bar}})
    await flushPromises()

    expect($bar.fail).toHaveBeenCalled() // #H
  })

  test('calls $bar.finish when load successful', async () => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    fetchItems.mockImplementation(() => Promise.resolve()) // #I
    shallow(ItemList, {mocks: {$bar}})
    await flushPromises()

    expect($bar.finish).toHaveBeenCalled()
  })
})
